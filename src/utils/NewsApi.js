/* eslint-disable */
// import apikey from "./constants";
class NewsApi {
  constructor({ baseUrl, headers, apikey }) {
    // constructor body
    this._baseUrl = baseUrl;
    this._headers = headers;
    // this._apikey = apikey;
  }

  // RESPONSE CHECK
  _responseCheck(res) {
    return res.ok ? res.json() : Promise.reject(`Error!${res.statusText}`);
  }

  // GET https://newsapi.org/v2/everything?q=${request}&from=${7DaysAgo}&to=${today}&sortBy=popularity&pageSize=100&apiKey=${this._apikey}
  getNews({request, sevenDaysAgo, today}) {
    /* eslint-disable-next-line no-undef */
    return fetch(`${this._baseUrl}?q=${request}&from=${sevenDaysAgo}&to=${today}&sortBy=popularity&pageSize=100&apiKey=37517964b8c6435cada5cb58d48e8abc`, {
      headers: {
        authorization: `Bearer 37517964b8c6435cada5cb58d48e8abc`,
      },
    })
      .then(this._responseCheck);
  }
}

const newsApi = new NewsApi({
  baseUrl: 'https://newsapi.org/v2/everything',
  headers: {
    'Authorization': `Bearer 37517964b8c6435cada5cb58d48e8abc`,
    'content-type': 'application/json'
  }
});

export default newsApi;
