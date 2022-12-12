

const assignmentsReducer = (state = [], action ) => {
    switch(action.type) {
        case 'SET_ASSIGNMENTS':
            return action.payload;
        default:
            return state;
    }
}

export default assignmentsReducer;