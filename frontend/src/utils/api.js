import { CONFIG } from './const';

class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
    this._userUrl = `${this._url}/users/me`;
    this._cards = `${this._url}/cards`;
    this._likesUrl = `${this._url}/cards/likes`;
  }; 

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`${res.status}`));
  };

  getUserData() {
    return fetch(this._userUrl, {
      headers: this._headers
    })
      .then(this._getResponse);
  };

  getInitialCards() {
    return fetch(this._cards, {
      headers: this._headers,
    })
      .then(this._getResponse);
  };

  setUserInfo({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    }).then(this._getResponse);
  }

  setNewCard({ namenewimage, linknewimage }) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: namenewimage,
        link: linknewimage
      })
    }).then(this._getResponse);
  }

  changeUserAvatar({ linkNewAvatar }) {
    return fetch(`${this._userUrl}/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: linkNewAvatar
      })
    })
      .then(this._getResponse);
  };

  deleteCard(id) {
    return fetch(`${this._cards}/${id}`, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then(this._getResponse);
  };

  changeLikeCardStatus(id, isLiked) {
    const method = isLiked ? 'PUT' : 'DELETE';

    return fetch(`${this._likesUrl}/${id}`, {
      method,
      headers: this._headers
    })
      .then(this._getResponse);
  };
};

const api = new Api(CONFIG.apiConfig);

export default api;
