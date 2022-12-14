const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');
  

router.put('/', rejectUnauthenticated, async (req, res) => {
    console.log('req.body!', req.body);

    try{
        const sqlText = `UPDATE "user" 
        SET "oriented" = $1
        WHERE "id" = $2;`;

        const sqlParams = [req.body.step, req.body.id];

        await pool.query(sqlText, sqlParams);
    
        res.sendStatus(200);

    } catch(err) {
        console.error('series.router GET error', err.message);
        res.sendStatus(500);
    }
})

router.get('/:id', rejectUnauthenticated, async (req, res) => {
    console.log('req.body!', req.params.id);

    const id = parseInt(req.params.id);

    console.log('req.body!', id);

    try{
        const sqlText = `SELECT * FROM "user" 
        WHERE "id" = $1;`;

        const sqlParams = [id];
        
        let dbResult = await pool.query(sqlText, sqlParams);
    
        res.send(dbResult.rows[0]);

    } catch(err) {
        console.error('series.router GET error', err.message);
        res.sendStatus(500);
    }
})


module.exports = router