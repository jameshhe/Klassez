import React from 'react'
import "./classSelector.css"
import {ClassRepository} from '../../api/classRepository'
import {StudentRepository} from '../../api/studentRepository'
import store from '../../store'

export class ClassSelector extends React.Component{
    classRepository = new ClassRepository()
    studentRepository = new StudentRepository()
    user = store.getState().auth.user
    previous = ""

    constructor(){
        super()
        this.state = {
            classes: null,
            selectedClasses: null
        }
        this.generate = this.generate.bind(this)
    }

    

    val_changed = false;

    add(x, index){
        var sc = this.state.selectedClasses
        var c = this.state.classes;

        if(!sc){
            sc = [];
        }

        sc.push(x);
        c.splice(index, 1);
        this.val_changed = true;
        this.setState({classes: c, selectedClasses: sc})
    }

    remove(x, index){
        var sc = this.state.selectedClasses
        var c = this.state.classes;

        c.push(x);
        sc.splice(index, 1);
        this.val_changed = true;
        this.setState({classes: c, selectedClasses: sc})
    }

    generate = () => {
        if((this.user.id)){
            var body = {
                studentID: this.user.id,
                numHours: (3 * this.state.selectedClasses.length),
                semester: "Spring 2021",
                classesList: this.state.selectedClasses
            }

            this.studentRepository.addSchedule(body)
            .then(() => {
                this.props.history.push({
                    pathname: '/schedule',
                    state: { selectedClasses: this.state.selectedClasses }
                  })
            })
        } else{
            this.props.history.push({
                pathname: '/schedule',
                state: { selectedClasses: this.state.selectedClasses }
              })
        }
    }

    componentDidMount(){
        this.classRepository.getClasses()
        .then(classes => {
            console.log(classes)
            classes = classes.sort((x, y) => (
                x.classCode > y.classCode ? 1 : -1)
            )
            this.setState({classes})
            
            if(this.user.id){
                this.studentRepository.getSchedule(this.user.id)
                    .then((schedule) => {
                        if(schedule.classesList){
                            for(var k = schedule.classesList.length - 1; k >=0; k-- ){
                                this.add(schedule.classesList[k], k)
                            }
                        }
                    })

            }
        })
    }

    componentWillUpdate(nextProps, nextState){
        if(this.val_changed){
            var classes = this.state.classes

            if(classes){
                classes.sort((x, y) => (
                    x.classCode > y.classCode ? 1 : -1)
                )
            }

            var selectedClasses = this.state.selectedClasses

            if(selectedClasses){
                selectedClasses = selectedClasses.sort((x, y) => (
                    x.classCode > y.classCode ? 1 : -1)
                )
                this.val_changed = false;
                this.setState({classes, selectedClasses})
            }
        }
    }

    render(){
        if(!this.state.classes){
            return <div>Loading Classes...</div>
        }


        return <div>
            <div>
        <ul>
        <h3>Available Classes</h3>
    
        {
            this.state.classes.map((x, i) => <li key={i} className="card">
                    <table>
                        {
                            (this.previous !== x.classCode) ? 
                            <div className="card-header"><b>{x.classCode} - {x.className}</b></div>
                            :
                            <></>
                        }
                        <div className="hidden">
                            {this.previous = x.classCode}
                        </div>

                        <tbody>
                            <tr>
                                <td>
                                    <table className="table table-hover table-sm">
                                        <thead>
                                            <tr>
                                                <th>Available Seats</th>
                                                <th>Instructor</th>
                                                <th>Days and Times</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="border">{x.seatsRemaining}</td>
                                                <td className="border">{x.Insturctor}</td>
                                                <td className="border">{x.days} {x.timeStart}-{x.timeEnd}</td>
                                                <td className="border"><button className='btn btn-primary' onClick={() => this.add(x, i)}>Add Class</button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </li>
            )
        }
        </ul>
        </div>
        <div>

        <ul>
            <h3>Selected Classes</h3>
            {
                this.state.selectedClasses ?
                    this.state.selectedClasses.map((x, i) => <li key={i} className="card">
                        <table>
                            {
                                (this.previous !== x.classCode) ? 
                                <div className="card-header"><b>{x.classCode} - {x.className}</b></div>
                                :
                                <></>
                            }
                            <div className="hidden">
                                {this.previous = x.classCode}
                            </div>
    
                            <tbody>
                                <tr>
                                    <td>
                                        <table className="table table-hover table-sm">
                                            <thead>
                                                <tr>
                                                    <th>Available Seats</th>
                                                    <th>Instructor</th>
                                                    <th>Days and Times</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="border">{x.seatsRemaining}</td>
                                                    <td className="border">{x.Insturctor}</td>
                                                    <td className="border">{x.days} {x.timeStart}-{x.timeEnd}</td>
                                                    <td className="border"><button className='btn btn-danger' onClick={() => this.remove(x, i)}>Remove Class</button></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </li>
                ) : <></>
            
            }
                
        </ul>
        </div>
        <center><button className='btn btn-success' onClick={this.generate}>Generate Schedule</button></center>
    </div>
    }
}

export default ClassSelector;