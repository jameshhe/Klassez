import axios from 'axios';

export class ReviewRepsitory {
    url = 'http://localhost:8080/api/review';

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
}