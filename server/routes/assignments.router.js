const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const path = require('path');
const uploadImage= require('../Util/s3Upload');
const fs = require('fs');
// const AWS = require('aws-sdk');
// const fs = require('fs');
// require('dotenv').config();
//reject unauthenticated
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

//import multer for file reciept
const multer  = require('multer');

//set storage location and naming convention for image
const storage = multer.diskStorage({
    destination: './public/files', 
    filename: function (req, file, cb) {
        //names file profile_pic-(userid#).jpg
        //path.extname(file.originalname)
        cb(null, 'assignmentFile' + Date.now() + path.extname(file.originalname));
    }
});

//declares upload variable, ie the above storage variable becomes where Multer sends file with new name
const upload = multer({
    storage: storage,
});
// //AWS S3 BUCKET VARIABLES
// const bucketName = process.env.AWS_BUCKET_NAME
// const region = process.env.AWS_BUCKET_REGION
// const accessKeyId = process.env.AWS_ACCESS_KEY
// const secretAccessKey = process.env.AWS_SECRET_KEY

// const s3 = new AWS.S3({
//     accessKeyId: accessKeyId,
//     secretAccessKey: secretAccessKey,
//     region:region
// });

router.get('/', rejectUnauthenticated, async (req, res) => {
  try{
      const sqlText = 
          `SELECT * FROM "assignments"`;

      let dbResult = await pool.query(sqlText);
      res.send(dbResult.rows);

  } catch(err) {
      console.error('assignments.router GET error', err.message);
      res.sendStatus(500);
  }
})

router.get('/:id', rejectUnauthenticated, (req, res) => {
    // console.log('in GET assignment by ID route with payload of:', req.params.id);
    
    //create sqlText for db query
    const sqlText=`
        SELECT * FROM "assignments"
        WHERE "id" = $1;
    `;
    //query DB
    pool.query(sqlText, [req.params.id])
        .then(dbRes => {
            // console.log('dbRes.rows', dbRes.rows[0]);
            res.send(dbRes.rows[0]);
        })
        .catch(err => {
            console.error('in GET assignment by ID error:', err);
            res.sendStatus(500);
        })


});


router.post('/imagefield',  rejectUnauthenticated, upload.single('image'), async (req,res) => {

// console.log('in /imagefield', req.file);
//ensure that this route is only available for admin users
if (req.user.accessLevel === 2){
        //call s3 route as async to get file path
    const filePath = await uploadImage(req.file);

    //after image in S3 bucket delete the file
    fs.unlink(req.file.path,()=>{
        console.log('file deleted');
    });
    //send photo info to suneditor
    const response = {
        "result": [
            {
                "url":`${filePath}`,
                "name": req.file.filename,
                "size": req.file.size
            }
        ]
    };
    res.send(response);
}
//if not an admin send forbidden status
else{
    res.sendStatus(403);
}});

router.post('/', rejectUnauthenticated, upload.single('assignmentVideo'), async (req, res) => {
    // POST route code here
    // console.log('in assignment Post route! YAY, req.file:', req.file, 'req.body', req.body);
    // console.log('req.body', req.body);
    let data=req.body;
    if(req.user.accessLevel === 2){
        //call s3 route as async to get file path



        //sql text for the insert
        let sqlText;
        let sqlParams;
        //if there is a file assign the sql query info to incllude a media file (video)
        if(req.file){

            const filePath = await uploadImage(req.file);

            //after image in S3 bucket delete the file
            fs.unlink(req.file.path,()=>{
                console.log('file deleted');
            });

            sqlText = `
                INSERT INTO "assignments"
                    ("name", "moduleId", "content", "media", "textField", "file", "video", "postClass", "seriesId")
                VALUES
                    ($1, $2, $3, $4, $5, $6, $7, $8, $9);
            `;
            sqlParams = [
                data.assignmentTitle,
                data.moduleId,
                data.assignmentContent,
                filePath,
                data.textField,
                data.file,
                data.video,
                data.postClass,
                data.seriesId
            ];
        }
        //else create assignment without a video file
        else{
            sqlText=`
                INSERT INTO "assignments"
                    ("name", "moduleId", "content", "textField", "file", "video", "postClass", "seriesId")
                VALUES
                    ($1, $2, $3, $4, $5, $6, $7, $8);
            `;
            sqlParams=[
                data.assignmentTitle,
                data.moduleId,
                data.assignmentContent,
                data.textField,
                data.file,
                data.video,
                data.postClass,
                data.seriesId
            ];
        }
        //pool to DB
        pool.query(sqlText, sqlParams)
            .then(dbRes => {
                res.sendStatus(201)
            })
            .catch(err=>{
                console.error('in POST assignment error', err);
                res.sendStatus(500);
            })
    }
    else{
        res.sendStatus(403);
    }});

