const axios = require('axios');

function speakerService(){
    function getSpeakerById(id){
        return new promise((resolve,reject)=>{
        axios
        .get('http://localhost:3000/speakers/'+id) 
        .then((response) =>{
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        });
     });
    }
    getSpeakerById
return{getSpeakerById}
}

module.exports = speakerService();
