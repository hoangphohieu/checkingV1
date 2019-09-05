import * as type from "./../constants";

export default function deleteItemProperties(param) {  
    return new Promise((resolve, reject) => {
        console.log(param);
        
        let url =type.FETCH_URL_ITEMS+"/" +param.id;
       fetch(url, {
           method: "DELETE"
       })
           .then(response => response.json())
           .then(res => {
               resolve(res);
           })
           .catch(err => {
               reject(err)
           })
       })
}