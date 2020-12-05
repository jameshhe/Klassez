import axios from 'axios'

export class StudentRepository {
    url = 'http://localhost:8080/api';

    getStudents() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/students`)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e)
                    reject()
                })
        })
    }

    getStudent(studentId) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/students/${studentId}`)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e)
                    reject()
                })
        })
    }

    getSchedule(studentId){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/schedules/${studentId}`)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e)
                    reject()
                })
        })
    }

    addSchedule(body){
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/addschedule`, body)
                .then(x => resolve(x.data))
                .catch(e => {
                    resolve(e)
                })
        })
    }

    updateSchedule(studentId, body){
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/schedule/update/${studentId}`, body)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e)
                    reject()
                })
        })
    }
}