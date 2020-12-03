import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { ProfileRepository } from '../../api/profileRepository'
import "./profile.css";
import store from '../../store'

export class ProfilePage extends React.Component {

    user = store.getState().auth.user
    profileRepository = new ProfileRepository()

    state = {
        id: this.user.id,
        firstName: '',
        lastName: '',
        profilePic: '',
        year: '',
        major: '',
        minor: '',
        concentration: '',
        classification: '',
        preferredStart: '',
        preferredEnd:'',
        preferNight:''        
    }

    componentDidMount(){
        this.profileRepository.getProfile(this.user.id)
        .then(profile => {
            let userProfile = profile[0]
            let names = userProfile.name.split()
            userProfile.firstName = names[0]
            userProfile.lastName = names[1]
            this.setState(userProfile)
        })
    }

    render() {
        if(!this.state.firstName){
            return <div>Loading Profile...{ console.log(this.user)}
                        <div className="text-center">
                            <Link to={'/editProfile'} className="btn btn-info justify-content-center"> Create Profile </Link>
                        </div>
                    </div>
        }
        return <>
        
            <Link to={'/editProfile'} className="btn btn-info mt-2 mr-2 float-right"> Edit Profile </Link>
            <br />
            <div id="profileInfo">
                <br />
                <span 
                    id="profilePic" className="align-top">
                        <img src= { this.state.profilePic } height="200" width="200" alt = "profilePicture"/>
                </span>
                <div id = "profile">
                    <h1> { this.state.firstName + " " + this.state.lastName } </h1>
                    <p id="year"> <i> {this.state.year} </i> </p>
                    <div id="major"> <p><b>Major: </b>{ this.state.major }</p> </div>
                    <div id="minor"> <p><b>Minor: </b> { this.state.minor }</p> </div>
                    <div id="concentration"> <p><b>Concentration: </b>{ this.state.concentration }</p> </div>
                </div>
                <br></br><br></br>
                <br></br><br></br>
                <div id = "bioInfo"> 
                    <h2 id="bio"> Preferred Hours</h2><br></br>
                    Preferred Start Time:   <div id="biography"> { this.state.preferredStart } </div>
                    Preferred End Time:     <div id="biography"> { this.state.preferredEnd } </div>
                    Preferred Night Class?: <div id="biography"> { this.state.preferNight } </div>
                </div>
                <br></br><br></br>
                <div id = "schedule">
                    <h2> Schedule </h2>
                </div>
            </div>
        </>;
    }
}

export default withRouter(ProfilePage);