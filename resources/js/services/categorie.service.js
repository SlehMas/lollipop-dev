import { getApiUrl, getApiOptions } from '../util/apiUtils'

const categorieService = {
  getAll,
  save,
  remove
}

function getAll () {
  return new Promise((resolve, reject) => {
    axios.get(`${getApiUrl()}/categorie`).then(
      res => {

        resolve(res.data)
      }, err => {
        reject(err)
      })
  })
}

function save (newCategorie) {
  return new Promise((resolve, reject) => {
    axios.post(`${getApiUrl()}/categorie`, newCategorie, getApiOptions()).then(
      res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
  })
}

function remove (categorieId) {
  return new Promise((resolve, reject) => {
    axios.delete(`${getApiUrl()}/categorie/${categorieId}`, getApiOptions()).then(
      res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
  })
}

export default categorieService