import { getApiUrl, getApiOptions } from '../util/apiUtils'

const messageService = {
  getAll,
  save,
  read,
  unread,
  getById
}

function getAll () {
  return new Promise((resolve, reject) => {
    axios.get(`${getApiUrl()}/message`, getApiOptions()).then(
      res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
  })
}

function save (newMessage) {
  return new Promise((resolve, reject) => {
    axios.post(`${getApiUrl()}/message`, newMessage).then(
      res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
  })
}

function read (id) {
  return new Promise((resolve, reject) => {
    axios.patch(`${getApiUrl()}/message/read/${id}`, getApiOptions()).then(
      res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
  })
}

function getById (id) {
  return new Promise((resolve, reject) => {
    axios.get(`${getApiUrl()}/message/${id}`, getApiOptions()).then(
      res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
  })
}

function unread () {
  return new Promise((resolve, reject) => {
    axios.get(`${getApiUrl()}/message/unread`, getApiOptions()).then(
      res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
  })
}

export default messageService