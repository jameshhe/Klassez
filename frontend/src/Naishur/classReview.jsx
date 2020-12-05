import React from 'react'
import { Link } from 'react-router-dom';
import {ReviewClassRepository} from '../api/reviewClassRepository'

export class ClassReview extends React.Component{
    reviewClassRepository = new ReviewClassRepository();
    
    state = {

    }
       

    componentDidMount(){
        const classID = +this.props.match.params.classID;
        if(classID)
        {
            this.reviewClassRepository.getReview(classID)
                .then( classReview => this.setState({ classReview }));
        }
    }

    render(){
        return<>
            <ul className="list-group">
                {
                    this.state.classReview.map ((x, i) =>
                    <li class="form-inline row list-group-item"  >
                        <div className="card "  >
                            <div class="card-header">
                                <h3 class="card-title"> { x.classID}
                                    <h6 class="card-title"> {x.classCode} </h6>  
                                </h3>
                            </div>
                            <div class="card-body"> 
                                <h4 class="card-subtitle text-muted text-md-left"> {x.studentID} 
                                    <span class="badge card-subtitle justify-content-between text-md-right"> Score: { x.rating } </span>
                                </h4>
                                <br></br>
                                <p class="card-text"> { x.review }</p>
                            </div>
                        </div>
                    </li>
                    )
                }
            </ul>
           
        </>
    }



}