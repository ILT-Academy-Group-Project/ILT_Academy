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

const editOrientationReducer = ( state={}, action ) => {
    switch(action.type) {
        case 'SET_EDIT_ORIENTATION':
            return action.payload;
        case 'UPDATE_EDIT_ORIENTATION':
            return {
                ...state,
                ...action.payload,
            };

        default:
            return state;
    }
}

export default combineReducers({
    orientationReducer,
    editOrientationReducer
})
 