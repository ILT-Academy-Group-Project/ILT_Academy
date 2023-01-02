const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.put('/', rejectUnauthenticated, async (req,res) => {
    try{
        const sqlText =`
            UPDATE "user"
            SET
                "firstName" = $1,
                "lastName" = $2,
                "email" = $3,
                "hipsterInterest" = $4,
                "hipsterSkill" = $5,
                "hackerInterest" = $6,
                "hackerSkill" = $7,
                "hustlerInterest" = $8,
                "hustlerSkill" = $9
            WHERE
                "id"=$10;
        `;
        const sqlParams = [req.body.firstName, 
            req.body.lastName,
            req.body.email, 
            req.body.hipsterInterest, 
            req.body.hipsterSkill, 
            req.body.hackerInterest, 
            req.body.hackerSkill, 
            req.body.hustlerInterest, 
            req.body.hustlerSkill,
        req.body.id];

        console.log('🥤sqlParams are ', sqlParams);

        await pool.query(sqlText, sqlParams);
        res.sendStatus(201)

    } catch(err) {
        console.error('series.router POST publish error', err.message);
    }
})


module.exports = router