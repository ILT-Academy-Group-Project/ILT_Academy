
const cohortStudentReducer = (state = [], action ) => {
    switch(action.type) {
        case 'SET_COHORT_STUDENTS':
            return action.payload;
        default:
            return state;
    }
}

export default cohortStudentReducer;