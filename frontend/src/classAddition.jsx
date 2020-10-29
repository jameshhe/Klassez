import React from 'react';
import { Classes } from './classes'

export class ClassAddition extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            dataid: '',
            datanum: '',
            dataprof: '',
            datastarttime: '',
            dataendtime: '',
            dataclassdep: ''
        };
    }
    
    render(){
        return<>
            <form>
                <div className="form-group">
                    <label>ClassID 
                        <input name="dataid" type="text" vlaue={this.state.dataid} onChange={ event => this.setState({ dataid: event.target.value})}></input>
                    </label>
                    <label>Class Number
                        <input name="datanum" type="text" vlaue={this.state.datanum} onChange={ event => this.setState({ datanum: event.target.value})}></input>
                    </label>
                    <label>Class Professor
                        <input name="dataprof" type="text" vlaue={this.state.dataprof} onChange={ event => this.setState({ dataprof: event.target.value})}></input>
                    </label>
                    <label>Start Time
                        <input name="datastarttime" type="text" vlaue={this.state.datastarttime} onChange={ event => this.setState({ datastarttime: event.target.value})}></input>
                    </label>
                    <label>End Time
                        <input name="dataendtime" type="text" vlaue={this.state.dataendtime} onChange={ event => this.setState({ dataendtime: event.target.value})}></input>
                    </label>
                    <label>Class Department
                        <input name="dataclassdep" type="text" vlaue={this.state.dataclassdep} onChange={ event => this.setState({ dataclassdep: event.target.value})}></input>
                    </label>
                </div>
            </form>
            
        </>
    }
}