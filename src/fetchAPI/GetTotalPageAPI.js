
export default function callAPi(param) {
    return new Promise((resolve, reject) => {
        let url;
        if (param.textSearch === null) { url = `http://localhost:3001/items`; }
        else { url = `http://localhost:3001/items?q=${param.textSearch}` }
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