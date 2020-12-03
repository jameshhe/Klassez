import React from 'react'
import { Reviews } from './reviews';
import { Link } from 'react-router-dom';

export class ClassReview extends React.Component{
    reviewList = [
        new Reviews("CS1301", "Bob", 3, "Could be better"),
        new Reviews("CS1001", "Jim", 4, "Great Class"),
        new Reviews("CS1001", "George", 4.5, "Amazing class"),

    ];

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
            <div>
            <Link to="/">
               Go Home
             </Link>
          </div>
        </>
    }



}