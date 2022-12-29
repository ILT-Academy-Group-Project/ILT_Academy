import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function StudentModules (){
    //set up hooks
    const params = useParams();
    const history = useHistory();


    return(
        <h1>Meow in student modules with id {params.id}</h1>
    )
}

export default StudentModules;