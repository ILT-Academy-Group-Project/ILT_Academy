import { combineReducers } from 'redux';

// SETAnnouncements
const announcements = (state = [], action) => {
    switch (action.type) {
        case 'SET_ANNOUNCEMENT':
            return action.payload;
        default:
            return state;
    }
}




//PUT announcements?





//



//

export default combineReducers({
    announcements,
});