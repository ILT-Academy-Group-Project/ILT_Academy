import { combineReducers } from 'redux';



const cohortSubmissionsReducer = (state = [], action) => {
    //SET submissions for assignment by cohort
    switch(action.type) {
        case 'SET_COHORT_ASSIGNMENT_SUBMISSIONS': 
            return action.payload;
        default:
            return state;
    }
}

const userSubmissionsReducer = (state =[], action) => {
    switch(action.type) {
        case 'SET_USER_SUBMISSIONS':
            return action.payload;
    }
    return state;
}

const singleSubmissionReducer = (state = {}, action) => {
    switch(action.type) {
        // set initial state if there is already a user submission
        case 'SET_SINGLE_SUBMISSION':
            return action.payload;
        //update submission (if there is an id this will go through put)
        //if no id it will go through post
        case 'UPDATE_SINGLE_SUBMISSION':
            return {...state, ...action.payload};
    }
    return state;
}

export default combineReducers({
   cohortSubmissionsReducer,
   userSubmissionsReducer,
   singleSubmissionReducer
});