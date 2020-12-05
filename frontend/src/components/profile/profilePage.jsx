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
        type: this.user.type,
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
        this.profileRepository.getProfile(this.user.id, this.user.type)
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
                            <Link to={'/register'} className="btn btn-info justify-content-center"> Create Account </Link>
                        </div>
                    </div>
        }
        return <>
        <Link to={'/editProfile'} className="btn btn-info mt-2 mr-2 float-right"> Edit Profile </Link>
        <div className="container">
            <div className="jumbotron bg-light jumbotron-fluid">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3 ml-4">
                            {/* change this back to {this.state.profilePic} */}
                            <img className="img-fluid" src= { `https://bloom-obgyn.com/wp-content/uploads/2016/09/dummy-profile-pic.png` } width="200" height="200" alt = "profilePicture"/>
                        </div>
                        <div>
                            <br />
                            {/* //take out hard code later */}
                            <h2 className="font-weight-bold">{ this.state.name } - Junior{ this.state.year }</h2><br />
                            <h4 className="font-weight-light">Major: { this.state.major }</h4>
                            <h4 className="font-weight-light">Minor: { this.state.minor }</h4>
                            <h6 className="font-weight-light">Concentration: { this.state.minor }</h6>
                            <br></br><br/>
                        </div>
                        
                    </div>
                    <br />
                    <div className="row ml-4">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                <th scope="col">Preferred Stary Time of Day</th>
                                <th scope="col">Preferred End Time of Day</th>
                                <th scope="col">Prefer Night Classes?</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>9:00am{ this.state.preferredStart }</td>
                                <td>5:00pm{ this.state.preferredEnd }</td>
                                <td>No{ this.state.preferNight }</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    < br/><br/>
                    <div className="row ml-4">
                        <h2> Schedule </h2>
                    </div>
                </div>
            </div>
        </div>
    </>;
    }
}
export default withRouter(ProfilePage);