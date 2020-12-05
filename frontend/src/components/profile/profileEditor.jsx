import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import {ProfileRepository} from '../../api/profileRepository'
import { Redirect } from "react-router-dom";
import store from '../../store'


export class ProfileEditor extends React.Component {

    profileRepository = new ProfileRepository()
    user = store.getState().auth.user
    shouldRedirect = false

    state = {
        profilePic: '',
        gradYear: '',
        major: '',
        timeStart: '',
        timeEnd: '',
        preferNight: ''
    };

    componentDidMount() {
        if (this.user.id) {
            this.profileRepository.getProfile(this.user.id, this.user.type )
            .then(profile => {
                console.log(profile)

                let userProfile = profile[0]

                this.setState({
                    name: userProfile.name,
                    gradYear: userProfile.gradYear,
                    major: userProfile.major,
                    type: this.user.type,
                    timeStart: userProfile.preferredTimesStart,
                    timeEnd: userProfile.preferredTimesEnd,
                    preferNight: userProfile.openToNightClasses
                })
            })
        }
    }

    onSave = () => {
        const profileData = {
            type: this.state.type,
            name: (this.state.name).trim(),
            profilePic: this.state.profilePic,
            year: this.state.gradYear,
            major: this.state.major,
            timeStart: this.state.timeStart,
            timeEnd: this.state.timeEnd,
            preferNight: this.state.preferNight
        };
        
        this.profileRepository.updateProfile(this.user.id, profileData)
        .then(() => {
            alert('Profile updated!');
            this.shouldRedirect = true;
            this.setState({})
        })
    }
    
    render() {
        if(this.shouldRedirect){
            return <Redirect to='/profile'/>
        }
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
                    <label htmlFor="name">Name</label>
                    <input type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="First name"
                        value={this.state.name}
                        onChange={event => this.setState({ name: event.target.value })} />
                </div>
            </div>
            <br />
            <div className="form-group">
                <label htmlFor="yearDropDown">Grad Year</label>
                <select className="form-control" 
                    id="yearSelect"
                    value={this.state.gradYear}
                    placeholder="Grad Year"
                    onChange={event => this.setState({ gradYear: event.target.value })}>
                    <option></option>
                    <option>2021</option>
                    <option>2022</option>
                    <option>2023</option>
                    <option>2024</option>
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
            <br />
            
            <div className = "row">
                <div className="col">
                    <div className="form-group">
                        <label htmlFor="timeStart">Preferred Start Time</label>
                        <select className="form-control" 
                                id="timeStart"
                                value={this.state.timeStart}
                                onChange={event => this.setState({ timeStart: event.target.value })}>
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
                </div>
                <div className="col">
                    <div className="form-group">
                        <label htmlFor="endTime">Preferred End Time</label>
                        <select className="form-control" 
                                id="endTime"
                                value={this.state.timeEnd}
                                onChange={event => this.setState({ timeEnd: event.target.value })}>
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
                </div>
            </div>
            <br />
            <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">Prefer Night Classes?</label>
                        <select className="form-control" 
                                id="exampleFormControlSelect1"
                                value={this.state.preferNight}
                                onChange={event => this.setState({ preferNight: event.target.value })}>
                                <option></option>
                                <option value={1}>Yes</option>
                                <option value={0}>No</option>
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