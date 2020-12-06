import { getApiUrl, getApiOptions } from '../util/apiUtils'

const categorieService = {
  getAll,
  save,
  remove,
  getById,
  uploadImage,
  update,
  getTags,
  getCategories,
  saveTag,
  saveCategory
}
function saveCategory (catName) {
  console.log('saving')
  return new Promise((resolve, reject) => {
    axios.post(`${getApiUrl()}/blog/categories`, {nom: catName}, getApiOptions()).then(
      res => {
        resolve(res.data)
      }, err => {
        console.log(err)
        reject(err)
      })
  })
}
function update (oldPost) {
  return new Promise((resolve, reject) => {
    axios.put(`${getApiUrl()}/blog/${oldPost.id}`, oldPost, getApiOptions()).then(
      res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
  })
}

function getAll () {
  console.log(getApiOptions())
  return new Promise((resolve, reject) => {
    axios.get(`${getApiUrl()}/blog`, getApiOptions()).then(
      res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
  })
}

function getTags () {
  return new Promise((resolve, reject) => {
    axios.get(`${getApiUrl()}/blog/tags`, getApiOptions()).then(
      res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
  })
}

function saveTag (tagName) {
  console.log('saving')
  return new Promise((resolve, reject) => {
    axios.post(`${getApiUrl()}/blog/tags`, {nom: tagName}, getApiOptions()).then(
      res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
  })
}



function getCategories () {
  console.log(getApiOptions())
  return new Promise((resolve, reject) => {
    axios.get(`${getApiUrl()}/blog/categories`, getApiOptions()).then(
      res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
  })
}

function uploadImage (payload) {
  return new Promise((resolve, reject) => {
    axios.post(`${getApiUrl()}/blog/image`, payload, getApiOptions()).then(
      res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
  })
}

function getById (blogId) {
  return new Promise((resolve, reject) => {
    axios.get(`${getApiUrl()}/blog/${blogId}`, getApiOptions()).then(
      res => {
        resolve(res.data[0])
      }, err => {
        reject(err)
      })
  })
}

function save (newBlog) {
  return new Promise((resolve, reject) => {
    axios.post(`${getApiUrl()}/blog`, newBlog, getApiOptions(), getApiOptions()).then(
      res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
  })
}

function remove (blogId) {
  return new Promise((resolve, reject) => {
    axios.delete(`${getApiUrl()}/blog/${blogId}`, getApiOptions()).then(
      res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
  })
}

export default categorieService