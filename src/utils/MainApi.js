/* eslint-disable */
// export const BASE_URL = 'http://localhost:3000';
// export const BASE_URL = 'https://api.world-news.students.nomoreparties.site';
export const BASE_URL = 'https://newsexplorer-back.herokuapp.com/';

// signup
export const register = (name, email, password) => fetch(`${BASE_URL}/signup`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ name, email, password }),
})

  .then((res) => res.json())
  .then((res) => res);
// signin
export const authorize = (email, password) => fetch(`${BASE_URL}/signin`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password }),
})
  .then((res) => res.json())
  .then((data) => {
    localStorage.setItem('jwt', data.token);
    return data;
  })
  .catch((err) => console.log(err));

// users/me userinfo

// users/me token

export const checkToken = (token) => fetch(`${BASE_URL}/users/me`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})
  .then((res) => res.json())
  .then((res) => {
    return res;
  });

// article saveArticle
export const saveArticle = ({
  keyword, title, text, date, source, link, image, token
}) => fetch(`${BASE_URL}/articles`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    keyword, title, text, date, source, link, image,
  }),
})
  .then((res) => res.json());

// article getAllArticles
export const getArticles = (token) => fetch(`${BASE_URL}/articles`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})
  .then((res) => res.json());

// article//:_id deleteArticle

export const deleteArticle = (id, token) => fetch(`${BASE_URL}/articles/${id}`, {
  method: 'DELETE',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})
  .then((res) => res.json());
