const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
//reject unauthenticated
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');


//ROUTE: /api/announcements
/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, async (req, res) => {
//   console.log('in get Announcements');
//query text
const sqlText = `
    SELECT * FROM "announcements"
    ORDER BY "createdDate"
    LIMIT 2;
`;

try {
    const debRes = await pool.query(sqlText);

    res.send(debRes.rows);
} catch (err) {
    console.log('in announcements GET error:', err.message);
    res.sendStatus(500)
};

});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  
});

/**
 * DELETE route 
 */



/**
 * PUT route 
 */


module.exports = router;