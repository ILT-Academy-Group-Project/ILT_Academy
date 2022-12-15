import { combineReducers } from 'redux';

const assignmentsReducer = (state = [], action ) => {
    switch(action.type) {
        case 'SET_ASSIGNMENTS':
            return action.payload;
        default:
            return state;
    }
}

const selectedAssignmentReducer = ( state={}, action ) => {
    switch(action.type) {
        case 'SET_SELECTED_ASSIGNMENT':
            return action.payload;
        default:
            return state;
    }
}

const seriesAssignmentReducer = ( state=[], action ) => {
    switch(action.type) {
        case 'SET_SERIES_ASSIGNMENTS':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    selectedAssignmentReducer,
    assignmentsReducer,
    seriesAssignmentReducer,
})