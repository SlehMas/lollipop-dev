import { getApiUrl, getApiOptions } from '../util/apiUtils'

const lieuService = {
  getAll,
  save,
  remove
}

function getAll () {
  return new Promise((resolve, reject) => {
    axios.get(`${getApiUrl()}/lieu`).then(
      res => {

        resolve(res.data)
      }, err => {
        reject(err)
      })
  })
}

function save (newNiveau) {
  return new Promise((resolve, reject) => {
    axios.post(`${getApiUrl()}/lieu`, newNiveau, getApiOptions()).then(
      res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
  })
}

function remove (lieuId) {
  return new Promise((resolve, reject) => {
    axios.delete(`${getApiUrl()}/lieu/${lieuId}`, getApiOptions()).then(
      res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
  })
}

export default lieuService