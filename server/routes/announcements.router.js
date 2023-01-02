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
    ORDER BY "createdDate" DESC
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
router.post('/', rejectUnauthenticated, async (req, res) => {
    console.log('in announcement POST route', req.body);

    try{
        const sqlText=`
            INSERT INTO "announcements"
                ("title", "content")
            VALUES
                ($1, $2);
        `;

        const sqlParams=[req.body.title, req.body.content];
        //query to db
        await pool.query(sqlText, sqlParams);

        res.sendStatus(201);
    } catch (err){
        res.sendStatus(500);
    }
});

/**
 * DELETE route 
 */



/**
 * PUT route 
 */


module.exports = router;