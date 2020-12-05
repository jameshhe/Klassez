import React from 'react'
import { Link } from 'react-router-dom';
import {ReviewClassRepository} from '../../api/reviewClassRepository'
import store from '../../store'

export class ClassReview extends React.Component{
    reviewClassRepository = new ReviewClassRepository();
    user = store.getState().auth.user
    state = {classReview: null}

    classID = +this.props.match.params.classID;
    
    componentDidMount(){
        if(this.classID)
        {
            this.reviewClassRepository.getReview(this.classID)
                .then( classReview => this.setState({ classReview }));
        }
    }

    render(){
        if(!this.state.classReview){
            return <h1>Loading Reviews</h1>
        }

        return<>
            <ul className="list-group">
                <li className="form-inline row list-group-item">
                    {
                        (this.user.id) ? 
                        <center><Link className='btn btn-primary' to={`/recommendations/classes/new/${this.classID}`}>Add A Review</Link></center>
                        : <></>
                    }
                </li>
                {
                    this.state.classReview.map ((x, i) =>
                    <li className="form-inline row list-group-item" key={i} >
                        <div className="card "  >
                            <div className="card-header">
                                <h6 className="card-title"> {x.classCode} </h6>  
                            </div>
                            <div className="card-body"> 
                                <h4 className="card-subtitle text-muted text-md-left"> {x.studentID} 
                                    <span className="badge card-subtitle justify-content-between text-md-right"> Score: { x.Rating } </span>
                                </h4>
                                <br></br>
                                <p className="card-text"> { x.Review }</p>
                            </div>
                        </div>
                    </li>
                    )
                }
            </ul>

                
            
           
        </>
    }
}

export default ClassReview;