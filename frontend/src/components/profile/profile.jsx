import React from 'react';
import { ProfileHome } from './components';

export class Profile extends React.Component {
    state = {
        profile: new ProfileHome(
            1,
            "John",
            "Doe",
            "https://bloom-obgyn.com/wp-content/uploads/2016/09/dummy-profile-pic.png",
            "Aspiring software engineer who has a passion for web development and Angular. For my front-end experience, I have worked in JavaScript, HTML/CSS, and React and for backend, I am proficient in C/C++, Java, and SQL. Looking to learn more DevOps and deployment concepts from my classess.",
            "Junior",
            "Computer Science",
            "Mathematics",
            "N/A", 
            "Student"
        )
    };

    render() {
        return <>
            <div id="header">
                {/* Nav bar with static breadcrumb */}
                <a href="DummyLink"> {this.state.profile.classification} </a> / <span id="profileTitle">{ this.state.profile.firstName + " " + this.state.profile.lastName }</span>
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