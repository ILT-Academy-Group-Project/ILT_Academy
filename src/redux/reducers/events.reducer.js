import { combineReducers } from 'redux';

// SETAnnouncement

//google calender events (next four)
const eventsReducer = (state=[], action) => {
    //set events array in switch statement
    switch(action.type) {
        case 'SET_EVENTS':
                return action.payload;
    };

    return state;
}




//PUT announcements?





//



//

export default combineReducers({
   eventsReducer,
});