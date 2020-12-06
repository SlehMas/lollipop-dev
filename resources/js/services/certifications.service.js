import { getApiUrl, getApiOptions } from '../util/apiUtils'

import axios from './interceptor'

const certificationService = {
  getAll,
  getById,
  remove,
  save,
  update
}

function update (certification) {
  return new Promise((resolve, reject) => {
    axios.put(`${getApiUrl()}/certification/${certification.id}`, certification, getApiOptions()).then(
      res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
  })
}

function save(newcertification) {
  console.log(getApiOptions())
  return new Promise((resolve, reject) => {
    axios.post(`${getApiUrl()}/certification`, newcertification, getApiOptions()).then(
      res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
  })
}

function remove(id) {
  return new Promise((resolve, reject) => {
    axios.delete(`${getApiUrl()}/certification/${id}`, getApiOptions()).then(
      res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
  })
}
function getAll(date = null, lieu = null, categorie = null) {
  let url = `${getApiUrl()}/certification`
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
    axios.get(`${getApiUrl()}/certification/${id}`).then(
      res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
  })
}
export default certificationService