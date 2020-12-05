import React from 'react'
import {ReviewTeacherRepository} from '../../api/reviewTeacherRepository'
import { Link } from 'react-router-dom';

export class TeacherRecommendations extends React.Component{
    reviewTeacherRepository = new ReviewTeacherRepository();

    state ={

    };

    componentDidMount(){
        const instructorID = +this.props.match.params.instructorID;
        if(instructorID)
        {
            this.reviewTeacherRepository.getReview(instructorID)
                .then( IntructorReview => this.setState({ IntructorReview }));
         }
    }  
    
    render(){
        return<>
            <ul className="list-group">
                {
                    this.state.IntructorReview.map ((x, i) =>
                    <li class="form-inline row list-group-item"  >
                        <div className="card "  >
                            <div class="card-header">
                                <h3 class="card-title"> { x.instructorID}  
                                </h3>
                            </div>
                            <div class="card-body"> 
                                <p class="card-text"> { x.review }</p>
                            </div>
                        </div>
                    </li>
                    )
                }
            </ul>
            <div>
          </div>
        </>
    }
       
}

export default TeacherRecommendations;