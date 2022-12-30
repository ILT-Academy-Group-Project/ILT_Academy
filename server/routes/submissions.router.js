const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const path = require('path');
const uploadImage= require('../Util/s3Upload');
const fs = require('fs');
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
router.get('/user/assignments/:assignmentId', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, upload.single('file'), async (req, res) => {
    console.log('req.body', req.body, req.body.assignmentId);
    let sub=req.body;
//  console.log('req.files', req.files);
    //set up all variables for submissions
    let video;
    let file;
    let text;
    let sqlText;
    let sqlParams;

    if(req.file){
            //call s3 route as async to get file path
    file = await uploadImage(req.file);

    //after image in S3 bucket delete the file
    fs.unlink(req.file.path,()=>{
        console.log('file deleted');
    });
    }
    else{file=null};

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


//GET all assignments and users in cohort in order to show submitted and unsubmitted user status
//will narrow down to specific assignment on front end for now but keeping params in url to not make things too messy
router.get('/:cohortId/:assignmentId', rejectUnauthenticated, async (req, res) => {
    try{
        const sqlText = `
        SELECT "submissions".id, "submissions"."userId", "submissions"."assignmentId", "submissions".completed, "submissions".file, "submissions"."submissionDate", "submissions"."textInput", "submissions".video, "user"."cohortId", "user"."firstName", "user"."lastName", "user".id AS "studentId" FROM "submissions"
        RIGHT JOIN "user" ON "user".id = "submissions"."userId"
        WHERE "user"."cohortId" = $1;
        `;
        const sqlParams = [req.params.cohortId]
        // console.log('sqlParams for submissions GET are ', sqlParams);
        let dbResult = await pool.query(sqlText, sqlParams);
        res.send(dbResult.rows);
    } catch(err) {
        console.error('submissions.router GET error ', err.message);
        res.sendStatus(500);
    }
})

/*
GET by userid route
*/
//get all assignments for the logged in user
router.get('/user', rejectUnauthenticated, async (req, res) => {
    // console.log('inside get by userid assignment submissions');

    //setup query
    let sqlText = `
    SELECT * FROM "submissions" 
    WHERE "userId" = $1;
    `;

    try{
        //get info from the database
        const dbRes = await pool.query(sqlText, [req.user.id])
        //send to client
        res.send(dbRes.rows);
    } catch (err){
        console.error('in submissions GET by userid error', err.message);
        res.sendStatus(500);
    }
})


/**
 Get single submission for this one assignment
 */
router.get('/user/assignment/:assignmentId', rejectUnauthenticated, async (req, res) => {
    // console.log('in GET single submission by user and assignmentID with id of', req.params.assignmentId);
    //get the assignment info for the selected assignment where this user submitted it
    const sqlText=`
    SELECT * FROM "submissions"
    WHERE "userId" = $1 AND "assignmentId" = $2;
    `;

    try{
        const dbRes = await pool.query(sqlText, [req.user.id, req.params.assignmentId])
        res.send(dbRes.rows[0]);
    } catch (err) {
        console.log('error in get single submission', err);
        res.sendStatus(500);
    }
  });
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