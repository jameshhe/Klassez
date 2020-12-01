import React from 'react';
// import { ProfileDetails } from '../Models/ProfileDetails';
import {Link} from "react-router-dom";
import {ProfileRepository} from '../../api/profileRepository'
import "./profile.css";

export class ProfilePage extends React.Component {

    profileRepository = new ProfileRepository()

    state = {
        profile: []
    }

    render() {
        return <>
             <div id="header">
                {/* Nav bar with static breadcrumb */}
                <a href="DummyLink"> {this.state.profile.classification} </a> / <span id="profileTitle">{ this.state.profile.firstName + " " + this.state.profile.lastName }</span>
                <button id = "editProfile" className="align-right" type="button"> 
                <Link
                    to={'edit/' + this.state.id}
                    >Edit Profile</Link>
                </button>
                </div>
            <div id="profileInfo">
                <br></br><br></br>
                <span 
                    id="profilePic" className="align-top">
                        <img src= { this.state.profile.profilePic } height="200" width="200" alt = "profilePicture"/>
                </span>
                <div id = "profile">
                    <h1> { this.state.profile.firstName + " " + this.state.profile.lastName } </h1>
                    <p id="year"> <i> {this.state.profile.year} </i> </p>
                    <div id="major"> <p><b>Major: </b>{ this.state.profile.major }</p> </div>
                    <div id="minor"> <p><b>Minor: </b> { this.state.profile.minor }</p> </div>
                    <div id="concentration"> <p><b>Concentration: </b>{ this.state.profile.concentration }</p> </div>
                </div>
                <br></br><br></br>
                <br></br><br></br>
                <div id = "bioInfo"> 
                    <h2 id="bio"> Biography </h2> <br></br>
                    <div id="biography"> { this.state.profile.biography } </div>
                </div>
                <br></br><br></br>
                <div id = "schedule">
                    <h2> Schedule </h2>
                </div>
            </div>
        </>;
    }
}

export default ProfilePage;