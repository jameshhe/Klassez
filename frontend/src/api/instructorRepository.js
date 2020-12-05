import axios from 'axios'

export class InstructorRepository {
    url = 'http://3.138.183.180:8080/api/instructor';

    getInstructors() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}s`)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e)
                    reject()
                })
        })
    }

    getInstructor(instructorId) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/${instructorId}`)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e)
                    reject()
                })
        })
    }
}