import axios from 'axios'

export class ClassRepository {
    url = 'http://localhost:8080/api';

    getClasses() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/classes`)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e)
                    reject()
                })
        })
    }

    getClass(classId) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/classes/${classId}`)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e)
                    reject()
                })
        })
    }

    addClass(body) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/addclasses`, body)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e)
                    reject()
                })
        })
    }
}