import axios from 'axios';

export class ReviewClassRepsitory {
    url = 'http://localhost:8080/api/reviewclass';

    getReview(idvalue)  {
        return new Promise((resolve, reject ) =>{
            axios.get(`${this.url}/${idvalue}`)
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e)
                reject()
            })
        })
    }

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