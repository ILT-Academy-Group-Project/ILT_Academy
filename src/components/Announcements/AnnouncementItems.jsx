import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

//MUI imports
import {
    TextareaAutosize,
    Input,
    Box,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Grid
} from '@mui/material'

function AnnouncementItems({submitAnnouncement, updateMode, setUpdateMode, announcement}){
    //state
    const [editMode, setEditMode] = useState(false)
    
    const dispatch = useDispatch()

    //editing state
    const announcementToEdit = useSelector(store => store.announcements.editAnnouncementReducer);
    
    //settheedit function
    const chooseEditAnnouncement = () => {
        setEditMode(!editMode);
        setUpdateMode(!updateMode);
    }



    //case editMode = true
    if(editMode){return(
        <>
            <Grid container spacing ={2}>
                <Grid item sm={2}></Grid>
                <Grid item sm={8}>
                    <Input 
                        type='Text' 
                        placeholder='Announcement' 
                        style={{ width: 200, fontSize:20, height: 30}}
                        value={announcement.title} // update local state                        
                        onChange={evt => {
                            dispatch({
                                type: 'UPDATE_ANNOUNCEMENT',
                                payload:{
                                    title: evt.target.value
                                }
                            })
                        }} 
                        required
                    />
                    
                </Grid>
                <Grid item sm={2}><button onClick={chooseEditAnnouncement}>Cancel Update</button></Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item sm={2}></Grid>
                <Grid item sm={8}>
                    <textarea
                            className='announcementTextArea'
                            required
                            placeholder="Announcement"
                            value={announcementToEdit.content} // update local state                        
                            onChange={evt => {
                                dispatch({
                                    type: 'UPDATE_ANNOUNCEMENT',
                                    payload:{
                                        title: evt.target.value
                                    }
                                })
                            }} 
                    />
                    
                    <button onClick={() => submitAnnouncement()}>Submit Update</button>
                </Grid>
                <Grid item sm={2}></Grid>
            </Grid>
        </>
    )}
    //case editmode = false (default state)
    else{
        return(
            <>
            <Grid container spacing ={2}>
                <Grid item sm={2}></Grid>
                <Grid item sm={8}>
                    <h3>{announcement.title}</h3>  
                                      
                </Grid>
                <Grid item sm={2}>
                    {
                        !updateMode ? <button onClick={chooseEditAnnouncement}>Update</button>
                        :
                        null
                    }
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item sm={2}></Grid>
                <Grid item sm={8}>
                    
                    <div className='announcementContentField'>
                        <p>
                            {announcement.content}
                        </p>
                    </div>
                    
                </Grid>
                <Grid item sm={2}></Grid>
            </Grid>
        </>
        )
    }
}

export default AnnouncementItems;