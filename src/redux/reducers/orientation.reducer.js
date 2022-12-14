import { combineReducers } from "redux";

//Cohorts reducer

const orientationReducer = (state = [], action ) => {
    switch(action.type) {
        case 'SET_ORIENTATION':
            return action.payload;
        default:
            return state;
    }
}

export default orientationReducer;