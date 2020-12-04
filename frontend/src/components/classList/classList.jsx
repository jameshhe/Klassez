import React from 'react'
import "./classList.css"
import {ClassRepository} from '../../api/classRepository'
import {Link} from 'react-router-dom'

export class ClassList extends React.Component{
    classRepository = new ClassRepository()
    previous = ""

    state = {
        classes: null
    }

    componentDidMount(){
        this.classRepository.getClasses()
        .then(classes => {
            console.log(classes)
            classes = classes.sort((x, y) => (
                x.classCode > y.classCode ? 1 : -1)
            )
            this.setState({classes})
        })
    }

    render(){
        if(!this.state.classes){
            return <div>Loading Classes...</div>
        }


        return <ul>
    
    {
        this.state.classes.map((x, i) => <li key={i} className="card">
                <table>
                    {
                        (this.previous !== x.classCode) ? 
                        <div className="card-header"><b>{x.classCode} - {x.className}</b></div>
                        :
                        <></>
                    }
                    <div className="hidden">
                        {this.previous = x.classCode}
                    </div>

                    <tbody>
                        <tr>
                            <td>
                                <table className="table table-hover table-sm">
                                    <thead>
                                        <tr>
                                            <th>Available Seats</th>
                                            <th>Instructor</th>
                                            <th>Days and Times</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border">{x.seatsRemaining}</td>
                                            <td className="border">{x.Insturctor}</td>
                                            <td className="border">{x.days} {x.timeStart}-{x.timeEnd}</td>
                                            <td className="border"><Link to={`/classes/${x.classID}`}>View Details</Link></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </li>
        )
    }
    </ul>;
    }
}

export default ClassList;