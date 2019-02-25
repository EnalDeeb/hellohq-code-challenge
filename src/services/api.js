import axios from 'axios';
const HTTP = axios.create({
    baseURL: 'https://code-challenge.azurewebsites.net/api/',
    withCredentials: false,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })

export default {
    _get: function (entity) {
        return new Promise(function (resolve, reject) {
            HTTP.get(entity)
            .then(function (res) {
                resolve(res.data)
            })
            .catch(function (err) {
                reject(err.response.data)
            })
        })
    }
  }

