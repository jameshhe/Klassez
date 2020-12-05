import axios from 'axios'

export class ProfileRepository {

    url = 'http://localhost:8080/api';

    getProfile(userID, userType) {
        return new Promise((resolve, reject) => {
            if(userType == 2){
                axios.get(`${this.url}/instructor/${userID}`)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e)
                    reject()
                })
            }
            else if(userType == 1){
                axios.get(`${this.url}/students/${userID}`)
                .then(x => resolve(x.data))
                .catch(e => {
                    alert(e)
                    reject()
                })
            }
        })
    }
    

    updateProfile(id, profile) {
        console.log(id)
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/students/${id}`, profile, this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e);
                reject();
            });
        });
    }
}
