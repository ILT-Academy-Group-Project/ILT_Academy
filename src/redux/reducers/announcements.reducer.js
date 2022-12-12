import { combineReducers } from 'redux';

// SETAnnouncements
const announcmentReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ANNOUCEMENT':
            return action.payload;
        default:
            return state;
    }
}




//PUT announcements?





//



//

export default combineReducers({
    announcmentReducer,
});