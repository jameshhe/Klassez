import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom'
import axios from 'axios'
import store from '../store'

const ClassDetails = () => {
    const [class_name, setClass_name] = useState('');
    const [timeStart, setTimeStart] = useState('');
    const [timeEnd, setTimeEnd] = useState('');
    const [department, setDepartment] = useState('');
    const [seats, setSeats] = useState(0);
    const [classCode, setClassCode] = useState('')
    const [instructor, setInstructor] = useState('')
    const [instructorID, setInstructorID] = useState(0)
    const [days, setDays] = useState('')

    const user = store.getState().auth.user

    var shouldShow = new Boolean(user)

    if(shouldShow)
        shouldShow = (user.type == 2)

    // get class id from params
    let {classId} = useParams()

    const URL = 'http://localhost:8080/api/classes/'

    useEffect(() => {
        const getClassDetails = async () => {
            await axios.get(URL + {classId}.classId)
                .then(res => {
                    const data = res.data[0]
                    setClass_name(data.className)
                    setTimeStart(data.timeStart)
                    setTimeEnd(data.timeEnd)
                    setDepartment(data.department)
                    setSeats(data.seatsRemaining)
                    setClassCode(data.classCode)
                    setInstructor(data.Insturctor)
                    setInstructorID(data.instructorID)
                    setDays(data.days)
                })
                .catch(err => console.log(err))
        }
        getClassDetails()
    }, []);

    return (
        <div>
            <nav className="productNav py-2 pl-3 ml-3 mb-3"><a href="/classList">Class List</a> / <span className="text-secondary">{class_name}</span></nav>
            <div className="jumbotron bg-light p-2">
                <div className="col-md-6 offset-md-2">
                <div className="row">
                        <p><span className="badge badge-primary mx-1">{timeStart}</span></p>
                        <p>-</p>
                        <p><span className="badge badge-primary ml-1">{timeEnd}</span></p>
                    </div>
                    <div className="row">
                        <div className="m-0">
                            <h1 className="display-4 my-0">{class_name}</h1>
                            <p className="text-muted ml-1">{department}</p>
                        </div>
                    </div>

                    <div className="row">
                        <p className="ml-1">There are <b>{seats}</b> seats remaining!</p>
                    </div>
                    {
                        (shouldShow) ? 
                        <Link className='btn btn-primary' to={`/classes/edit/${{classId}.classId}`}>Edit Class</Link> :
                        <></>
                    }

                    <Link className='btn btn-primary' to={`/recommendations/classes/${classId}`}>Class Reviews</Link>
                    
                </div>
            
            </div>
        </div>
    );
};

export default ClassDetails;
