import React from 'react'
import {ReviewTeacherRepository} from '../../api/reviewTeacherRepository'
import { Link } from 'react-router-dom';

export class TeacherRecommendations extends React.Component{
    reviewTeacherRepository = new ReviewTeacherRepository();

    state ={
        IntructorReview: null
    };

    instructorID = +this.props.match.params.teacherID;

    componentDidMount(){
        if(this.instructorID)
        {
            this.reviewTeacherRepository.getReview(this.instructorID)
                .then( IntructorReview => {
                    console.log(IntructorReview)
                    this.setState({ IntructorReview })
                });
         }
    }  
    
    render(){
        if(!this.state.IntructorReview)
            return <h1>Loading Teacher Review...</h1>
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