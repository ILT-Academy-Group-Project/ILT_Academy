const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
  

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


module.exports = router