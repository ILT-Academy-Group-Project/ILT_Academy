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

router.get('/:cohortId', rejectUnauthenticated, async (req, res) => {
    //GET all series assigned to cohort 
    try{
        const sqlText = `
        SELECT * FROM "cohorts"
        JOIN "cohorts_series"
            ON "cohorts_series"."cohortId" = "cohorts"."id"
        JOIN "series"
            ON "cohorts_series"."seriesId" = "series"."id"
      	WHERE "cohorts".id = $1
        ;`;
        const sqlParams = req.params.cohortId
        console.log('req.user.cohortId is ', req.params.cohortId);
        let dbResult = await pool.query(sqlText,[sqlParams]);
        res.send(dbResult.rows);

    } catch(err) {
        console.error('series.router GET error', err.message);
        res.sendStatus(500);
    }
})

router.post('/publish/:cohort/:series', rejectUnauthenticated, async (req,res) => {
    try{
        const sqlText = `
        INSERT INTO "cohorts_series"("cohortId", "seriesId")
        VALUES ($1, $2);
        `;
        const sqlParams = [req.params.cohort, req.params.series]
        console.log('🥤sqlParams are ', sqlParams);
        await pool.query(sqlText, sqlParams);
        res.sendStatus(201)

    } catch(err) {
        console.error('series.router POST publish error', err.message);
    }
})


module.exports = router