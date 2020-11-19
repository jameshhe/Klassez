import axios from 'axios'

export class StudentRepository {
    url = '';

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
}