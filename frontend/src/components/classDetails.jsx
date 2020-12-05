import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom'
import axios from 'axios'
import store from '../store'

const ClassDetails = () => {
    const [classDetail, setClassDetail] = useState({})

    const user = store.getState().auth.user

    var shouldShow = new Boolean(user)

    if(shouldShow)
        shouldShow = (user.type == 2)

    // get class id from params
    let {classId} = useParams()

    const URL = 'http://3.138.183.180:8080/api/classes/'

    useEffect(() => {
        const getClassDetails = async () => {
            await axios.get(URL + {classId}.classId)
                .then(res => {
                    const data = res.data[0]
                    const classData = {
                        class_name: data.className,
                        timeStart: data.timeStart,
                        timeEnd: data.timeEnd,
                        department: data.department,
                        seats: data.seatsRemaining,
                        classCode: data.classCode,
                        instructor: data.Instructor
                    }
                    setClassDetail(classData)
                    
                })
                .catch(err => console.log(err))
        }
        getClassDetails()
    }, []);

    return (
        <div>
            <nav className="productNav py-2 pl-3 ml-3 mb-3"><a href="#">Class Details</a> / <span className="text-secondary">{classDetail.class_name}</span></nav>
            <div className="jumbotron bg-light p-2">
                <div className="col-md-6 offset-md-2">
                <div className="row"> 
                        <p><span className="badge badge-primary mx-1">{classDetail.timeStart}</span></p>
                        <p>-</p>
                        <p><span className="badge badge-primary ml-1">{classDetail.timeEnd}</span></p>
                    </div>
                    <div className="row">
                        <div className="m-0">
                            <h1 className="display-4 my-0">{classDetail.class_name}</h1>
                            <p className="text-muted ml-1">{classDetail.department}</p>
                        </div>
                    </div>

                    <div className="row">
                    <div className="m-0">
                        <h1 className="display-4 my-0">{classDetail.instructor}</h1>
                        <p className="ml-1">There are <b>{classDetail.seats}</b> seats remaining!</p>
                        </div>
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
