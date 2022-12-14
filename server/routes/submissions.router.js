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
      destination: './public/submissions', 
      filename: function (req, file, cb) {
          //names file profile_pic-(userid#).jpg
          //path.extname(file.originalname)
          cb(null, 'submissionFile' + Date.now() + path.extname(file.originalname));
      }
  });
  
  //declares upload variable, ie the above storage variable becomes where Multer sends file with new name
  const upload = multer({
      storage: storage,
  });

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, upload.any(), (req, res) => {
    console.log('req.body', req.body);
//  console.log('req.files', req.files);
    //set up all variables for submissions
    let video;
    let file;
    let sqlText;
    let sqlParams;
    //seperate files and assign to associated variable (video or file)
    for (let i=0; i<req.files.length; i++){
    //check if the file at index i is the pdf file or the video file (need this to assign to db)
    if(req.files[i].fieldname === 'file'){
        file = req.files[i];
    }
    else if (req.files[i].fieldname === 'video'){
        video = req.files[i];
    }
    }; //end for loop
//  console.log('file', file, 'video', video);
    //Big darn conditional :( There has to be a better way to do this, I just dont know how right now
//case file, video, text


//case file, video

//case video, text

//case file, text

//case file

//case video

//case text


res.sendStatus(200);
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