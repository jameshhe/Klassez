import axios from 'axios'

export class ClassRepository {
    url = '';

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
}