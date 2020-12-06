import { getApiUrl, getApiOptions } from '../util/apiUtils'

import axios from './interceptor'

const inscriptionService = {
  save,
  getAll,
  accept,
  refuse
}


function accept (id) {
  console.log(getApiOptions())
  return new Promise((resolve, reject) => {
    axios.put(`${getApiUrl()}/inscription/${id}/accept`, null, getApiOptions()).then(
      res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
  })
} 

function refuse (id) {
  return new Promise((resolve, reject) => {
    axios.put(`${getApiUrl()}/inscription/${id}/refuse`, null, getApiOptions()).then(
      res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
  })
} 


function getAll () {
  return new Promise((resolve, reject) => {
    axios.get(`${getApiUrl()}/inscription`).then(
      res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
  })
}

function save (inscription) {
  return new Promise((resolve, reject) => {
    axios.post(`${getApiUrl()}/inscription`, inscription, getApiOptions()).then(
      res => {
        resolve(res)
      }, err => {
        reject(err)
      })
  })
}

export default inscriptionService