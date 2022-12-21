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
router.post('/', rejectUnauthenticated, upload.single('file'), (req, res) => {
    console.log('req.body', req.body, req.body.assignmentId);
    let sub=req.body;
//  console.log('req.files', req.files);
    //set up all variables for submissions
    let video;
    let file;
    let text;
    let sqlText;
    let sqlParams;

    {req.file ? file='submissions/'+req.file.filename: file=null};
    {sub.video !== 'null' ? video=sub.video: video=null};
    {sub.textSubmission ? text=sub.textSubmission: text=null};

    //sql text for insert including all possible values (WILL BE NULL IF NOT REASSIGNED ⤴️)
    sqlText = `
        INSERT INTO "submissions"
            ("userId", "assignmentId", "textInput", "file", "video", "completed")
        VALUES
            ($1, $2, $3, $4, $5, $6);
    `;
    //sql params (will send null if it doesnt exist)
    sqlParams =[
        req.user.id,
        sub.assignmentId,
        text,
        file,
        video,
        true
    ];

    pool.query(sqlText, sqlParams)
        .then(dbres => {
            res.sendStatus(201);
        })
        .catch(err=>{
            console.error('in submission post route error:', err);
            res.sendStatus(500);
        });
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


    

//if we need to use file upload again use upload.any() and 
    //seperate files and assign to associated variable (video or file)
    // console.log('reqfile,', req.file);
    // for (let i=0; i<req.files.length; i++){
    // //check if the file at index i is the pdf file or the video file (need this to assign to db)
    // if(req.files[i].fieldname === 'file'){
    //     file = 'submissions/'+req.files[i].filename;
    // }
    // else if (req.files[i].fieldname === 'video'){
    //     video = 'submissions/'+req.files[i].filename;
    // }
    // }; 





//end for loop
//  console.log('file', file, 'video', video);
    //Big darn conditional :( There has to be a better way to do this, I just dont know how right now
    //check what submission types exist to build query text and params
//case file, video, text
// if(video && file && sub.assignmentId){
//     sqlText=`
//         INSERT INTO "submissions"
//             ("userId", "assignmentId", "textInput", "file", "video", "completed")
//         VALUES
//             ($1, $2, $3, $4, $5, $6);
//     `;
//     sqlParams =[
//         req.user.id,
//         sub.assignmentId,
//         sub.textSubmission,
//         file,
//         video,
//         true
//     ];
// }
// //case file, video
//     else if (file && video){
//         sqlText=`
//         INSERT INTO "submissions"
//             ("userId", "assignmentId", "file", "video", "completed")
//         VALUES
//             ($1, $2, $3, $4, $5);
//     `;
//     sqlParams =[
//         req.user.id,
//         sub.assignmentId,
//         file,
//         video,
//         true
//     ];
// }
// //case video, text
// else if (video && text){
//     sqlText=`
//         INSERT INTO "submissions"
//             ("userId", "assignmentId", "textInput", "file", "video", "completed")
//         VALUES
//             ($1, $2, $3, $4, $5, $6);
//     `;
//     sqlParams =[
//         req.user.id,
//         sub.assignmentId,
//         sub.textSubmission,
//         file,
//         video,
//         true
//     ];
// }
// //case file, text
// else if (){
    
// }
// //case file
// else if (){
    
// }
// //case video
// else if (){
    
// }
// //case text
// else if (){
    
// }