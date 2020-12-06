import { getApiUrl, getApiOptions } from '../util/apiUtils'

import axios from './interceptor'

const formationService = {
  getAll,
  getById,
  remove,
  save,
  update,
  uploadLogo
}

function update (formation) {
  return new Promise((resolve, reject) => {
    axios.put(`${getApiUrl()}/formation/${formation.id}`, formation, getApiOptions()).then(
      res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
  })
}
function uploadLogo (payload) {
  return new Promise((resolve, reject) => {
    axios.post(`${getApiUrl()}/formation/image`, payload, getApiOptions()).then(
      res => {
        resolve(res)
      }, err => {
        reject(err)
      })
  })
}
function save(newFormation) {
  return new Promise((resolve, reject) => {
    axios.post(`${getApiUrl()}/formation`, newFormation, getApiOptions()).then(
      res => {
        resolve(res)
      }, err => {
        reject(err)
      })
  })
}

function remove(id) {
  return new Promise((resolve, reject) => {
    axios.delete(`${getApiUrl()}/formation/${id}`, getApiOptions()).then(
      res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
  })
}
function getAll(date = null, lieu = null, categorie = null) {
  let url = `${getApiUrl()}/formation`
  url += date ? `?date=${date}` : ``
  url += lieu ? `&lieu=${lieu}` : ``
  url += categorie ? `&categorie=${categorie}` : ``

  return new Promise((resolve, reject) => {
    axios.get(url).then(
      res => {

        resolve(res.data)
      }, err => {
        reject(err)
      })
  })
}

function getById(id) {
  return new Promise((resolve, reject) => {
    axios.get(`${getApiUrl()}/formation/${id}`).then(
      res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
  })
}
export default formationService