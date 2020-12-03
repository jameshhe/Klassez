import React, {useEffect, useState} from 'react';
import { Paper } from '@material-ui/core';
import {ViewState} from '@devexpress/dx-react-scheduler'
import {
    Scheduler,
    WeekView,
    Appointments
} from '@devexpress/dx-react-scheduler-material-ui'
import ScheduleSelect from "./scheduleSelect";

const Schedule = () => {
    const currentDate = Date.now()
    // Assume classes start at 8/1/2020
    const year = 2020
    const month = 8
    const date = 1
    const [classes, setClasses] = useState([
        {
            startDate: new Date(year, month, date, 9),
            endDate: new Date(year, month, date, 9, 50),
            title: 'CS3381',
            rRule: 'BYDAY=MO,WE,FR',
            checked: true
        },
        {
            startDate: new Date(year, month, date, 11),
            endDate: new Date(year, month, date, 12, 15),
            title: 'CS5324',
            rRule: 'BYDAY=TU,TH',
            checked: true
        }
    ]);

    // fetch classes from database
    const URL = "http://localhost:8080/classes"
    // useEffect(() => {
    //     const fetchClasses = async () => {
    //         await axios.get(URL)
    //             .then(res => {
    //                 const allClasses = res.data
    //                 setClasses(allClasses)
    //             })
    //     }
    // },[])

    const changeClass = (myClass, checked) => {
        let newClasses = classes
        newClasses = newClasses.map(
            newClass => newClass.title === myClass.title ? {...newClass, checked: checked} : newClass
        )
        setClasses(newClasses)
    }


    return (
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <h1 className="display-4 my-2 text-center">My Schedule</h1>
                <hr/>
                <div className="row">
                    <div className="col-2">
                        <form className="form-group">
                            {classes.map((myClass, index) =>
                                <ScheduleSelect
                                    key={index}
                                    myClass={myClass}
                                    onChange={(myClass, checked) => changeClass(myClass, checked)}
                                />
                            )}
                        </form>
                    </div>


                    <div className="col-10">
                        <Paper>
                            <Scheduler data={classes.filter(myClass => myClass.checked === true)}>
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


            </div>

        </div>

    );
};

export default Schedule;
