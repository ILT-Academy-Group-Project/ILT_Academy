

//modules reducer

const modulesReducer = (state = [], action ) => {
    switch(action.type) {
        case 'SET_MODULES':
            return action.payload;
        default:
            return state;
    }
}

export default modulesReducer;