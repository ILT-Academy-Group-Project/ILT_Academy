import { useSelector } from "react-redux";

function CreateAssignment(){
    
    const user = useSelector(store => store.user);
    console.log(user.accessLevel)
    
    return(
        <>
        <h2>MEowMEOW</h2>
        </>
    )
}

export default CreateAssignment