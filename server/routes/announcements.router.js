const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  console.log('GET all announcements');
  let accessLevel = req.user.id;
  const sqlParams = [accessLevel];

  const sqlQuery = `
    SELECT * FROM "announcements"
  `;

  pool.query(sqlQuery, sqlParams)
    .then((dbRes) => {
        res.send(dbRes.rows);
        console.log(dbRes.rows);
    })
    .catch((err) => {
      console.log('Error in GET announcements query', err);
    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
  let user_id = req.user.id;
  let newAnnouncment = req.body;

  const sqlQuery = `
    INSERT INTO "annoucements"
      ("user_id", "title", "content", "createdDate")
    VALUES
      ($1, $2, $3, $4);
  `;

  const sqlParams = [
    user_id,
    newAnnouncment.title,
    newAnnouncment.content,
    newAnnouncment.createdDate
  ];

  pool.query(sqlQuery, sqlParams)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('Error in POST announcements', err);
      res.sendStatus(500);
    });
});

/**
 * DELETE route 
 */
// router.delete('/:id', (req, res) => {
//   let idToDelete = req.params.id;
//   let accessLevel = req.user.accessLevel;
//   console.log(accessLevel);

//   const queryText = `
//     DELETE FROM "announcements"
//     WHERE "id" = $1 AND "user_id" = $2;
//   `;

//   pool.query(queryText, [idToDelete, user_id])
//     .then(() => {
//       res.sendStatus(200);
//     })
//     .catch((err) => {
//       console.log('Error in DELETE', err);
//       res.sendStatus(500);
//     });
// });



/**
 * PUT route 
 */

// GET single item
// router.get('/:id', (req, res) => {
//   const id = req.params.id;
  
//   const sqlText = `
//     SELECT * FROM "announcements"
//     WHERE "id" = $1;
//   `;
//   const sqlParams = [id];

//   pool.query(sqlText, sqlParams)
//     .then((result) => {
//       res.send(result.rows[0]);
//     })
//     .catch((err) => {
//       console.log(`Error making database query ${sqlText}`, err);
//       res.sendStatus(500);
//     });
// });

// Edit
// router.put('/:id/edit', (req, res) => {
//   let idToUpdate = req.params.id;

//   const sqlQuery = `
//     UPDATE "announcements"
//     SET 
//       "title" = $1,
//       "content" = $2
//     WHERE "id" = $3;
//   `;

//   const sqlValues = [
//     req.body.title,
//     req.body.content,
//     idToUpdate
//   ];

//   pool.query(sqlQuery, sqlValues)
//     .then((result) => {
//       res.sendStatus(201);
//     })
//     .catch((err) => {
//       console.log(`Error making DB query ${sqlQuery}`, err);
//       res.sendStatus(500);
//     });
// });

module.exports = router;