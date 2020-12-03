import React from 'react'
import { Reviews } from './reviews';
import { Link } from 'react-router-dom';

export class ClassReview extends React.Component{
    reviewList = [
        new Reviews("CS1301", "Bob", 3, "Could be better"),
        new Reviews("CS1001", "Jim", 4, "Great Class"),
        new Reviews("CS1001", "George", 4, "Amazing class"),

    ];

    render(){
        return<>
            <ul className="list-group">
                {
                    this.reviewList.map ((x, i) =>
                    <li class="form-group row" className="list-group-item">
                        <label class="form-control"> { x.classid} </label>
                        <body class="form-control"> {x.text} </body>
                        <div class ="form-control"> {x.studentname}</div>
                        <div class ="form-control"> { x.ratingid }</div>
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