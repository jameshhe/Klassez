import React, {useEffect, useState} from 'react';
import { Paper } from '@material-ui/core';
import {ViewState} from '@devexpress/dx-react-scheduler'
import {
    Scheduler,
    WeekView,
    Appointments
} from '@devexpress/dx-react-scheduler-material-ui'
import ScheduleSelect from "./scheduleSelect";
import { useSelector } from 'react-redux';
import axios from 'axios'
import { useLocation } from 'react-router-dom';

const Schedule = () => {
    const store = useSelector(state => state.auth)
    console.log(store.user.id)
    const location = useLocation()
    console.log(location)


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
    const URL = "http://3.138.183.180:8080/api/classes/"
    useEffect(() => {
        const fetchClasses = async () => {
            await axios.get(URL+store.user.id)
                .then(res => {
                    const allClasses = res.data
                    const myClasses = []
                    allClasses.map(newClass => {
                        console.log(newClass)
                        const starts = newClass.timeStart.split(':')
                        const ends = newClass.timeEnd.split(':')
                        console.log(starts, ends)
                        const myClass = {
                            startDate: new Date(year, month, date, starts[0], starts[1]),
                            endDate: new Date(year, month, date, ends[0], ends[1]),
                            title: newClass.classCode,
                            rRule: `BYDAY=${newClass.days}`,
                            checked: true
                        }
                        myClasses.push(myClass)
                    })
                    console.log(myClasses)
                    setClasses(myClasses)
                })
        }
        if(!location.state.selectedClasses)
            fetchClasses()
        else{
            const allClasses = location.state.selectedClasses
            const myClasses = []
            allClasses.map(newClass => {
                console.log(newClass)
                const starts = newClass.timeStart.split(':')
                const ends = newClass.timeEnd.split(':')
                console.log(starts, ends)
                const myClass = {
                    startDate: new Date(year, month, date, starts[0], starts[1]),
                    endDate: new Date(year, month, date, ends[0], ends[1]),
                    title: newClass.classCode,
                    rRule: `BYDAY=${newClass.days}`,
                    checked: true
                }
                myClasses.push(myClass)
            })
            console.log(myClasses)
            setClasses(myClasses)
        }
    },[])

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
