const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
  

router.get('/', rejectUnauthenticated, async (req, res) => {
    try{
        const sqlText = `SELECT * FROM "series";`;
        let dbResult = await pool.query(sqlText);
        res.send(dbResult.rows);

    } catch(err) {
        console.error('series.router GET error', err.message);
        res.sendStatus(500);
    }
})

router.get('/:seriesId', rejectUnauthenticated, async (req, res) => {
    //GET all series whether they are assigned to cohort or not. 
    try{
        const sqlText = `
        SELECT * FROM "cohorts"
        JOIN "cohorts_series"
            ON "cohorts_series"."cohortId" = "cohorts"."id"
        RIGHT JOIN "series"
            ON "cohorts_series"."seriesId" = "series"."id"
            
        ;`;
        let dbResult = await pool.query(sqlText);
        res.send(dbResult.rows);

    } catch(err) {
        console.error('series.router GET error', err.message);
        res.sendStatus(500);
    }
})


module.exports = router