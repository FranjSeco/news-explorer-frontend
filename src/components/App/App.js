/* eslint-disable */
import React from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom';
import newsApi from '../../utils/NewsApi';
import * as mainApi from '../../utils/MainApi';
// import * as MainApi from '../../utils/MainApi'

import Header from '../Header/Header';
import Main from '../Main/Main';
import About from '../About/About';
import Footer from '../Footer/Footer';
import Results from '../Results/Results';

import Savednewsheader from '../SavedNewsHeader/SavedNewsHeader';
import SavedNews from '../SavedNews/SavedNews';

import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import Successful from '../Successful/Successful';
import NotFound from '../NotFound/NotFound';

function App() {
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [signInIsOpen, setSignIsOpen] = React.useState(false);
  const [signUpIsOpen, setSignUpIsOpen] = React.useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = React.useState(false);

  const [token, setToken] = React.useState('');

  const [articles, setArticles] = React.useState({});
  const [results, setResults] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [found, setFound] = React.useState(false);
  const [articlesLength, setArticlesLength] = React.useState();

  function handleOpenPopup() {
    setSignIsOpen(true);
  }

  function closePopup() {
    setSignIsOpen(false);
    setSignUpIsOpen(false);
  }

  function handleSignin() {
    setSignUpIsOpen(false);
    setSignIsOpen(true);
    setIsSuccessOpen(false);
  }

  function handleSignup() {
    setSignIsOpen(false);
    setSignUpIsOpen(true);
  }

  React.useEffect(() => {
    document.title = 'World News';
  }, []);

  // DATE
  const d = new Date();
  const currentDate = (d.getFullYear()) + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  const date = new Date(currentDate);
  date.setDate(date.getDate() - 7);
  const sevenDays = date.toLocaleDateString('en-US', { year: 'numeric' }) + '-' + date.toLocaleDateString('en-US', { month: 'numeric' }) + '-' + date.toLocaleDateString('en-US', { day: 'numeric' });

  // API NEWSAPI
  function handleSearch(request) {
    setIsLoading(true);
    setResults(true);
    newsApi.getNews({
      request,
      sevenDaysAgo: sevenDays,
      today: currentDate,
    })
      .then((res) => {
        if (!res) {
          setResults(false);
          setFound(true);
        }
        localStorage.setItem('articles', JSON.stringify(res.articles));
        setArticles(res.articles);
        setIsLoading(false);
        setArticlesLength(res.articles.length);
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  }


  // API SAVE ARTICLE

  // function handleSaveArticle({
  //   keyword, title, text, date, source, link, image,
  // }) {
  //   const jwt = localStorage.getItem('jwt');

  //   mainApi.saveArticle({
  //     keyword, title, text, date, source, link, image, token: jwt
  //   })
  //     .then(res => {
  //       console.log(res, 'article saved');
  //     })
  // }

  // console.log(JSON.parse(localStorage.getItem('articles')), 'this');

  React.useEffect(() => {
    if (localStorage.getItem('articles')) {
      setIsLoading(true);
      console.log('Articles found in local storage');
      const localStorageArticles = JSON.parse(localStorage.getItem('articles'));
      setResults(true);
      setArticles(localStorageArticles);
      setIsLoading(false);
    }
  }, []);

  // API MAINAPI REGISTRATION
  function handleRegistration(name, email, password) {
    if (name && email && password) {
      localStorage.setItem('userName', name);
      mainApi.register(name, email, password)
        .then(res => {
          if (res.message) {
            console.log(res.message);
          } else if (!res) {
            console.log(res);
            return res;
          } else {
            console.log('Registation succesful')
            setSignUpIsOpen(false);
            return res;
          }
        })
        .then(setIsSuccessOpen(true))
        .catch((err) => {
          setIsSuccessOpen(true);
          console.log(err);
        })
    }

  }

  // API MAINAPI REGISTRATION
  function handleAuthorization(email, password) {
    mainApi.authorize(email, password)
      .then(({ token }) => {
        if (token) {
          localStorage.setItem('jwt', token);
          setToken(token);
          setLoggedIn(true);
          setSignIsOpen(false);
          return;
        }
      })
      .catch(err => {
        console.log('Authorization went wrong')
      })
  }

  // API MAINAPI CHECKTOKEN
  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi.checkToken(jwt)
        .then((res) => {
          if (!res.message) {
            console.log(res, jwt, 'checking token');
            setLoggedIn(true);
            setToken(jwt);
            return;
          }
          setLoggedIn(false);
        })
        .catch(err => console.log(err))
    }
  }

  // LOGOUT
  function handleLogOut() {
    localStorage.removeItem('userName');
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }

  React.useEffect(() => {
    checkToken();
  }, [])

  // const [isLoading, setIsLoading] = React.useState(false);

  return (
    <div className="app">
      <Header
        onOpenPopup={handleOpenPopup}
        isLoggedIn={isLoggedIn}
        handleLogOut={handleLogOut}
      />

      <Switch>
        <Route path="/" exact>
          <Main
            onSearch={handleSearch}
          />
          {results
            && <Results
              articles={articles}
              isLoading={isLoading}
              length={articlesLength}
              isLoggedIn={isLoggedIn}
              // handleSaveArticle={handleSaveArticle}
            />}

          {found && <NotFound />}
          <About />
        </Route>

        <Route path="/saved-news" exact>
          <Savednewsheader />
          <SavedNews />
        </Route>

      </Switch>

      <SignUp
        isOpen={signUpIsOpen}
        openSignIn={handleSignin}
        onClose={closePopup}
        handleSignUp={handleRegistration}
      />
      <SignIn
        isOpen={signInIsOpen}
        openSignUp={handleSignup}
        onClose={closePopup}
        handleSignIn={handleAuthorization}
      />

      <Successful
        isOpen={isSuccessOpen}
        openSignIn={handleSignin}
        onClose={closePopup}
      />

      <Footer />
    </div>
  );
}

export default App;
