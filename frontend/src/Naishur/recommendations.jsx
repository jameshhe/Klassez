import React from 'react'
import { Recomends } from './recomends';
import { Link } from 'react-router-dom';

export class Recommendations extends React.Component{
    reviewList = [
        new Recomends("CS1301", "Bob", "Professor", "Could be better"),
        new Recomends("CS1001", "Jim", "Adjunct Professor ", "Great Class"),
        new Recomends("CS1001", "George", "Doctor", "Amazing class"),

    ];


    render(){
        return<>
            <ul className="list-group">
                {
                    this.reviewList.map ((x, i) =>
                    <li class="form-inline row list-group-item"  >
                        <div className="card "  >
                            <div class="card-header">
                                <h3 class="card-title"> { x.classid}  
                                    <h5 class="card-title">  { x.teacher }</h5>
                                </h3>
                            </div>
                            <div class="card-body"> 
                                <h4 class="card-subtitle text-muted text-md-left"> {x.studentname} 
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
          </div>
        </>
    }



}