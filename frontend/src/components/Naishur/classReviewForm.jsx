import React from 'react'
import { Link, Redirect } from 'react-router-dom';
import { ReviewClassRepository } from '../../api/reviewClassRepository'
import {ClassRepository} from '../../api/classRepository'
import store from '../../store'

export class ClassReviewForm extends React.Component{
    reviewClassRepository = new ReviewClassRepository();
    classRepository = new ClassRepository();
    user = store.getState().auth.user
    classID = +this.props.match.params.classID;
    shouldRedirect = false;

    state ={
        classCode: '',
        className: null,
        rating: '',
        review: ''
    }

    componentDidMount(){
        this.classRepository.getClass(this.classID)
        .then((myClass) => {
            this.setState({classCode: myClass[0].classCode, className: myClass[0].className})
        })
    }

    onADDClick() {
        var body = {
            studentID: this.user.id,
            classID: this.classID,
            classCode: this.state.classCode,
            rating: this.state.rating,
            review: this.state.review
        }

        this.reviewClassRepository.addReview(body)
            .then(() => {
                alert('Review added!');
                this.shouldRedirect = true;
                this.setState({})
            });
    }
    
    render(){
        if(this.shouldRedirect)
            return <Redirect to={`/recommendations/classes/${this.classID}`} />

        if(!this.state.className)
            return <h1>Loading Class...</h1>

         return <div className="container">
                <div className="row">
                    <div className="col-7 col-7 mx-auto">
                        <div className="card  my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">{this.state.className}</h5>
                                <form className="form-signin" onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <label>{this.state.classCode}</label>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="rating">Rating</label>
                                        <select className="form-control" 
                                                id="rating"
                                                value={this.state.rating}
                                                onChange={event => this.setState({ rating: event.target.value })}>
                                                <option></option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="review">Comment</label>
                                        <input className="form-control" 
                                                id="review"
                                                type='text'
                                                value={this.state.review}
                                                onChange={event => this.setState({ review: event.target.value })}>
                                        </input>
                                    </div>

                                    <hr/>   
                                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="button" onClick={() => this.onADDClick()}>
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    }
}

export default ClassReviewForm;