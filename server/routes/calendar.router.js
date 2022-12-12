const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { google } = require('googleapis');


//import google api fns

const jwtClient = new google.auth.JWT(
    GOOGLE_CLIENT_EMAIL,
    null,
    GOOGLE_PRIVATE_KEY,
    SCOPES
);
  
const calendar = google.calendar({
    version: 'v3',
    project: GOOGLE_PROJECT_NUMBER,
    auth: jwtClient
});


/**
 * GET route template
 */
router.get('/', (req, res) => {
  
    calendar.events.list({
      calendarId: GOOGLE_CALENDAR_ID,
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    }, (error, result) => {
      if (error) {
        res.send(JSON.stringify({ error: error }));
      } else {
        if (result.data.items.length) {
          res.send(JSON.stringify({ events: result.data.items }));
        } else {
          res.send(JSON.stringify({ message: 'No upcoming events found.' }));
        }
      }
    });
  });

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