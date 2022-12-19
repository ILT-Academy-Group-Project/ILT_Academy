const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const path = require('path');
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


router.post('/imagefield',  rejectUnauthenticated, upload.single('image'), (req,res) => {

// console.log('in /imagefield', req.file);
//ensure that this route is only available for admin users
if (req.user.accessLevel === 2){
    const url = 'files/'+req.file.filename;
    const response = {
        "result": [
            {
                "url":`${url}`,
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
    let data=req.body;
    if(req.user.accessLevel === 2){
        //sql text for the insert
        let sqlText;
        let sqlParams;
        //if there is a file assign the sql query info to incllude a media file (video)
        if(req.file){
            sqlText = `
                INSERT INTO "assignments"
                    ("name", "moduleId", "content", "media", "textField", "file", "video")
                VALUES
                    ($1, $2, $3, $4, $5, $6, $7);
            `;
            sqlParams = [
                data.assignmentTitle,
                data.moduleId,
                data.assignmentContent,
                'files/'+req.file.filename,
                data.textField,
                data.file,
                data.video
            ];
        }
        //else create assignment without a video file
        else{
            sqlText=`
                INSERT INTO "assignments"
                    ("name", "moduleId", "content", "textField", "file", "video")
                VALUES
                    ($1, $2, $3, $4, $5, $6);
            `;
            sqlParams=[
                data.assignmentTitle,
                data.moduleId,
                data.assignmentContent,
                data.textField,
                data.file,
                data.video,
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

 router.put('/', rejectUnauthenticated, upload.single('media'), (req, res) => {
    console.log('in assignmentsPut route with payload of:', req.body, req.file);
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
            media='/files/'+req.file.filename;
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


module.exports = router;