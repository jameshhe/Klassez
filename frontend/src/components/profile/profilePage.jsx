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
        name: '',
        profilePic: '',
        gradYear: '',
        major: '',
        preferredTimesEnd: '',
        preferredTimesStart:'',
        openToNightClasses:''        
    }

    componentDidMount(){
        console.log(this.user.id, this.user.type)
        this.profileRepository.getProfile(this.user.id, this.user.type)
        .then(profile => {
            console.log(profile)
            let userProfile = profile[0]
            this.setState(userProfile)
        })
    }

    render() {
        if(!this.state.name){
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
                            <img className="img-fluid" src= { `https://bloom-obgyn.com/wp-content/uploads/2016/09/dummy-profile-pic.png` } alt = "Profile Picture"/>
                        </div>
                        <div className="ml-3">
                            <br /><br />
                            <h2 className="font-weight-bold">{ this.state.name } - c/o { this.state.gradYear }</h2><br />
                            <h4 className="font-weight-light">Major: { this.state.major }</h4>
                            <br></br><br/>
                        </div>
                        
                    </div>
                    <br /><br />
                    <div className="row ml-4">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                <th scope="col">Preferred Start Time of Day</th>
                                <th scope="col">Preferred End Time of Day</th>
                                <th scope="col">Prefer Night Classes?</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>{ this.state.preferredTimesStart }</td>
                                <td>{ this.state.preferredTimesEnd }</td>
                                <td>{ this.state.openToNightClasses ? "Yes" : "No" }</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    < br/><br/>
                    <div className="row ml-4">
                        <Link className='btn btn-primary' to='/schedule'>View Schedule</Link>
                    </div>
                </div>
            </div>
        </div>
    </>;
    }
}
export default withRouter(ProfilePage);