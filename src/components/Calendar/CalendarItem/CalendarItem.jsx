import { Grid } from "@mui/material";
import moment from "moment/moment";

function CalendarItem ({event}){
    return (
        <li>
            <div>
                <Grid container spacing={2}>
                    <Grid item sm={1}></Grid>
                    <Grid item sm={3}>
                        <h4>
                            <a href={event.htmlLink}>{event.summary}</a>
                        </h4>
                    </Grid>
                    <Grid item sm={8}>
                        <p className="dateTime">
                            {moment(event.start.dateTime).format('MMMM Do YYYY, h:mm:ss a')}
                        </p>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item sm={4}></Grid>
                    <Grid item sm={4}>{event.location}</Grid>
                    <Grid item sm={4}></Grid>
                </Grid>
                <Grid container spacing={2}>
                <Grid item sm={4}></Grid>
                    <Grid item sm={4}>{event.description}</Grid>
                </Grid>
            </div>
        </li>
    )


};



export default CalendarItem;