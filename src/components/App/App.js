// eslint-disable-next-line no-unused-vars
import React from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom';

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

function App() {
  const [IsPopupOpen, setIsPopupOpen] = React.useState(false);
  const [signUpIsOpen, setSignUpIsOpen] = React.useState(false);

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

  return (
    <div className="app">

      <Header
        onOpenPopup={handleOpenPopup}
      />

      <Switch>
        <Route path="/" exact>
          <Main />
          <Results />
          <About />
        </Route>

        <Route path="/savednews" exact>
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