router.delete('/:id', rejectUnauthenticated, (req, res) => {
    // console.log('in delete assignment with id of', req.params);
    //set query text

    if(req.user.accessLevel === 2){
        const sqlText = `
        DELETE FROM "assignments"
        WHERE "id" = $1;
    `;
    //query to DB
    pool.query(sqlText, [req.params.id])
        .then(dbRes => {
            res.sendStatus(200);
        })
        .catch(err => {
            console.error('in delete assignment error', err);
            res.sendStatus(500);
        });
    }
    else{
        res.sendStatus(403);
    }
    
})

 router.put('/', rejectUnauthenticated, upload.single('media'), async (req, res) => {
    // console.log('in assignmentsPut route with payload of:', req.body, req.file);
    //insure route only available to Admin users
    if (req.user.accessLevel === 2){
        let data=req.body;
        let media;
        
        // if the media value is still a file path set value to that
        if(typeof req.body.media === 'string'){
            media=req.body.media;
        }
        //else set file path of new file
        else{
            media=await uploadImage(req.file);

            //after image in S3 bucket delete the file
            fs.unlink(req.file.path,()=>{
                console.log('file deleted');
            });
        }
        //set SQL text

        const sqlText =`
            UPDATE "assignments"
            SET
                "createdDate" = CURRENT_TIMESTAMP,
                "content" = $1,
                "media" = $2,
                "textField" = $3,
                "file" = $4,
                "video" = $5,
                "postClass" = $6,
                "name" = $7
            WHERE
                "id"=$8;
        `;

        const sqlParams = [
            data.content,
            media,
            data.textField,
            data.file,
            data.video,
            data.postClass,
            data.name,
            data.id
        ];

        pool.query(sqlText, sqlParams)
            .then(dbRes => {
                res.sendStatus(201);
            })
            .catch( err => {
                console.error('in assignment PUT route error:', err);
                res.sendStatus(500);
            })
    }
    else {
        res.sendStatus(403);
    }

 })

/**
 * PUT route 
 */


// GET ASSIGNMENTS BY SERIES
router.get('/series/:seriesId', rejectUnauthenticated, (req, res) => {
    console.log('in GET assignment by series:', req.params.seriesId);
    
    const sqlText=`
    SELECT "assignments".id, "assignments"."name", "assignments".community, "assignments".content, "assignments"."createdDate", "assignments".feedback, "assignments".file, "assignments".media, "assignments"."postClass", "assignments"."textField", "assignments".video,"assignments"."moduleId", "modules"."seriesId"
    FROM "assignments"
    JOIN "modules" ON "modules".id = "assignments"."moduleId"
    WHERE "modules"."seriesId" = $1;
    `;
    pool.query(sqlText, [req.params.seriesId])
        .then(dbRes => {
            res.send(dbRes.rows);
        })
        .catch(err => {
            console.error('in GET assignments by series', err);
            res.sendStatus(500);
        })


});

//GET assignments for single student by username
router.get('/username/:username', rejectUnauthenticated, async (req, res) => {
    try{
        console.log('in GET assignments by USERNAME ', req.params.username);
        const sqlText = `
        SELECT "user".id as "userId", "user".username, "submissions".id as "submissionId", "submissions"."assignmentId", "submissions".completed, "submissions".file, "submissions"."textInput", "submissions".video, "submissions"."submissionDate", "assignments"."name" as "assignmentName"
        FROM "user" 
        JOIN "submissions" ON "user".id = "submissions"."userId"
        JOIN "assignments" ON "submissions"."assignmentId" = "assignments".id
        WHERE "user"."username" = $1;

        `;
        const sqlParams = [req.params.username];
        console.log('🎋SQL PARAMS ', sqlParams);
        let dbResult = await pool.query(sqlText, sqlParams);
        res.send(dbResult.rows);
        
    } catch(err) {
        console.error('assignments.router /:username error ', err.message);
        res.sendStatus(500);
    }
    
} 
)

module.exports = router;