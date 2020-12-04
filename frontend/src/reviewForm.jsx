import React from 'react'
import { Link } from 'react-router-dom';

export class ReviewForm extends React.Component{

    state ={
        studentname: '',
        classid: '',
        ratingid: '',
        text: '',
    }

    render(){
         return<>
            <form>
                <div class="form-group">
                   <input type="studentName" class="form-control" id="studentName" placeholder="Name"/>
                </div>
                <div class="form-group">
                    <input type="classid" class="form-control" id="classid" placeholder="class"/>
                </div>
                <div class="form-group">
                    <textarea type="txt" class="form-control" value={this.state.text} placeholder="Comment"></textarea>
                </div>
                <div class="form-group">
                    <label class="form-check-label">
                        <select name="ratingid" id="ratingid">
                            <option value={this.state.ratingid}>1 star</option>
                            <option value={this.state.ratingid}>2 star</option>
                            <option value={this.state.ratingid}>3 star</option>
                            <option value={this.state.ratingid}>4 star</option>
                            <option value={this.state.ratingid}>5 star</option>
                        </select> 
                    Rating </label>
                </div>
                <div class="form-group row">
                <Link to="/">
                 Go Home
                </Link>
                <button type="submit" class="btn btn-primary">Sumbit</button>
                </div>
            </form>
        </>
    }
}