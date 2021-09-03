// eslint-disable-next-line no-unused-vars
import React from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom';
import newsApi from '../../utils/NewsApi';
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

function App(props) {
  const [IsPopupOpen, setIsPopupOpen] = React.useState(false);
  const [signUpIsOpen, setSignUpIsOpen] = React.useState(false);

  const [articles, setArticles] = React.useState({});
  const [results, setResults] = React.useState(false);

  function handleOpenPopup() {
    setIsPopupOpen(true);
  }

  function closePopup() {
    setIsPopupOpen(false);
    setSignUpIsOpen(false);
  }

  function handleSignin() {
    setSignUpIsOpen(false);
    setIsPopupOpen(true);
  }

  function handleSignup() {
    setIsPopupOpen(false);
    setSignUpIsOpen(true);
  }

  React.useEffect(() => {
    document.title = 'World News';
  }, []);

  // DATE
  const currentDate = '2021-09-03';
  const sevenDays = '2021-08-28';

  // API
  function handleSearch(request) {
    newsApi.getNews({
      request,
      sevenDaysAgo: sevenDays,
      today: currentDate,
    })
      .then((res) => {
        setResults(true);
        setArticles(res);
      });
  }

  // React.useEffect(() => {
  //   setResults(true);
  // }, [articles]);

  return (
    <div className="app">

      <Header
        onOpenPopup={handleOpenPopup}
      />

      <Switch>
        <Route path="/" exact>
          <Main
          onSearch={handleSearch}
          />
          {results ? <Results articlesData={articles}/> : ''}
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
      />
      <SignIn
        isOpen={IsPopupOpen}
        openSignUp={handleSignup}
        onClose={closePopup}
      />

      <Successful
        // isOpen={IsPopupOpen}
        openSignIn={handleSignin}
        onClose={closePopup}
      />

      <Footer />
    </div>
  );
}

export default App;
