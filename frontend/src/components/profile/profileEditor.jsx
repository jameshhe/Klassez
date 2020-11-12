import React from 'react';
import { Link } from 'react-router-dom';

export class ProfileEditor extends React.Component {

    profileTypes = [
        'student',
        'professor',
        'administrator',
    ]

    state = {
        type: '',
        firstName: '',
        lastName: '',
        profilePic: '',
        biography: '',
        year: '',
        major: '',
        minor: '',
        concentration: '',
        classification: ''
    };

    onAddClick() {
        this.props.onPhoneAdded({
            type: this.state.type,
            number: this.state.number
        });

        //good spot for validation to make sure only numbers passed in
        this.setState({
            type: '',
            number: ''
        });
    }


    render() {
        return <form className="container pt-3">
            <div id="editProfileHeader" className="d-flex justify-content-center flex-column"> <h3>Edit Profile</h3></div>
            <br />
            <div className="form-group">
                <label htmlFor="profilePic" id="profileEdit">Profile Picture</label>
                <input type="file" class="form-control-file" id="exampleFormControlFile1" />
            </div>
            <br />
            <div className="row">
                <div className="col">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text"
                        id="firstName"
                        name="firstName"
                        className="form-control"
                        value={this.state.firstName}
                        onChange={event => this.setState({ firstName: event.target.value })} />
                </div>
                <div className="col">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text"
                        id="lastName"
                        name="lastName"
                        className="form-control"
                        value={this.state.lastName}
                        onChange={event => this.setState({ lastName: event.target.value })} />
                </div>
            </div>
            <br />
            <div className="form-group">
                <label htmlFor="yearDropDown">Year/Classification</label>
                <select className="form-control" id="yearSelect">
                    <option></option>
                    <option>Freshman</option>
                    <option>Sophomore</option>
                    <option>Junior</option>
                    <option>Senior</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="majorSelect">Major</label>
                <input type="text"
                    id="majorSelect"
                    name="major"
                    className="form-control"
                    value={this.state.major}
                    onChange={event => this.setState({ major: event.target.value })} />
            </div>
            <div className="row">
                <div className="col">
                    <label htmlFor="minorSelect">Minor</label>
                    <input type="text"
                        id="minorSelect"
                        name="minorSelect"
                        className="form-control"
                        value={this.state.minor}
                        onChange={event => this.setState({ minor: event.target.value })} />
                </div>
                <div className="col">
                    <label htmlFor="concentrationSelect">Concentration</label>
                    <input type="text"
                        id="concentrationSelect"
                        name="concentrationSelect"
                        className="form-control"
                        value={this.state.concentration}
                        onChange={event => this.setState({ concentration: event.target.value })} />
                </div>
            </div>
            <br />
            <div className="form-group">
                <label forHTML="biographyInput">Biography</label>
                <textarea 
                    className="form-control" 
                    id="exampleFormControlTextarea1" 
                    rows="3"
                    name="concentrationSelect"
                    value={this.state.concentration}
                    onChange={event => this.setState({ concentration: event.target.value })} />
            </div>
            <hr />
            <br />
            <div className="row">
                <div className="col">
                    <button type="button"
                        className="btn btn-secondary btn-block"
                        onClick={() => this.onSave()}>
                        Cancel
                    </button>
                </div>
                <div className="col">
                    <button type="button"
                        className="btn btn-primary btn-block"
                        onClick={() => this.onSave()}>
                        Save
                    </button>
                </div>
                {/* <Link className="btn btn-secondary btn-block" to="/">Return to List</Link> */}
            </div>
        </form>
    }
}