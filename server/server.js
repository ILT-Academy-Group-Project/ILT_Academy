const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const announcementsRouter = require('./routes/announcements.router');
const assignmentsRouter = require('./routes/assignments.router');
const submissionsRouter = require('./routes/submissions.router');
const calendarRouter = require('./routes/calendar.router');
const cohortsRouter = require('./routes/cohorts.router');
const seriesRouter = require('./routes/series.router');
const modulesRouter = require('./routes/modules.router');
const orientationRouter = require('./routes/orientation.router');
const orientationStepRouter = require('./routes/orientationStep.router');
const hackerRouter = require('./routes/hacker.router');


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/announcements', announcementsRouter);
app.use('/api/assignments', assignmentsRouter);
app.use('/api/submissions', submissionsRouter);
app.use('/api/calendar', calendarRouter);
app.use('/api/cohorts', cohortsRouter);
app.use('/api/series', seriesRouter);
app.use('/api/modules', modulesRouter);
app.use('/api/orientation', orientationRouter);
app.use('/api/orientation/step', orientationStepRouter);
app.use('/api/hipster/hacker/hustler', hackerRouter);


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
