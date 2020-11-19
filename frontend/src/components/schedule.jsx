import React, {useEffect, useState} from 'react';
import { Paper } from '@material-ui/core';
import {ViewState} from '@devexpress/dx-react-scheduler'
import {
    Scheduler,
    WeekView,
    Appointments
} from '@devexpress/dx-react-scheduler-material-ui'

const Schedule = () => {
    const currentDate = Date.now()
    // Assume classes start at 8/1/2020
    const year = 2020
    const month = 8
    const date = 1
    const [classes, setClasses] = useState([
        {
            startDate: new Date(2020, 1, 9, 9),
            endDate: new Date(2020, 1, 9, 9, 50),
            title: 'CS3381',
            rRule: 'BYDAY=MO,WE,FR'
        },
        {
            startDate: new Date(2020, 1, 9, 11),
            endDate: new Date(2020, 1, 9, 12, 15),
            title: 'CS5324',
            rRule: 'BYDAY=TU,TH'
        }
    ]);

    // fetch classes from database
    const URL = "http://localhost:8000/classes"
    // useEffect(() => {
    //     const fetchClasses = async () => {
    //         await axios.get(URL)
    //             .then(res => {
    //                 const allClasses = res.data
    //                 setClasses(allClasses)
    //             })
    //     }
    // },[])

    return (
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <h1 className="display-4 my-2 text-center">My Schedule</h1>
                <hr/>
                <Paper>
                    <Scheduler data={classes}>
                        <ViewState currentDate={currentDate}/>
                        <WeekView
                            startDayHour={8}
                            endDayHour={22}
                            excludedDays={[0, 6]}
                            cellDuration={30}
                        />
                        <Appointments />
                    </Scheduler>
                </Paper>
            </div>

        </div>

    );
};

export default Schedule;
