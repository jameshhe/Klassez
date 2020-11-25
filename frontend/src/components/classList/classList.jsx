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


        return <table>
        <tbody>
    
    {
        this.state.classes.map((x, i) => <tr key={i}>
            <td>
                <table>
                    <tbody>
                        
                        {
                            (this.previous !== x.classCode) ? 
                            <h1>{x.classCode} - {x.className}</h1>
                            
                            :
                            <></>
                        }
                        <div className="hidden">
                            {this.previous = x.classCode}
                        </div>
                        
                        <tr>
                            <td>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Instructor</th>
                                            <th>Days and Times</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border">{x.classID}</td>
                                            <td className="border">{x.professor}</td>
                                            <td className="border">{x.days} {x.timeStart}-{x.timeEnd}</td>
                                            <td className="border"><Link to={`/classes/${x.classID}`}>View Details</Link></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        )
    }
        </tbody>
    </table>;
    }
}

export default ClassList;