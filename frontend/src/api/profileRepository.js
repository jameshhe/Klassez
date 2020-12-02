import axios from 'axios'

export class ProfileRepository {

    url = 'http://localhost:8080/api/students';

    getProfile(studentId) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/${studentId}`)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e)
                    reject()
                })
        })
    }
    

    updateProfile(id, profile) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/${id}`, profile, this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e);
                reject();
            });
        });
    }
}