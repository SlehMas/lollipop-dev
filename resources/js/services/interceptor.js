import axios from 'axios'

axios.interceptors.response.use((response) => {

  if(response.status === 401) {
       window.location.href = '/login'
  }
  if (response.status === 404 ) {
    window.location.href = '/notfound'
  }
  return response;
}, (error) => {
  if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
  }
  return Promise.reject(error.message);
});

export default axios