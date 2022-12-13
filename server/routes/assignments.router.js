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
    destination: './public/videos', 
    filename: function (req, file, cb) {
        //names file profile_pic-(userid#).jpg
        //path.extname(file.originalname)
        cb(null, 'assignmentVideo' + Date.now() + path.extname(file.originalname));
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

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, upload.single('assignmentVideo'), (req, res) => {
    // POST route code here
    // console.log('in assignment Post route! YAY, req.file:', req.file, 'req.body', req.body);
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
                'videos/'+req.file.filename,
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
            .then(dbRes => res.sendStatus(201))
            .catch(err=>{
                console.error('in POST assignment error');
                res.sendStatus(500);
            })



    }
    else{
        res.sendStatus(403);
    };

});

/**
 * GET:ID route 
 */



/**
 * DELETE route 
 */



/**
 * PUT route 
 */


module.exports = router;