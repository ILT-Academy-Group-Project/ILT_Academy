

//Cohorts reducer

const cohortReducer = (state = [], action ) => {
    switch(action.type) {
        case 'SET_COHORTS':
            return action.payload;
        default:
            return state;
    }
}

export default cohortReducer;