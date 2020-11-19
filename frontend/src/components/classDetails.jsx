import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'

const ClassDetails = () => {
    const [class_name, setClass_name] = useState('CS 3345');
    const [timeStart, setTimeStart] = useState('10:00AM');
    const [timeEnd, setTimeEnd] = useState('10:50AM');
    const [department, setDepartment] = useState('Computer Science');
    const [seats, setSeats] = useState(0);

    // get class id from params
    let {classId} = useParams()
    console.log({classId}.classId)

    // const URL = 'http://localhost:8000/classDetails/'

    // useEffect(() => {
    //     const getClassDetails = async () => {
    //         await axios.get(URL + {classId}.classId)
    //             .then(res => {
    //                 const data = res.data
    //             })
    //             .catch(err => console.log(err))
    //     }
    //     getClassDetails()
    // }, []);


    return (
        <div>
            <nav className="productNav py-2 pl-3 mb-3"><a href="#">Class Details</a> / <span className="text-secondary">{class_name}</span></nav>
            <div className="jumbotron bg-light p-2">
                <div className="container">
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
                </div>
            </div>
        </div>
    );
};

export default ClassDetails;