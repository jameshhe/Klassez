import React from 'react'
import { Link } from 'react-router-dom';
import {ReviewClassRepository} from '../api/reviewClassRepository'

export class RecomendForm extends React.Component{
    reviewClassRepository = new ReviewClassRepository();

    state ={
        studentname: '',
        classid: '',
        teacher: '',
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
                    <input type="teahcer" class="form-control" id="teacher" placeholder="Professor" value={ this.state.teacher} onChange={ event =>this.setState({ teacher: event.target.value }) } />
                </div>
                <div class="form-group">
                    <textarea type="txt" class="form-control" placeholder="Comment" value={this.state.text} onChange={ event =>this.setState({ text: event.target.value }) } ></textarea>
                </div>
                <div class="form-group row">
                <button type="submit" class="btn btn-primary" onClick= { () => this.onADDClick() }>Sumbit</button>
                </div>
            </form>
        </>
    }
}