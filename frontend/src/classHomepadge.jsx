import React from 'react';
import { Router, Switch, Link, BrowserRouter, Route } from 'react-router-dom';
import { ClassAddition } from './classAddition';


export class ClassHomePadge extends React.Component{
    

    render(){
        return<>
          <div>
            <Link to="/classReview" className="ui button primary">
              List review
            </Link>
            <br></br>
            <Link to="/reviewForm" className="ui button primary">
              Review Form
            </Link>
          </div>
        
        </>
    }
}