
import * as type from "./../constants";
export default function callAPI(param) {
      console.log(param); 
      return new Promise((resolve, reject) => {
          const url =type.FETCH_URL_ITEMS;
          fetch(url, {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(param)
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