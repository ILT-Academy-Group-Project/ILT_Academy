import { combineReducers } from 'redux';

// SETAnnouncements

const announcementsReducer = ( state=[], action ) => {
    console.log('action.payload', action.payload)
    switch(action.type) {
        case 'SET_ANNOUNCEMENTS':
            return action.payload;
    };
    return state;
};

const editAnnouncementReducer = (state={}, action) => {
    // console.log('action.payload', action.payload)
    switch(action.type) {
        case 'SET_EDIT_ANNOUNCEMENT':
            return action.payload;
        case 'UPDATE_ANNOUNCEMENT':
            return {...state, ...action.payload}
    };
    return state;
}


//PUT announcements?





//



//

export default combineReducers({
   announcementsReducer,
   editAnnouncementReducer,
});