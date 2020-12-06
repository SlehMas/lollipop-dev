import { getApiUrl, getApiOptions } from '../util/apiUtils'

const niveauService = {
  getAll,
  save,
  remove
}

function getAll () {
  return new Promise((resolve, reject) => {
    axios.get(`${getApiUrl()}/niveau`).then(
      res => {

        resolve(res.data)
      }, err => {
        reject(err)
      })
  })
}

function save (newNiveau) {
  return new Promise((resolve, reject) => {
    axios.post(`${getApiUrl()}/niveau`, newNiveau, getApiOptions()).then(
      res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
  })
}

function remove (niveauId) {
  return new Promise((resolve, reject) => {
    axios.delete(`${getApiUrl()}/niveau/${niveauId}`, getApiOptions()).then(
      res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
  })
}

export default niveauService