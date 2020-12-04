import React from "react";
import { Redirect } from "react-router-dom";
import {ClassRepository} from '../api/classRepository'
import {InstructorRepository} from '../api/instructorRepository'

class ClassForm extends React.Component {
    classRepository = new ClassRepository()
    instructorRepository = new InstructorRepository()

    state = {
        className: "",
        classCode: "",
        professor: "",
        startTime: "",
        endTime: "",
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        seatsRemaining: 0,
        newClass: false,
        instructors : null,
        department: "",
        professorID: 0
    }

    days = ""
    shouldRedirect = false

    componentDidMount(){
        const classId = this.props.match.params.classId

        if(classId){
            this.classRepository.getClass(classId)
                .then(tClass => {
                    console.log(tClass)
                    let monday = false
                    let tuesday = false
                    let wednesday = false
                    let thursday = false
                    let friday = false
                    let days = tClass[0].days

                    while(days.length > 0){
                        let temp = days.slice(0, 2)

                        if(temp === "MO")
                            monday = true
                        else if(temp === "TU")
                            tuesday = true
                        else if(temp === "WE")
                            wednesday = true
                        else if(temp === "TH")
                            thursday = true
                        else if(temp === "FE")
                            friday = true

                        days = days.slice(3)
                    }

                    this.setState({
                        className: tClass[0].className,
                        classCode: tClass[0].classCode,
                        professor: tClass[0].Insturctor,
                        professorID: tClass[0].instructorID,
                        startTime: tClass[0].timeStart,
                        endTime: tClass[0].timeEnd,
                        monday: monday,
                        tuesday: tuesday,
                        wednesday: wednesday,
                        thursday: thursday,
                        friday: friday,
                        seatsRemaining: tClass[0].seatsRemaining
                    })
                })
        } else {
            this.setState({newClass: true})
        }

        this.instructorRepository.getInstructors()
            .then((instructors) => {
                this.setState({instructors})
            })
    }

    onChange = e => {
        this.setState({[e.target.id]: e.target.value});
    };

    onClick = () => {
        this.days = ""

        if(this.state.monday)
            this.days += "MO,"
        if(this.state.tuesday)
            this.days += "TU,"
        if(this.state.wednesday)
            this.days += "WE,"
        if(this.state.thursday)
            this.days += "TH,"
        if(this.state.friday)
            this.days += "FE,"
        
        if(this.days){
            this.days = this.days.slice(0,-1)
        }

        const classData = {
            className: this.state.className,
            classCode: this.state.classCode,
            professor: this.state.professor,
            timeStart: this.state.startTime,
            timeEnd: this.state.endTime,
            days: this.days,
            seatsRemaining: this.state.seatsRemaining,
            instructorID: this.state.professorID,
            department: this.state.department
        };

        if(this.state.newClass){
            this.classRepository.addClass(classData)
            .then(() => {
                alert("Class was added")
                this.shouldRedirect = true;
                this.setState({instructors: null})
            })
        } else {
            this.classRepository.editClass(this.props.match.params.classId, classData)
            .then(() => {
                alert("Class was updated")
                this.shouldRedirect = true;
                this.setState({instructors: null})
            })
        }
    };

    render() {
        if(this.shouldRedirect){
            return <Redirect to='/classList'/>
        }

        if(!this.state.instructors)
            return <h1>Loading Instructors</h1>
        
        return (
            <div className="container">
                <div className="row">
                    <div className="col-7 col-7 mx-auto">
                        <div className="card  my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">Class Form</h5>
                                <form className="form-signin" onSubmit={this.onSubmit}>
                                    <div className="form-label-group">
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.className}
                                            id="className"
                                            type="text"
                                            className="form-control"
                                        />
                                        <label htmlFor="className">Name</label>
                                    </div>

                                    <div className="form-label-group">
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.classCode}
                                            id="classCode"
                                            type="text"
                                            className="form-control"
                                        />
                                        <label htmlFor="classCode">Class Code</label>
                                    </div>

