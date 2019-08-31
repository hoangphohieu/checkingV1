

import * as type from "./../constants";
export default function patchPrintStatusItem(param) {      
      return new Promise((resolve, reject) => {
      // console.log(param);
          const url =type.FETCH_URL_ITEMS+"/"+param.idStatus;
          fetch(url, {
              method: "PATCH",
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({printStatus:param.printStatus})
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