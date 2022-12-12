const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { google } = require('googleapis');
require('dotenv').config();

// const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';
const GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCb5Ej8SgTm1wUM\n05wfMXIz6rqxseKcrmRJXZrk7D1i/+/Pkweu6wj5I75FiLfADaXkHemmcOx8RwAV\nBawaLfbQtpEKINAmiut4UsyNjeJiZrfzoX0WZlytvLYr4QFLuirDxOJXW9s37cNp\nq/RPZOpy+wA9JlvVZ/w43vZMqohWb1sgnMCrRIVs9JL1WAYFAcXqC/HRo5jJM61e\nCr96VNdIVMKzE7cOEGrlM01Zs3MjuvOBrOtUmEdnXAeuYDGCEUYTOk4vvUCZg0hB\nzzb0C9U1i+M6K7WbZuQvkJq+Xnn1D2lEs/Um2A/YCol4gCxTzpdjKV9pREdhD8fQ\nueHcfVMPAgMBAAECggEADwveJYepaHRpdt73yyT1HmCyC1OdiTzlzhT8Tcslc6g7\nR8ArtizWTWGvTDvRbHaEw/tFIXz1vlsF/YFyJoa4M1XjsuQO4yF2b8MiHimLJ689\nYwT7s01G9bfop1yMyPfbh9C5ffAOPRw0R79CkeUuIdHrKHvK0lK6i+ytPiIZjaoE\nMwcEsjKzyQ6kgqToDls+3QiFHTjejEP8Jeyei2ZW0FH9e3baAY0v3JvE2xk/+oy7\n0uscpdpiNwgZNxgB0vjiaXzVmkn1junrxb4rrQGXKew6InoTbz/PVRBMhxim7xmx\ne8Laaeg/ouFZJMgrP4Pak/CvFUEa5czIynjTOu+gYQKBgQDTyzzyMv6moc8FJNcn\nGpqw7MdG4Q0KasvsOCKiBHuRpcdX4Ao8RCzpqeF/gDGHrqWg/mdnakVKultFvbxx\ndSrBYW97S/aSep0UQ/h1bS9oN9n8g7KjpfOWQQxIehiJmiK60Fl5zC2QvGys7ocT\nBusoh9/OWvqrNsn4mtvvhuGX4QKBgQC8bghW46Bs0P9oPuRHqhojNCGsq5XlzReq\naDADZWwSg3VTIWAmVE/zXleNbMw957WIRcIP/Ly8Op5xecRaXhjo2G6lrbRFoSLX\nbXC2G1a4+ZduSGILsV48ZIFNdHJf/AjtSam8yRCK65P8TbLrs8MIOu4kNhVQsLsH\nwifHKVGI7wKBgC9dBAQl40zgYquD0ZmtGWr3iJkROxlZSMFKzHPvDLNFn47HS4Ku\nvFyE4SjiQjFVnTSjr/wwh85uXnr6M2osCaO1ZnjsQ/f986LUkHuyLyffVaBi01BF\njHPNmDGdHF+pWJrufRP/1TDI8oS50vsuUOh/ek1riyM+3Wv7NbQbNdgBAoGAG9ca\nDlR1eH5sridUrS35zKfALfXwINLrozbfmTDcBeQ8anrs7NzaLzgKMZAYoTDiBm9g\nG+KYtCrpDBUUqNFsVsLbnkkK8Jq9Ph0iYRWq+4uNDzNMoTOkm8GxxRLmbz4ax4xx\nsr32XsAtzkJgpCicMVQbqWgAQDrMd3n9TJTTQisCgYBNgSI7mtffP6HTj9GXoM6/\nKrZ6O0U14lbpT3LuRfbTW2LvjWssNX0D9ZFubYuFBcDhK3dhqPDTM1ZbyFMTXgW/\nETByw1wIfINm7u7+Va/4wl9pPQftQxs1wCQ5aDL1/YIsBcTZHCZtzL+34YUVQVrO\nw3PeCI8oGARPL2BymKmDQQ==\n-----END PRIVATE KEY-----\n";
// const GOOGLE_CLIENT_EMAIL = "calender-key@ilt-calender-test.iam.gserviceaccount.com";
// const GOOGLE_PROJECT_NUMBER = "563972016875";
// const GOOGLE_CALENDAR_ID = "iltprimeacademy@gmail.com";
  
// console.log('1', GOOGLE_CLIENT_EMAIL, process.env.GOOGLE_CLIENT_EMAIL);
  
// const jwtClient = new google.auth.JWT(
//     GOOGLE_CLIENT_EMAIL,
//     null,
//     GOOGLE_PRIVATE_KEY,
//     SCOPES
// );
  
// const calendar = google.calendar({
//     version: 'v3',
//     project: GOOGLE_PROJECT_NUMBER,
//     auth: jwtClient
// });
//import google api fns


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
    
    calendar.events.list({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
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