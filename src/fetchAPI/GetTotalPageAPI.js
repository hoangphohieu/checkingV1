import * as type from "./../constants";
export default function callAPi(param) {
    return new Promise((resolve, reject) => {
        let url =type.FETCH_URL_ITEMS;

        fetch(url, { method: "GET" })
            .then(response => response.json())
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err)
            })
    })
}