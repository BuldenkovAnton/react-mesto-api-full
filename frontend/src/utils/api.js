class Api {
    
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok)
      return res.json();
    return Promise.reject(res.status);
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    })
    .then((res) => this._checkResponse(res))
    .then(response => response.data);
  }

  setUserInfo(name, about){
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
    .then((res) => this._checkResponse(res))
    .then(response => response.data);
  }

  setUserAvatar(avatar){
    return fetch(this._baseUrl + '/users/me/avatar ', {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
    .then((res) => this._checkResponse(res))
    .then(response => response.data);
  }

  changeLikeCardStatus(cardId, toggleLike){
    const method = toggleLike ? 'PUT' : 'DELETE';

    return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
      method: method,
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        _id: cardId
      })
    })
    .then((res) => this._checkResponse(res))
    .then(response => response.data);
  }

  getCardList() {
    return fetch(this._baseUrl + '/cards', {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    })
    .then((res) => this._checkResponse(res))
    .then(response => response.data);
  }

  createCard(name, link){
    return fetch(this._baseUrl + '/cards', {
       method: 'POST',
       credentials: 'include',
       headers: this._headers,
       body: JSON.stringify({
         name,
         link
       })
     })
     .then((res) => this._checkResponse(res))
     .then(response => response.data);
   }

  deleteCard(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        _id: cardId
      })
    })
    .then((res) => this._checkResponse(res))
    .then(response => response.data);
  }

  logout() {
    return fetch(this._baseUrl + '/signout', {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    })
    .then(response => this._checkResponse(response))
    .then(response => response.data);
  }

  register(email, password) {
    return fetch(this._baseUrl + '/signup', {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({email, password })
    })
    .then(response => this._checkResponse(response))
    .then(response => response.data);
  }
  
  authorize(email, password) {
    return fetch(this._baseUrl + '/signin', {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({email, password})
    })
    .then(response => this._checkResponse(response))
    .then(response => response.data);
  }
  
  checkMe() {
    return fetch(this._baseUrl + '/users/me', {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    })
    .then(response => this._checkResponse(response))
    .then(response => response.data);
  }

}

const api = new Api({
  baseUrl: 'https://api.mesto.buldenkov.nomoredomains.xyz',
  headers: {
    'Content-Type': 'application/json'
  }
});


export default api;