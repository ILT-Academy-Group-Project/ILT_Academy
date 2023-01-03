import { combineReducers } from 'redux';

// SETAnnouncements

const announcementsReducer = ( state=[], action ) => {

    switch(action.type) {
        case 'SET_ANNOUNCEMENTS':
            return action.payload;
    };
    return state;
};


//PUT announcements?





//



//

export default combineReducers({
   announcementsReducer,
});