import axios from 'axios'

export class StudentRepository {
    url = 'http://3.138.183.180:8080/api/students';

    getStudents() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}`)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e)
                    reject()
                })
        })
    }

    getStudent(studentId) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/${studentId}`)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e)
                    reject()
                })
        })
    }
}