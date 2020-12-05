import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import {ProfileRepository} from '../../api/profileRepository'
import store from '../../store'


export class ProfileEditor extends React.Component {

    profileRepository = new ProfileRepository()
    user = store.getState().auth.user
        
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
        classification: '',
        timeStart: '',
        timeEnd: '',
        preferNight: '',
        id: 0
    };

    componentDidMount() {

        const studentId = this.user.id;

        if (studentId) {
            this.profileRepository.getProfile(studentId, this.user.type )
            .then(profile => {

                let userProfile = profile[0]
                let names = userProfile.name.split()
                userProfile.firstName = names[0]
                userProfile.lastName = names[1]

                this.setState({
                    firstName: userProfile.firstName,
                    lastName: userProfile.lastName,
                    year: userProfile.year,
                    major: userProfile.major,
                    minor: userProfile.minor,
                    concentration: userProfile.concentration,
                    type: userProfile.type,
                    timeStart: userProfile.timeStart,
                    timeEnd: userProfile.timeEnd,
                    preferNight: userProfile.preferNight
                })
            })
        }
    }

    onSave = () => {
        const profileData = {
            type: this.state.type,
            name: (this.state.firstName || '') + (this.state.lastName || ''),
            profilePic: this.state.profilePic,
            year: this.state.year,
            major: this.state.major,
            minor: this.state.minor,
            concentration: this.state.concentration,
            classification: this.state.classification,
            timeStart: this.state.timeStart,
            timeEnd: this.state.timeEnd,
            preferNight: this.state.preferNight
        };
        
        this.profileRepository.updateProfile(this.user.id, profileData)
        .then(() => {
            alert('Profile updated!');
            this.setState({
                type: "",
                firstName: "",
                lastName: "",
                profilePic: "",
                year: "",
                major: "",
                minor: "",
                concentration: "",
                classification: "",
                timeStart: "",
                timeEnd: "",
                preferNight: "",
                redirect: '/profile',
                id: 0
            })
        })
    }
    
    render() {
        return <form className="container pt-3">
            <div id="editProfileHeader" className="d-flex justify-content-center flex-column"> <h3>Edit Profile</h3></div>
            <br />
            <div className="form-group">
                <label htmlFor="profilePic" id="profileEdit">Profile Picture</label>
                <input type="file" className="form-control-file" id="exampleFormControlFile1" />
            </div>
            <br />
            <div className="row">
                <div className="col">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text"
                        id="firstName"
                        name="firstName"
                        className="form-control"
                        placeholder="First name"
                        value={this.state.firstName}
                        onChange={event => this.setState({ firstName: event.target.value })} />
                </div>
                <div className="col">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Last name"
                        className="form-control"
                        value={this.state.lastName}
                        onChange={event => this.setState({ lastName: event.target.value })} />
                </div>
            </div>
            <br />
            <div className="form-group">
                <label htmlFor="yearDropDown">Year/Classification</label>
                <select className="form-control" 
                    id="yearSelect"
                    value={this.state.year}
                    placeholder="Grad Year"
                    onChange={event => this.setState({ year: event.target.value })}>
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
                    placeholder="Major"
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
                        placeholder="Minor"
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
                        placeholder="Concentration"
                        value={this.state.concentration}
                        onChange={event => this.setState({ concentration: event.target.value })} />
                </div>
            </div>
            <br />
            
            <div className = "row">
                <div className="col">
                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">Preferred Start Time</label>
                        <select className="form-control" 
                                id="exampleFormControlSelect1"
                                value={this.state.timeStart}
                                onChange={event => this.setState({ timeStart: event.target.value })}>
                                <option></option>
                                <option>9:00AM</option>
                                <option>9:30AM</option>
                                <option>10:00AM</option>
                                <option>10:30AM</option>
                                <option>11:00AM</option>
                                <option>11:30AM</option>
                                <option>12:00PM</option>
                                <option>12:30PM</option>
                                <option>1:00PM</option>
                                <option>1:30PM</option>
                                <option>2:00PM</option>
                                <option>2:30PM</option>
                                <option>3:00PM</option>
                                <option>3:30PM</option>
                                <option>4:00PM</option>
                                <option>4:30PM</option>
                                <option>5:00PM</option>
                                <option>5:30PM</option>
                                <option>6:00PM</option>
                                <option>6:30PM</option>
                                <option>7:00PM</option>
                                <option>7:30PM</option>
                                <option>8:00PM</option>
                                <option>8:30PM</option>
                                <option>9:00PM</option>
                                <option>9:30PM</option>
                        </select>
                    </div>
                </div>
                <div className="col">
                    <div className="form-group">
                        <label for="exampleFormControlSelect1">Preferred End Time</label>
                        <select className="form-control" 
                                id="exampleFormControlSelect1"
                                value={this.state.timeEnd}
                                onChange={event => this.setState({ timeEnd: event.target.value })}>
                                <option></option>
                                <option>9:00AM</option>
                                <option>9:30AM</option>
                                <option>10:00AM</option>
                                <option>10:30AM</option>
                                <option>11:00AM</option>
                                <option>11:30AM</option>
                                <option>12:00PM</option>
                                <option>12:30PM</option>
                                <option>1:00PM</option>
                                <option>1:30PM</option>
                                <option>2:00PM</option>
                                <option>2:30PM</option>
                                <option>3:00PM</option>
                                <option>3:30PM</option>
                                <option>4:00PM</option>
                                <option>4:30PM</option>
                                <option>5:00PM</option>
                                <option>5:30PM</option>
                                <option>6:00PM</option>
                                <option>6:30PM</option>
                                <option>7:00PM</option>
                                <option>7:30PM</option>
                                <option>8:00PM</option>
                                <option>8:30PM</option>
                                <option>9:00PM</option>
                                <option>9:30PM</option>
                        </select>
                    </div>
                </div>
            </div>
            <br />
            Prefer night classes?
            <div className="form-group">
                        <label for="exampleFormControlSelect1">Preferred End Time</label>
                        <select className="form-control" 
                                id="exampleFormControlSelect1"
                                value={this.state.preferNight}
                                onChange={event => this.setState({ preferNight: event.target.value })}>
                                <option></option>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                        </select>
                    </div>
            <br />
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