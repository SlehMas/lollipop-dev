import Cookies from 'universal-cookie';

export function getApiUrl () {
  return window.location.origin + '/api'
}

export function getApiOptions () {
  const cookies = new Cookies();
  return {
    headers: {
      'Authorization': `Bearer ${cookies.get('api_token')}`,
      'Accept': 'application/json'
    }
  }
}
