import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import {ProfileRepository} from '../../api/profileRepository'

export class ProfileEditor extends React.Component {

    profileRepository = new ProfileRepository()

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

    onSave = () => {
        const profileData = {
            type: this.state.type,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            profilePic: this.state.profilePic,
            biography: this.state.biography,
            year: this.state.year,
            major: this.state.major,
            minor: this.state.minor,
            concentration: this.state.concentration,
            classification: this.state.classification
        };

        
        this.profileRepository.updateProfile(this.state.id, profileData)
        .then(() => {
            alert('Profile updated!');
            this.setState({
                type: "",
                firstName: "",
                lastName: "",
                profilePic: "",
                biography: "",
                year: "",
                major: "",
                minor: "",
                concentration: "",
                classification: "",
                redirect: '/profile',
            })
        })
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
                    id="biographyInput" 
                    rows="3"
                    name="biographyInput"
                    value={this.state.biography}
                    onChange={event => this.setState({ biography: event.target.value })} />
            </div>
            <hr />
            <br />
            <div className="row">
                <div className="col">
                    <button type="button"
                        className="btn btn-block">
                        <Link to={'/profile'}className="btn btn-secondary btn-block"> Cancel </Link>
                    </button>
                </div>
                <div className="col">
                    <button type="button"
                        className="btn btn-primary btn-block"
                        onClick={() => this.onSave()}>
                        Save
                    </button>
                </div>
            </div>
            <br />
        </form>
    }
}


export default withRouter(ProfileEditor);