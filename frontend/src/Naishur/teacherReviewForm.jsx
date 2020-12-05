import React from 'react'
import {ReviewTeacherRepository} from '../api/reviewTeacherRepository'


export class TeacherReviewForm extends React.Component{
    reviewTeacherRepository = new ReviewTeacherRepository();

    state = {
        instructorID:'',
        review:''
    }; 
    
    onADDClick() {
        this.reviewTeacherRepository.addReview(this.state)
            .then(() => {
                alert('Review added!');
            });
    }

    render(){
         return<>
            <form>
                <div class="form-group">
                    <input type="text" class="form-control" id="instructorID" placeholder="Professor ID" value={ this.state.instructorID} onChange={ event =>this.setState({ instructorID: event.target.value }) } />
                </div>
                <div class="form-group">
                    <textarea type="txt" class="form-control" placeholder="Comment" value={this.state.review} onChange={ event =>this.setState({ review: event.target.value }) } ></textarea>
                </div>
                <div class="form-group row">
                <button type="submit" class="btn btn-primary" onClick= { () => this.onADDClick() }>Sumbit</button>
                </div>
            </form>
        </>
    }
}