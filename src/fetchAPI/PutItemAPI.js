
import * as type from "./../constants";
export default function callAPI(param) {
    return new Promise((resolve, reject) => {
        const url = type.FETCH_URL_ITEMS + param.item_post.id;
        console.log("Put", url);
        fetch(url, {
            method: "PUT",
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