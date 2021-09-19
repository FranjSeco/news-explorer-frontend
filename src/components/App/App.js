/* eslint-disable */
import React from 'react';
import './App.css';

import { Route, Switch, useLocation, useHistory, Redirect } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import newsApi from '../../utils/NewsApi';
import * as mainApi from '../../utils/MainApi';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';

import Header from '../Header/Header';
import Main from '../Main/Main';
import About from '../About/About';
import Footer from '../Footer/Footer';
import Results from '../Results/Results';

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

  // const [token, setToken] = React.useState('');
  // const location = useLocation();
  const history = useHistory();

  const [savedArticles, setSavedArticles] = React.useState([]);
  const [articles, setArticles] = React.useState([]);
  const [results, setResults] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loadingSaved, setLoadingSaved] = React.useState(false);
  const [found, setFound] = React.useState(false);
  const [tag, setTag] = React.useState('');

  const [signUpResponse, setSignUpResponse] = React.useState(false);
  const [signInResponse, setSignInResponse] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});
  
  React.useEffect(() => {
    checkToken();
    history.push('/');
  }, [])

  function handleOpenPopup() {
    setSignUpIsOpen(true);
  }

  function closePopup() {
    setSignIsOpen(false);
    setSignUpIsOpen(false);
    setIsSuccessOpen(false);
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

  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === '/saved-news' && isLoggedIn === false) {
      setSignIsOpen(true);
    } 
  }, [location]);

  React.useEffect(() => {
    if (localStorage.getItem('articles')) {
      setIsLoading(true);
      console.log('Articles found in local storage');
      const localStorageArticles = JSON.parse(localStorage.getItem('articles'));
      setResults(true);
      setArticles(localStorageArticles);
      setIsLoading(false);
      history.push('/');
    }
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
    setTag(`${request}`);
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
        localStorage.setItem('tag', request);
        setArticles(res.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  }

  // API SAVE ARTICLE

  function handleSaveArticle({
    keyword, title, text, date, source, link, image,
  }) {
    const jwt = localStorage.getItem('jwt');
    if (savedArticles.data.length >= 0) {
      mainApi.saveArticle({
        keyword, title, text, date, source, link, image, token: jwt
      })
        .then(res => {
          handleGetSaved();
          console.log(res, 'article saved');
          return;
        })
    } else if (savedArticles.data.some(element => element.title === title)) {
      console.log('This article is already saved')
    }
  }

  // DELETE ARTICLE

  function handleDeleteArticle(target) {
    console.log(currentUser);
    const jwt = localStorage.getItem('jwt');
    const deleteArticle = savedArticles.data.find(element => element.title === target.title && element.owner === currentUser._id);
    mainApi.deleteArticle(deleteArticle._id, jwt)
      .then(res => {
        handleGetSaved();
        console.log(res, 'article deleted');
        return
      })
  }

  // GET SAVED ARTICLES

  function handleGetSaved() {
    setLoadingSaved(true);
    const jwt = localStorage.getItem('jwt');
    mainApi.getArticles(jwt)
      .then(res => {
        setSavedArticles(res);
        console.log(res, 'these are the saved articles')
        setLoadingSaved(false);
      })
      .catch(err => {
        console.log(err);
      })
  }

  // API MAINAPI REGISTRATION
  function handleRegistration(name, email, password) {
    if (name && email && password) {
      mainApi.register(name, email, password)
        .then(res => {
          if (res.message) {
            console.log(res.message);
            setSignUpResponse(true);
          } else if (!res) {
            setSignUpResponse(true);
            return res;
          } else {
            console.log('Registation succesful')
            setCurrentUser(res);
            setSignUpIsOpen(false);
            setIsSuccessOpen(true);
            return res;
          }
        })
        .catch((err) => {
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
          setLoggedIn(true);
          setSignIsOpen(false);
          return;
        } else {
          setSignInResponse(true);
        }
      })
      .catch(err => {
        console.log('Authorization went wrong')
      })
  }

  // API MAINAPI CHECKTOKEN
  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    const getTag = localStorage.getItem('tag');
    setTag(`${getTag}`)
    if (jwt) {
      mainApi.checkToken(jwt)
        .then((res) => {
          console.log('Getting info on refresh');
          setCurrentUser(res.data);
          handleGetSaved();
          if (!res.message) {
            setLoggedIn(true);
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

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          handleOpenPopup={handleOpenPopup}
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
                isLoggedIn={isLoggedIn}
                handleSaveArticle={handleSaveArticle}
                savedArticles={savedArticles}
                handleDeleteArticle={handleDeleteArticle}
                tag={tag}
                openSignUp={handleSignup}
              />}

            {found && <NotFound />}
            <About />
          </Route>

          <ProtectedRoute 
            component={SavedNews}
            loadingSaved={loadingSaved}
            savedArticles={savedArticles}
            isLoggedIn={isLoggedIn}
            savedArticles={savedArticles}
            exact path="/saved-news" 
            isLoggedIn={isLoggedIn} 
            handleDeleteArticle={handleDeleteArticle}
            /> 

        </Switch>

        <SignUp
          isOpen={signUpIsOpen}
          openSignIn={handleSignin}
          onClose={closePopup}
          handleSignUp={handleRegistration}
          signUpResponse={signUpResponse}
        />
        <SignIn
          isOpen={signInIsOpen}
          openSignUp={handleSignup}
          onClose={closePopup}
          handleSignIn={handleAuthorization}
          signInResponse={signInResponse}
        />

        <Successful
          isOpen={isSuccessOpen}
          openSignIn={handleSignin}
          onClose={closePopup}
        />

        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
