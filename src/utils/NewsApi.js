/* eslint-disable */

const JWT_SECRET = '37517964b8c6435cada5cb58d48e8abc';

class NewsApi {
  constructor({ baseUrl, headers }) {
    // constructor body
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // RESPONSE CHECK
  _responseCheck(res) {
    return res.ok ? res.json() : Promise.reject(`Error!${res.statusText}`);
  }

  // GET https://newsapi.org/v2/everything?q=${request}&from=${7DaysAgo}&to=${today}&sortBy=popularity&pageSize=100&apiKey=${this._apikey}
  getNews({request, sevenDaysAgo, today}) {
    /* eslint-disable-next-line no-undef */
    return fetch(`${this._baseUrl}?q=${request}&from=${sevenDaysAgo}&to=${today}&sortBy=popularity&pageSize=100&apiKey=${JWT_SECRET}`, {
      headers: {
        authorization: `Bearer ${JWT_SECRET}`,
      },
    })
      .then(this._responseCheck);
  }
}

const newsApi = new NewsApi({
  // baseUrl: 'https://newsapi.org/v2/everything',
  baseUrl: 'https://nomoreparties.co/news/v2/everything',
  headers: {
    'Authorization': `Bearer ${JWT_SECRET}`,
    'content-type': 'application/json'
  }
});

export default newsApi;
