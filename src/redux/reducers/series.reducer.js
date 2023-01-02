

//Series reducer

const seriesReducer = (state = [], action ) => {
    switch(action.type) {
        case 'SET_SERIES':
            return action.payload;
        default:
            return state;
    }
}



export default seriesReducer;