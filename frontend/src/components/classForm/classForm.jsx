import React, {Component} from "react";
import "./classForm.css";

class ClassForm extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            classCode: "",
            professor: "",
            startTime: "",
            endTime: "",
            days: "",
            seatsRemaining: 0
        };

        this.monday = false
        this.tuesday = false
        this.wednesday = false
        this.thursday = false
        this.friday = false
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    onChange = e => {
        this.setState({[e.target.id]: e.target.value});
    };

    onSubmit = e => {
        e.preventDefault();
        const userData = {
            name: this.state.name,
            classCode: this.state.classCode,
            professor: this.state.professor,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            days: this.state.days,
            seatsRemaining: this.state.seatsRemaining
        };
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-5 col-5 mx-auto">
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
                                        <label htmlFor="startTime">Professor</label>
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

                                    <div className="form-check form-check-inline">
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.days}
                                            id="days"
                                            type="text"
                                            className="form-check-input"
                                        />
                                        <label className="form-check-label" htmlFor="days">Monday</label>
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
                                    <button className="btn btn-lg btn-primary btn-block text-uppercase"
                                                type="submit">Submit
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