import React from "react";
import "./classForm.css";

class ClassForm extends React.Component {
    state = {
        name: "",
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
    }

    days = ""

    componentDidMount() {
    }

    onChange = e => {
        this.setState({[e.target.id]: e.target.value});
    };

    onClick = () => {
        this.days = ""

        if(this.state.monday)
            this.days += "M"
        if(this.state.tuesday)
            this.days += "T"
        if(this.state.wednesday)
            this.days += "W"
        if(this.state.thursday)
            this.days += "Th"
        if(this.state.friday)
            this.days += "F"
        if(this.state.saturday)
            this.days += "S"
        if(this.state.sunday)
            this.days += "Su"

        const classData = {
            name: this.state.name,
            classCode: this.state.classCode,
            professor: this.state.professor,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            days: this.days,
            seatsRemaining: this.state.seatsRemaining
        };

        this.setState({
            name: "",
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
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="card card-signin flex-row my-5">
                        <div className="card-body">
                            <h5 className="card-title text-center">Class Form</h5>
                            <form className="form-signin" onSubmit={this.onSubmit}>
                                <div className="form-label-group">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.name}
                                        id="name"
                                        type="text"
                                        className="form-control"
                                    />
                                    <label htmlFor="name">Name</label>
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

                                    <input
                                        onChange={() => this.setState({saturday: !this.state.saturday})}
                                        value={this.state.saturday}
                                        id="saturday"
                                        type="checkbox"
                                        className="form-check-input"
                                    />
                                    <label className="form-check-label" htmlFor="saturday">Saturday</label>

                                    <input
                                        onChange={() => this.setState({sunday: !this.state.sunday})}
                                        value={this.state.sunday}
                                        id="sunday"
                                        type="checkbox"
                                        className="form-check-input"
                                    />
                                    <label className="form-check-label" htmlFor="sunday">Sunday</label>
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
        );
    }
}

export default ClassForm;