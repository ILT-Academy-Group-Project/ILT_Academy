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
        case 'SET_SINGLE_SUBMISSION':
            return action.payload;
    }
    return state;
}

export default combineReducers({
   cohortSubmissionsReducer,
   userSubmissionsReducer,
   singleSubmissionReducer
});