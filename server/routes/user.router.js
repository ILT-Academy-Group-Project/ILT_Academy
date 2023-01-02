const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

//Handles GET from student.saga 
router.get('/:username', rejectUnauthenticated, async (req, res) => {
    try{
        const sqlText = `
        SELECT * FROM "user" 
        WHERE "user".username = $1;
        `;
        const sqlParams = [req.params.username]
    
        let dbResult = await pool.query(sqlText,sqlParams)
        res.send(dbResult.rows[0]);
    } catch(err) {
        console.error('user.router GET by username error ', err.message);
        res.sendStatus(500);
    }
   
})

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', async (req, res, next) => {
    const username = req.body.username;
    const password = encryptLib.encryptPassword(req.body.password);
    //assign accessCode to variable
    const accessCode = req.body.accessCode
    //   console.log('req.body', req.body);
    const accessSql = `
    SELECT "cohorts"."id" as "cohortId", 
	"cohorts"."accessCode" as "cohortAccessCode",
    "adminCode"."adminCode" from "cohorts", "adminCode";    
    `
    try{
        //get all access codes and assign to accessInfo
        let accessInfo = await pool.query(accessSql);
        // console.log('accessInfo', accessInfo.rows);
        let accessLvl;
        let cohortId;
        let queryText;
        let queryParams;
        for (let accessRow of accessInfo.rows){
            // if the cohort accesscode of this object from db == access code submitted by user
            // assign user the specified cohort
            if(accessRow.cohortAccessCode === accessCode){
                //set access level to student(1)
                accessLvl = 1;
                //set cohortID to the cohortId for querying to the user db
                cohortId = accessRow.cohortId;
                //create queryText for the pool.query to the db with cohort id assigned
                queryText = `
                    INSERT INTO "user"
                        ("username", "password", "cohortId")
                    VALUES
                        ($1, $2, $3);
                `;
                //set query Params for query
                queryParams = [username, password, cohortId];
            }
            //admin creation for access level 2
            //if provided code equals the adminCode set admin access level 2
            else if (accessRow.adminCode === accessCode){
                //set access level to admin(2)
                accessLvl = 2;
                //set query text for the admin user creation
                queryText = `
                    INSERT INTO "user"
                        ("username", "password", "accessLevel")
                    VALUES
                        ($1, $2, $3);
                `;
                queryParams = [username, password, accessLvl];
            };
        }; //end for loop
        //send query to the database
        pool
        .query(queryText, queryParams)
        .then(() => res.sendStatus(201))
        .catch((err) => {
          console.log('User registration failed: ', err);
          res.sendStatus(500);
        });

    }
    catch{
        console.error('POST /register', err);
        res.sendStatus(500);
    }
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
