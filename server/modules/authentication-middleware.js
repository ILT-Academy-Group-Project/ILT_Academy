

const rejectUnauthenticated = (req, res, next) => {
  // check if logged in
  if (req.isAuthenticated()) {
    // They were authenticated! User may do the next thing
    // Note! They may not be Authorized to do all things
    next();
  } else {
    // failure best handled on the server. do redirect here.
    res.sendStatus(403);
  }
};

//will reject requests made by users without admin level clearance
const rejectNotAdmin = (req, res, next) => {
  console.log('IN REJECTNOTADMIN req.user.accessLevel is ', req.user.accessLevel);
  if (req.user.accessLevel >= 2){
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = { rejectUnauthenticated, rejectNotAdmin };
