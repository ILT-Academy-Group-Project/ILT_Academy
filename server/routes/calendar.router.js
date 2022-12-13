const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { google } = require('googleapis');
require('dotenv').config();



const fixedKey = process.env.GOOGLE_PRIVATE_KEY.replace(new RegExp("\\\\n", "\g"), "\n");
const jwtClient = new google.auth.JWT(
    process.env.GOOGLE_CLIENT_EMAIL,
    null,
    fixedKey,
    process.env.GOOGLE_SCOPES
);
  
const calendar = google.calendar({
    version: 'v3',
    project: process.env.GOOGLE_PROJECT_NUMBER,
    auth: jwtClient
});


/**
 * GET route template
 */
router.get('/', (req, res) => {
    console.log('in router test user info', req.user);
    calendar.events.list({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        timeMin: (new Date()).toISOString(),
        maxResults: 4,
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