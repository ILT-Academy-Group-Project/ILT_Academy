import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// MUI Imports
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

// Not sure if we need this for createdDate?
// import dayjs from 'dayjs';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';

function Announcements() {
    console.log('in announcements');
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    // const [createdDate, setCreatedDate] = useState('');

    const addNewAnnouncement = () => {
        console.log('in addNewAnnouncement');

        const newAnnouncement = {
            title: title,
            content: content,
            // createdDate: createdDate
        }

        // dispatch({
        //     type: ''
        // })
    }

    // const handleAddDate = (value) => {
    //     console.log('Add date value is:', value.$d);
    //     setCreatedDate(value);
    // }

    return (
        <>
            <div className='title'>
                <h1>Create New Announcement</h1>
            </div>     

            <Stack 
                className='myBox'
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

                {/* <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DateTimePicker
                        renderInput={(params) => {
                            return <TextField {...params} />;
                        }}
                        variant="outlined"
                        // value={dayjs(addDate).format('L LT')}
                        inputFormat="YYYY/MM/DD hh:mm a"
                        value={dayjs(createdDate).format('L LT')}
                        onChange={handleAddDate}
                    />
                    </LocalizationProvider> */}

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