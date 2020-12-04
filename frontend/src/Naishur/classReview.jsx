import React from 'react'
import { Reviews } from './reviews';
import { Link } from 'react-router-dom';
import {ReviewClassRepository} from '../api/reviewClassRepository'

export class ClassReview extends React.Component{
    reviewClassRepository = new ReviewClassRepository();
    reviewList = {

    }
       

    componentDidMount(){
        const IDvalue = +this.props.match.params.classid;
        if(IDvalue)
        {
            this.reviewClassRepository.getReview(IDvalue)
                .then( Reviews => this.setState({ Reviews }));
        }
    }

    render(){
        return<>
            <ul className="list-group">
                {
                    this.reviewList.map ((x, i) =>
                    <li class="form-inline row list-group-item"  >
                        <div className="card "  >
                            <div class="card-header">
                                <h3 class="card-title"> { x.classid}  </h3>
                            </div>
                            <div class="card-body"> 
                                <h4 class="card-subtitle text-muted text-md-left"> {x.studentname} 
                                    <span class="badge card-subtitle justify-content-between text-md-right"> Score: { x.ratingid } </span>
                                </h4>
                                <br></br>
                                <p class="card-text"> { x.text }</p>
                            </div>
                        </div>
                    </li>
                    )
                }
            </ul>
           
        </>
    }



}