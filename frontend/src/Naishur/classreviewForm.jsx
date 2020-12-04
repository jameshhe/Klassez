import React from 'react'
import { Link } from 'react-router-dom';

export class ClassReviewForm extends React.Component{

    state ={
        studentname: '',
        classid: '',
        ratingid: '',
        text: '',
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
                   <input type="studentName" class="form-control" id="studentName" placeholder="Name" value={ this.state.studentname} onChange={ event =>this.setState({ studentname: event.target.value }) }/>
                </div>
                <div class="form-group">
                    <input type="classid" class="form-control" id="classid" placeholder="class" value={ this.state.classid} onChange={ event =>this.setState({ classid: event.target.value }) }/>
                </div>
                <div class="form-group">
                    <textarea type="txt" class="form-control" value={this.state.text} onChange={ event =>this.setState({ text: event.target.value }) } placeholder="Comment"></textarea>
                </div>
                <div class="form-group">
                    <label class="form-check-label">
                        <select name="ratingid" id="ratingid" value={this.state.ratingid} onChange={ event =>this.setState({ text: event.target.ratingid }) } >
                            <option value={this.state.ratingid}>1 star</option>
                            <option value={this.state.ratingid}>2 star</option>
                            <option value={this.state.ratingid}>3 star</option>
                            <option value={this.state.ratingid}>4 star</option>
                            <option value={this.state.ratingid}>5 star</option>
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