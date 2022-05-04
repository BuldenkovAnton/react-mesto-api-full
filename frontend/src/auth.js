export const BASE_URL = 'https://auth.nomoreparties.co';

const _checkResponse = (response) => {
  if (response.ok)
      return response.json();
    return Promise.reject(response.status);
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password })
  })
  .then(response => _checkResponse(response))
  .then(response => response.data);
}

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(response => _checkResponse(response))
  .then(response => response.token);
}

export const checkMe = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${token}`
    }
  })
  .then(response => _checkResponse(response))
  .then(response => response.data);
}