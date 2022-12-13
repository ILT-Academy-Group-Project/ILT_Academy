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
        `SELECT * FROM "user"
        JOIN "cohorts" ON "cohorts".id = "user"."cohortId"
        WHERE "cohortId" = $1
        ;`;

        const sqlParams = req.params.cohortId
        console.log('sqlParams in cohort router are 💖', sqlParams);

        let dbResult = await pool.query(sqlText,[sqlParams]);
        res.send(dbResult.rows);

    } catch(err) {
        console.error('cohorts.router GET error', err.message);
        res.sendStatus(500);
    }
})


module.exports = router