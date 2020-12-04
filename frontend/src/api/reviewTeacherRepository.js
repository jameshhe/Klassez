import axios from 'axios';

export class ReviewTeacherRepository {
    url = 'http://localhost:8080/api/reviewteacher';

    addReview(review){
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}`, review, this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e);
                reject();
            });
        });
    }

}