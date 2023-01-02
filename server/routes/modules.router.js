const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
  
//GET all modules in specific series
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

//GET published modules for specific cohort and series
router.get('/cohort/:cohortId/:seriesId', rejectUnauthenticated, async (req, res) => {
    try{
        const sqlText = 
            `SELECT "cohorts_modules".id AS "cohorts_modules_join_id", "cohorts_modules"."cohortId", "cohorts_modules"."assignedDate", "cohorts_modules"."dueDate", "cohorts_modules"."moduleId", JSON_agg("modules"."seriesId") AS "seriesId", JSON_agg("modules".name) AS "moduleName"
            FROM "cohorts_modules"
            JOIN "modules" ON "modules".id = "cohorts_modules"."moduleId"
            WHERE "cohorts_modules"."cohortId" = $1 AND "modules"."seriesId" = $2
            GROUP BY "cohorts_modules_join_id";
            `;
        const sqlParams = [req.params.cohortId, req.params.seriesId];
        console.log('get cohort modules params  ', sqlParams);

        let dbResult = await pool.query(sqlText, sqlParams);
        res.send(dbResult.rows);

    } catch(err) {
        console.error('modules.router GET error', err.message);
        res.sendStatus(500);
    }
})

router.post('/publish/:cohortId/:moduleId', rejectUnauthenticated, async (req, res) => {
    try{
        const sqlText = `
        INSERT INTO "cohorts_modules"("cohortId", "moduleId")
        VALUES($1, $2);
        `;
        const sqlParams = [req.params.cohortId, req.params.moduleId]
        console.log('🎅 module post sqlParams are', sqlParams);
        await pool.query(sqlText, sqlParams);
        res.sendStatus(201);
    } catch(err) {
        console.error('modules.router POST publish error ', err.message);
    }
})

//POST new module route
router.post('/', rejectUnauthenticated, async (req, res) => {
    // console.log('in POST new module with:', req.body);

    try{
        //inserting into the modules table to create a new module
        const sqlText = `
            INSERT INTO "modules"
                ("seriesId", "name")
            VALUES
                ($1, $2)
        `;

        const sqlParams = [req.body.seriesId, req.body.name];
        
        await pool.query(sqlText, sqlParams);

        res.sendStatus(201);

    } catch (err) {
        console.error('in POST new module route error', err);
        res.sendStatus(500);
    }
})


router.delete('/:id', rejectUnauthenticated, async (req, res) => {
    console.log('in Modules DELETE rte with id of:', req.params.id);

    //query time
    try{
        const sqlText = `
            DELETE FROM "modules"
            WHERE "id" = $1;
        `;
        await pool.query(sqlText, [req.params.id]);

        res.sendStatus(200);

    } catch (err) {
        console.error('error in modules DELETE rte', err.message)
        res.sendStatus(500);
    }

})

module.exports = router