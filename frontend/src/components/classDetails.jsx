import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'

const ClassDetails = ({class_id}) => {
    const [class_name, setClass_name] = useState('CS 3345');
    const [timeStart, setTimeStart] = useState('10:00AM');
    const [timeEnd, setTimeEnd] = useState('10:50AM');
    const [department, setDepartment] = useState('Computer Science');
    const [seats, setSeats] = useState(0);

    // get class id from params
    let {classId} = useParams()
    console.log({classId})

    const URL = 'http://localhost:8000/classDetails/'

    // useEffect(() => {
    //     const getClassDetails = async () => {
    //         await axios.get(URL + {classId}.id)
    //             .then(res => {
    //                 const data = res.data
    //             })
    //             .catch(err => console.log(err))
    //     }
    //     getClassDetails()
    // }, []);


    return (
        <div>
            return (
            <div>
                <nav className="productNav py-2 pl-3 mb-3"><a href="#">Class Details</a> / <span className="text-secondary">{class_name}</span></nav>
                <div className="jumbotron bg-light">
                    <div className="container p-0">
                        <div className="row">
                            <div className="col-9">
                                <h1 className="display-4">{class_name}</h1>
                                <h3><span className="badge badge-primary">{timeStart}</span></h3>
                                <h3><span className="badge badge-primary">{timeEnd}</span></h3>
                                <p className="text-muted">{department}</p>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
            );
        </div>
    );
};

export default ClassDetails;