                                    <div className="form-label-group">
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.department}
                                            id="department"
                                            type="text"
                                            className="form-control"
                                        />
                                        <label htmlFor="department">Department</label>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="professor">Instructor</label>
                                        <select id="professor" value={this.state.professorID} onChange={(e) => {this.setState({professor: parseInt(e.target.options[e.target.options.selectedIndex].getAttribute('data-value')), professorID: e.target.value})}} className="form-control">
                                            <option></option>
                                            {this.state.instructors.map((instructor) => {
                                                return <option key={instructor.instructorID} data-value={instructor.instructorID} value={instructor.instructorID}>{instructor.name}</option>
                                            })}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="startTime">Start Time</label>
                                        <select className="form-control" 
                                                id="startTime"
                                                value={this.state.startTime}
                                                onChange={event => this.setState({ startTime: event.target.value })}>
                                                <option></option>
                                                <option>09:00:00</option>
                                                <option>09:30:00</option>
                                                <option>10:00:00</option>
                                                <option>10:30:00</option>
                                                <option>11:00:00</option>
                                                <option>11:30:00</option>
                                                <option>12:00:00</option>
                                                <option>12:30:00</option>
                                                <option>13:00:00</option>
                                                <option>13:30:00</option>
                                                <option>14:00:00</option>
                                                <option>14:30:00</option>
                                                <option>15:00:00</option>
                                                <option>15:30:00</option>
                                                <option>16:00:00</option>
                                                <option>16:30:00</option>
                                                <option>17:00:00</option>
                                                <option>17:30:00</option>
                                                <option>18:00:00</option>
                                                <option>18:30:00</option>
                                                <option>19:00:00</option>
                                                <option>19:30:00</option>
                                                <option>20:00:00</option>
                                                <option>20:30:00</option>
                                                <option>21:00:00</option>
                                                <option>21:30:00</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="endTime">End Time</label>
                                        <select className="form-control" 
                                                id="endTime"
                                                value={this.state.endTime}
                                                onChange={event => this.setState({ endTime: event.target.value })}>
                                                <option></option>
                                                <option>09:00:00</option>
                                                <option>09:30:00</option>
                                                <option>10:00:00</option>
                                                <option>10:30:00</option>
                                                <option>11:00:00</option>
                                                <option>11:30:00</option>
                                                <option>12:00:00</option>
                                                <option>12:30:00</option>
                                                <option>13:00:00</option>
                                                <option>13:30:00</option>
                                                <option>14:00:00</option>
                                                <option>14:30:00</option>
                                                <option>15:00:00</option>
                                                <option>15:30:00</option>
                                                <option>16:00:00</option>
                                                <option>16:30:00</option>
                                                <option>17:00:00</option>
                                                <option>17:30:00</option>
                                                <option>18:00:00</option>
                                                <option>18:30:00</option>
                                                <option>19:00:00</option>
                                                <option>19:30:00</option>
                                                <option>20:00:00</option>
                                                <option>20:30:00</option>
                                                <option>21:00:00</option>
                                                <option>21:30:00</option>
                                        </select>
                                    </div>

                                    <div className="form-check form-check-inline inner_padding">
                                        <input
                                            onChange={() => this.setState({monday: !this.state.monday})}
                                            value={this.state.monday}
                                            id="monday"
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={this.state.monday}
                                        />
                                        <label className="form-check-label" htmlFor="monday">Monday</label>
                                        
                                        <input
                                            onChange={() => this.setState({tuesday: !this.state.tuesday})}
                                            value={this.state.tuesday}
                                            id="tuesday"
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={this.state.tuesday}
                                        />
                                        <label className="form-check-label" htmlFor="tuesday">Tuesday</label>
                                        
                                        <input
                                            onChange={() => this.setState({wednesday: !this.state.wednesday})}
                                            value={this.state.wednesday}
                                            id="wednesday"
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={this.state.wednesday}
                                        />
                                        <label className="form-check-label" htmlFor="wednesday">Wednesday</label>
                                        
                                        <input
                                            onChange={() => this.setState({thursday: !this.state.thursday})}
                                            value={this.state.thursday}
                                            id="thursday"
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={this.state.thursday}
                                        />
                                        <label className="form-check-label" htmlFor="thursday">Thursday</label>
                                        
                                        <input
                                            onChange={() => this.setState({friday: !this.state.friday})}
                                            value={this.state.friday}
                                            id="friday"
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={this.state.friday}
                                        />
                                        <label className="form-check-label" htmlFor="friday">Friday</label>
                                    </div>

                                    <div className="form-label-group">
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.seatsRemaining}
                                            id="seatsRemaining"
                                            type="number"
                                            className="form-control"
                                        />
                                        <label htmlFor="seatsRemaining">Seats Remaining</label>
                                    </div>


                                    <hr/>   
                                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="button" onClick={() => this.onClick()}>
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ClassForm;