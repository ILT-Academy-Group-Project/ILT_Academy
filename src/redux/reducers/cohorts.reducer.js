import { combineReducers } from 'redux';

//Cohorts reducer

const cohortReducer = (state = [], action ) => {
    switch(action.type) {
        case 'SET_COHORTS':
            return action.payload;
        default:
            return state;
    }
}

const singleCohortReducer = (state = [], action ) => {
    switch(action.type) {
        case 'SET_COHORT':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    cohortReducer,
    singleCohortReducer,

  });