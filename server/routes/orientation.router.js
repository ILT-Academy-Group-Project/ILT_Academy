const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const uploadImage= require('../Util/s3Upload');
const fs = require('fs');
const path = require('path');

const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

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


router.get('/', rejectUnauthenticated, async (req, res) => {
    try {
        const sqlText = `SELECT * FROM "orientation"
        ORDER BY "step" ASC;`;
        let dbResult = await pool.query(sqlText);
        res.send(dbResult.rows);

    } catch (err) {
        console.error('orientation.router GET error', err.message);
        res.sendStatus(500);
    }
});

router.get('/:id', rejectUnauthenticated, (req, res) => {
    // console.log('in GET assignment by ID route with payload of:', req.params.id);
    
    //create sqlText for db query
    const sqlText=`
        SELECT * FROM "orientation"
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

router.post('/', rejectUnauthenticated, upload.single('assignmentVideo'), (req, res) => {
    // POST route code here
    // console.log('in assignment Post route! YAY, req.file:', req.file, 'req.body', req.body);
    console.log('req.body', req.body);
    let data = req.body;
    if (req.user.accessLevel === 2) {
        //sql text for the insert
        let sqlText;
        let sqlParams;
        //if there is a file assign the sql query info to incllude a media file (video)
        if (req.file) {
            sqlText = `
                INSERT INTO "orientation"
                    ("name", "step", "content", "media", "submission")
                VALUES
                    ($1, $2, $3, $4, $5);
            `;
            sqlParams = [
                data.title,
                data.step,
                data.content,
                data.video,
                data.submission
            ];
        }
        //else create assignment without a video file
        else {
            sqlText = `
                INSERT INTO "orientation"
                    ("name", "step", "content", "media", "submission")
                VALUES
                    ($1, $2, $3, $4, $5);
            `;
            sqlParams = [
                data.title,
                data.step,
                data.content,
                data.video,
                data.submission
            ];
        }
        //pool to DB
        pool.query(sqlText, sqlParams)
            .then(dbRes => {
                res.sendStatus(201)
            })
            .catch(err => {
                console.error('in POST assignment error', err);
                res.sendStatus(500);
            })
    }
    else {
        res.sendStatus(403);
    }
     
});

router.put('/', rejectUnauthenticated, upload.single('media'), async (req, res) => {
    console.log('in orientationPut route with payload of:', req.body, req.file);
    //insure route only available to Admin users
    if (req.user.accessLevel === 2){
        let data=req.body;
        let media;
        
        // if the media value is still a file path set value to that
        if(typeof req.body.video === 'string'){
            media=req.body.video;
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
            UPDATE "orientation"
            SET
                "name" = $1,
                "step" = $2,
                "content" = $3,
                "media" = $4,
                "submission" = $5
            WHERE
                "id"=$6;
        `;

        const sqlParams = [
            data.name,
            data.step,
            data.content,
            data.video,
            data.submission,
           
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

router.delete('/:id', rejectUnauthenticated, (req, res) => {
    // console.log('in delete assignment with id of', req.params);
    //set query text

    if(req.user.accessLevel === 2){
        const sqlText = `
        DELETE FROM "orientation"
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

module.exports = router