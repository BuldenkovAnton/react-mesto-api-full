class Api {
    
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok)
      return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      method: 'GET',
      headers: this._headers
    })
    .then((res) => {
      return this._checkResponse(res);
    });
  }

  setUserInfo(name, about){
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
    .then((res) => {
      return this._checkResponse(res);
    });
  }

  setUserAvatar(avatar){
    return fetch(this._baseUrl + '/users/me/avatar ', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
    .then((res) => {
      return this._checkResponse(res);
    });
  }

  changeLikeCardStatus(cardId, toggleLike){
    const method = toggleLike ? 'PUT' : 'DELETE';

    return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
      method: method,
      headers: this._headers,
      body: JSON.stringify({
        _id: cardId
      })
    })
    .then((res) => {
      return this._checkResponse(res);
    });
  }

  getCardList() {
    return fetch(this._baseUrl + '/cards', {
      method: 'GET',
      headers: this._headers
    })
    .then((res) => {
      return this._checkResponse(res);
    });
  }

  createCard(name, link){
    return fetch(this._baseUrl + '/cards', {
       method: 'POST',
       headers: this._headers,
       body: JSON.stringify({
         name,
         link
       })
     })
     .then((res) => {
       return this._checkResponse(res);
     });
   }

  deleteCard(cardId){
    return fetch(this._baseUrl + '/cards/' + cardId, {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({
        _id: cardId
      })
    })
    .then((res) => {
      return this._checkResponse(res);
    });
  }



}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-34',
  headers: {
    authorization: '5f717fb3-20f3-4958-9050-7183c329d1d2',
    'Content-Type': 'application/json'
  }
});


export default api;