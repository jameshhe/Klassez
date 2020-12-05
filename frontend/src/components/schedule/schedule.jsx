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
import { Link, useLocation } from 'react-router-dom';
import {ClassRepository} from '../../api/classRepository'

const Schedule = () => {
    const store = useSelector(state => state.auth)
    const location = useLocation()
    const classRepository = new ClassRepository()


    const currentDate = Date.now()
    // Assume classes start at 8/1/2020
    const year = 2020
    const month = 8
    const date = 1
    const [classes, setClasses] = useState([]);

    // fetch classes from database
    const URL = "http://3.138.183.180:8080/api/classes/"
    useEffect(() => {
        const fetchClasses = async () => {
            await axios.get(URL+store.user.id)
                .then(res => {
                    let allClasses = []
                    
                    if(res.data[0] && res.data[0].classesList){
                        let classList = (res.data[0].classesList).split(', ')
                        for(var k = classList.length - 1; k >=0; k-- ){
                            classRepository.getClass(parseInt(classList[k]))
                            .then((tClass) => {
                                allClasses.push(tClass)

                                const myClasses = []

                                allClasses.map(newClass => {
                                    const starts = newClass.timeStart.split(':')
                                    const ends = newClass.timeEnd.split(':')
                                    const myClass = {
                                        startDate: new Date(year, month, date, starts[0], starts[1]),
                                        endDate: new Date(year, month, date, ends[0], ends[1]),
                                        title: newClass.classCode,
                                        rRule: `BYDAY=${newClass.days}`,
                                        checked: true
                                    }
                                    myClasses.push(myClass)
                                })
                                setClasses(myClasses)
                            })
                        }
                    }
                })
        }
        if(!location.state || !location.state.selectedClasses)
            fetchClasses()
        else{
            const allClasses = location.state.selectedClasses
            const myClasses = []

            allClasses.map(newClass => {
                console.log(newClass)
                const starts = newClass.timeStart.split(':')
                const ends = newClass.timeEnd.split(':')
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
                <center>
                    <Link className='btn btn-primary' to='/classSelector'>Change Selected Classes</Link>
                </center>
                
                
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
