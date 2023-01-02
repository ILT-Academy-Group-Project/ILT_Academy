const cohortSeriesReducer = (state = [], action ) => {
    switch(action.type) {
        case 'SET_COHORT_SERIES':
            return action.payload;
        default:
            return state;
    }
}

export default cohortSeriesReducer;