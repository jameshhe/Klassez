import React from 'react'
import { Link } from 'react-router-dom';

export class RecomendForm extends React.Component{

    state ={
        studentname: '',
        classid: '',
        teacher: '',
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
                    <input type="teahcer" class="form-control" id="classid" placeholder="Professot"/>
                </div>
                <div class="form-group">
                    <textarea type="txt" class="form-control" value={this.state.text} placeholder="Comment"></textarea>
                </div>
                <div class="form-group row">
                <button type="submit" class="btn btn-primary">Sumbit</button>
                </div>
                <Link to="/">
                 Go Home
                </Link>
            </form>
        </>
    }
}