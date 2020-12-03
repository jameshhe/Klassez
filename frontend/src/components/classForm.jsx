import React from "react";
import {ClassRepository} from '../api/classRepository'

class ClassForm extends React.Component {
    classRepository = new ClassRepository()

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
        newClass: false
    }

    days = ""

    componentDidMount() {
        const classId = this.props.match.params.classId

        if(classId){
            this.classRepository.getClass(classId)
                .then(tClass => {
                    let monday = false
                    let tuesday = false
                    let wednesday = false
                    let thursday = false
                    let friday = false
                    let days = tClass.days

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
                        else if(temp === "FR")
                            friday = true

                        days = days.slice(2)
                    }

                    this.setState({
                        className: tClass.className,
                        classCode: tClass.classCode,
                        professor: tClass.professor,
                        startTime: tClass.startTime,
                        endTime: tClass.endTime,
                        monday: monday,
                        tuesday: tuesday,
                        wednesday: wednesday,
                        thursday: thursday,
                        friday: friday,
                        seatsRemaining: tClass.seatsRemaining
                    })
                })
        } else{
            this.setState({newClass: true})
        }
    }

    onChange = e => {
        this.setState({[e.target.id]: e.target.value});
    };

    onClick = () => {
        this.days = ""

        if(this.state.monday)
            this.days += "MO"
        if(this.state.tuesday)
            this.days += "TU"
        if(this.state.wednesday)
            this.days += "WE"
        if(this.state.thursday)
            this.days += "TH"
        if(this.state.friday)
            this.days += "FR"

        const classData = {
            className: this.state.className,
            classCode: this.state.classCode,
            professor: this.state.professor,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            days: this.days,
            seatsRemaining: this.state.seatsRemaining
        };

        if(this.state.newClass){
            this.classRepository.addClass(classData)
            .then(() => {
                this.setState({
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
                    saturday: false,
                    sunday: false,
                    seatsRemaining: 0
                })
            })
        } else {

        }
    };

    render() {
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
                                            value={this.state.professor}
                                            id="professor"
                                            type="text"
                                            className="form-control"
                                        />
                                        <label htmlFor="professor">Professor</label>
                                    </div>

                                    <div className="form-label-group">
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.startTime}
                                            id="startTime"
                                            type="text"
                                            className="form-control"
                                        />
                                        <label htmlFor="startTime">Start Time</label>
                                    </div>

                                    <div className="form-label-group">
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.endTime}
                                            id="endTime"
                                            type="text"
                                            className="form-control"
                                        />
                                        <label htmlFor="endTime">End Time</label>
                                    </div>

                                    <div className="form-check form-check-inline inner_padding">
                                        <input
                                            onChange={() => this.setState({monday: !this.state.monday})}
                                            value={this.state.monday}
                                            id="monday"
                                            type="checkbox"
                                            className="form-check-input"
                                        />
                                        <label className="form-check-label" htmlFor="monday">Monday</label>
                                        
                                        <input
                                            onChange={() => this.setState({tuesday: !this.state.tuesday})}
                                            value={this.state.tuesday}
                                            id="tuesday"
                                            type="checkbox"
                                            className="form-check-input"
                                        />
                                        <label className="form-check-label" htmlFor="tuesday">Tuesday</label>
                                        
                                        <input
                                            onChange={() => this.setState({wednesday: !this.state.wednesday})}
                                            value={this.state.wednesday}
                                            id="wednesday"
                                            type="checkbox"
                                            className="form-check-input"
                                        />
                                        <label className="form-check-label" htmlFor="wednesday">Wednesday</label>
                                        
                                        <input
                                            onChange={() => this.setState({thursday: !this.state.thursday})}
                                            value={this.state.thursday}
                                            id="thursday"
                                            type="checkbox"
                                            className="form-check-input"
                                        />
                                        <label className="form-check-label" htmlFor="thursday">Thursday</label>
                                        
                                        <input
                                            onChange={() => this.setState({friday: !this.state.friday})}
                                            value={this.state.friday}
                                            id="friday"
                                            type="checkbox"
                                            className="form-check-input"
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