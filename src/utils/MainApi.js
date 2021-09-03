/* eslint-disable */

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
  .then((res) => res);

// article createArticle
export const createArticle = ({
  keyword, title, text, date, source, link, image,
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
export const getArticles = () => fetch(`${BASE_URL}/articles`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})
  .then((res) => res.json());

// article//:_id deleteArticle

export const deleteArticle = ({ id }) => fetch(`${BASE_URL}/articles${id}`, {
  method: 'DELETE',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})
  .then((res) => res.json());
