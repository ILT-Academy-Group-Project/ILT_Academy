import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// MUI Imports
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function Announcements() {
    console.log('in announcements');
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const addNewAnnouncement = () => {
        console.log('in addNewAnnouncement');

        const newAnnouncement = {
            title: title,
            content: content,
        }

        dispatch({
            type: 'CREATE_ANNOUNCEMENT',
            payload: newAnnouncement
        })
    }

    return (
        <>
            <div className='title'>
                <h1>Create New Announcement</h1>
            </div>     

            <Stack 
                component="form" 
                mx={'auto'}
                sx={{ 
                    '& .MuiTextField-root': { p: 6, width: '25rem', height: '6rem', 
                    bgcolor: '#c2cfd3', borderRadius: 5, justifyContent: 'center' },
                    color: 'text.primary'
                }}
                noValidate
                spacing={1}
                autoComplete="off"
            >
                <TextField
                    required
                    id="filled-required"
                    label="Title"
                    placeholder="Title"
                    variant="filled"
                    onChange={(event) => setTitle(event.target.value)}
                    value={title}
                />

                <TextField
                    required
                    id="outlined-multiline-flexible"
                    label="Content"
                    placeholder="Content"
                    variant="filled"
                    multiline
                    maxRows={6}
                    onChange={(event) => setContent(event.target.value)}
                    value={content}
                />

                <Button
                    type="submit"
                    variant="contained"
                    sx={{ p: 2, width: 175, borderRadius: 4 }}
                    onClick={addNewAnnouncement}
                >
                    Add Announcement
                </Button>
                
            </Stack>
        </>
    );
}

export default Announcements;