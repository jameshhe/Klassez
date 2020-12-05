import React from 'react'
import { Link } from 'react-router-dom';
import { ReviewClassRepository } from '../api/reviewClassRepository'

export class ClassReviewForm extends React.Component{
    reviewClassRepository = new ReviewClassRepository();

    state ={
        studentID: '',
        classID: '',
        classCode: '',
        rating: '',
        review: '',
    }

    onADDClick() {
        this.reviewClassRepository.addReview(this.state)
            .then(() => {
                alert('Review added!');
            });
    }
    
    render(){
         return<>
            <form>
                <div class="form-group">
                   <input type="txt" class="form-control" id="studentID" placeholder="Student ID" value={ this.state.studentID} onChange={ event =>this.setState({ studentID: event.target.value }) }/>
                </div>
                <div class="form-group">
                    <input type="txt" class="form-control" id="classid" placeholder="Class ID" value={ this.state.classID } onChange={ event =>this.setState({ classID: parseInt(event.target.value) }) }/>
                </div>
                <div class="form-group">
                    <input type="txt" class="form-control" id="classCode" placeholder="Class Code" value={ this.state.classCode} onChange={ event =>this.setState({ classCode: event.target.value }) }/>
                </div>
                <div class="form-group">
                    <textarea type="txt" class="form-control" value={this.state.review} onChange={ event =>this.setState({ review: event.target.value }) } placeholder="Comment"></textarea>
                </div>
                <div class="form-group">
                    <label class="form-check-label">
                        <select name="ratingid" id="ratingid" value={this.state.rating} onChange={ event =>this.setState({ rating: event.target.value }) } >
                            <option >1 star</option>
                            <option >2 star</option>
                            <option >3 star</option>
                            <option >4 star</option>
                            <option >5 star</option>
                        </select> 
                    Rating </label>
                </div>
                <div class="form-group row">
                <button type="submit" class="btn btn-primary" onClick= { () => this.onADDClick() } >Sumbit</button>
                </div>
            </form>
        </>
    }
}