import axios from 'axios';

export class ReviewTeacherRepository {
    url = 'http://localhost:8080/api';

    addReview(review){
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/reviewteacher`, review, this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e);
                reject();
            });
        });
    }

    getReview(idvalue)  {
        return new Promise((resolve, reject ) =>{
            axios.get(`${this.url}/teacherReview/${idvalue}`)
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e)
                reject()
            })
        })
    }

}