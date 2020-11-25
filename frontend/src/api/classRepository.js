import axios from 'axios'

export class ClassRepository {
    url = 'http://localhost:8080/api/classes';

    getClasses() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}`)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e)
                    reject()
                })
        })
    }

    getClass(classId) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/${classId}`)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e)
                    reject()
                })
        })
    }
}