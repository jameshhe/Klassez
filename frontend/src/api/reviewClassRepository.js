import axios from 'axios';

export class ReviewClassRepository {
    url = 'http://3.138.183.180:8080/api';

    addReview(review){
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/reviewclass`, review, this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e);
                reject();
            });
        });
    }
    
    getReview(idvalue)  {
        return new Promise((resolve, reject ) =>{
            axios.get(`${this.url}/classReview/${idvalue}`)
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e)
                reject()
            })
        })
    }


}