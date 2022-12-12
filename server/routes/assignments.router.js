const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, async (req, res) => {
  try{
      const sqlText = 
          `SELECT * FROM "assignments"`;

      let dbResult = await pool.query(sqlText);
      res.send(dbResult.rows);

  } catch(err) {
      console.error('assignments.router GET error', err.message);
      res.sendStatus(500);
  }
})

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

/**
 * GET:ID route 
 */



/**
 * DELETE route 
 */



/**
 * PUT route 
 */


module.exports = router;