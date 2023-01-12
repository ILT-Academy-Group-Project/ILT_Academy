import { Grid } from "@mui/material";
import moment from "moment/moment";
import { PrimaryMainTheme } from "../../PrimaryMainTheme/PrimaryMainTheme";
import { ThemeProvider } from '@mui/system';
import { Typography, Card, Link } from '@mui/material'

function CalendarItem ({event}){
    return (

        // render events individually on cards
        // TODO: Figure out link permissions for calendar sharing
        <ThemeProvider theme={PrimaryMainTheme}>
        <Card
            sx={{mb:3, p:3}}>
            <Grid item sm={3} md={5} lg={8}>
                <Typography 
                variant='h3'
                sx={{ wordBreak: "break-word" }}
                >
                    <Link color='primary.main' href={event.htmlLink}>{event.summary}</Link>
                </Typography>
                <Typography 
                 color='primary.main'
                className="dateTime"
                variant='body1'
                sx={{ wordBreak: "break-word" }}
                >
                    {moment(event.start.dateTime).format('MMMM Do YYYY, h:mm:ss a')}
                </Typography>
                <Typography
                variant='body1'
                color='secondary.light'
                sx={{ wordBreak: "break-word" }}>
                    {event.location}
                </Typography>
                <Typography
                 sx={{ wordBreak: "break-word" }}
                variant='body2'
                color='secondary.main'>
                    {event.description}
                </Typography>
               
                
            </Grid>
        </Card>
        </ThemeProvider>
       
    )


};



export default CalendarItem;