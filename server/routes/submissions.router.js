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
router.post('/', 
    rejectUnauthenticated, 
        upload.single('pdfSubmission'),
        upload.single('videoSubmission'), 
        (req, res) => {
    
    console.log('req.files', req.files);
  // POST route code here
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