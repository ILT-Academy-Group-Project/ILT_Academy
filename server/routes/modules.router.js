const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
  

router.get('/:seriesId', rejectUnauthenticated, async (req, res) => {
    try{
        const sqlText = 
            `SELECT * FROM "modules" 
            WHERE "seriesId" = $1;`;

        const sqlParams = req.params.seriesId;

        let dbResult = await pool.query(sqlText, [sqlParams]);
        res.send(dbResult.rows);

    } catch(err) {
        console.error('modules.router GET error', err.message);
        res.sendStatus(500);
    }
})


module.exports = router