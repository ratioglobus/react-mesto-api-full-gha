import { CONFIG } from './const';

class AuthApi {
  constructor ({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(new Error(`${res.status}`))
  }

  _request(url, option) {
    return fetch(url, option).then(this._getResponse)
  }

  authorize(email, password) {
    return this._request(`${this._url}/signin`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
  }

  register(email, password) {
    return this._request(`${this._url}/signup`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
  }

  getInfo(token) {
    return this._request(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
  }
}

const authApi = new AuthApi(CONFIG.authApiConfig);

export default authApi;