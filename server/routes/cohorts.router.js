const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
  
//GET all cohorts
router.get('/', rejectUnauthenticated, async (req, res) => {
    try{
        const sqlText = `SELECT * FROM "cohorts";`;
        let dbResult = await pool.query(sqlText);
        res.send(dbResult.rows);

    } catch(err) {
        console.error('cohorts.router GET error', err.message);
        res.sendStatus(500);
    }
})

//GET all students in cohort by ID as well as cohort info
router.get('/:cohortId', rejectUnauthenticated, async (req, res) => {
    try{
        const sqlText = 
        `SELECT "user"."id", "user"."firstName", "user"."lastName", "user"."email", "user"."slack", "user"."username", "user"."accessLevel", "user"."cohortId", "cohorts"."cohortName" FROM "user"
        JOIN "cohorts" ON "cohorts".id = "user"."cohortId"
        WHERE "user"."cohortId" = $1;
        `;

        const sqlParams = req.params.cohortId
        console.log('sqlParams in cohort router are 💖', sqlParams);

        let dbResult = await pool.query(sqlText,[sqlParams]);
        res.send(dbResult.rows);

    } catch(err) {
        console.error('cohorts.router GET error', err.message);
        res.sendStatus(500);
    }
})

// POST COHORT

router.post('/', rejectUnauthenticated, async(req, res) => {
    // console.log('in Cohorts POST route', req.body);

    try {
        //sql text for query
        const sqlText = `
            INSERT INTO "cohorts"
                ("cohortName", "accessCode")
            VALUES
                ($1, $2);
        `;
        //sql parameters for query
        const sqlParams = [req.body.cohortName, req.body.accessCode];

        await pool.query(sqlText, sqlParams);

        res.sendStatus(201);

    } catch (err) {
        if(err.detail.includes('already exists')){
            res.send('accessCode or cohortname already exists');
        } 
        else{
            res.sendStatus(500);
            console.error('in POST cohort route error', err);
        }    
    }
})


module.exports = router