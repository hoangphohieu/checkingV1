

import * as type from "./../constants";
export default function patchItemCheckingProperties(param) {   
       
      return new Promise((resolve, reject) => {
      console.log(param);
          const url =type.FETCH_URL_ITEMS+"/"+param.id;
          fetch(url, {
              method: "PATCH",
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(param.value)
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