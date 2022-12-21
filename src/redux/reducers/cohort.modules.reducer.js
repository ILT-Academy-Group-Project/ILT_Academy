const cohortModulesReducer = (state = [], action ) => {
    switch(action.type) {
        case 'SET_COHORT_MODULES':
            return action.payload;
        default:
            return state;
    }
}

export default cohortModulesReducer;