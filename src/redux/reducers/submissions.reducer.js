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



export default combineReducers({
   cohortSubmissionsReducer,
});