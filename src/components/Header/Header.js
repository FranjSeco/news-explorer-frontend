import React from 'react';
import './Header.css';

import { useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Overlay from '../Overlay/Overlay';

const Header = (props) => {
  // const [isDisplayed, setIsDisplayed] = React.useState('none')
  const [isDisplayed, setIsDisplayed] = React.useState(false);
  const [open, setOpen] = React.useState('open');

  const location = useLocation();

  const [getWidth, setGetWidth] = React.useState(window.innerWidth);

  const updateDimensions = () => {
    setGetWidth(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [getWidth]);

  const handleBurger = () => {
    // setIsDisplayed(isDisplayed === 'none' ? 'flex' : 'none');
    setIsDisplayed(isDisplayed === false);
    setOpen(open === 'open' ? 'close' : 'open');
  };

  return (
        <nav className={`header ${(isDisplayed) && 'header__fixed'}`}>
            <div className={`header_border ${location.pathname === '/saved-news' && 'header__border_black'} ${isDisplayed && 'header__border_displayed'}`}></div>
            <div className='header__content-wrapper'>
                <div className='header__title-wrapper'>
                    <p className={`header__title ${location.pathname === '/saved-news' && 'header__title_black'} ${isDisplayed && 'header__title_displayed'}`}>WorldNews</p>
                </div>

                {getWidth > 700
                  ? <div className='header__nav'>
                        <Navigation handlePopup={props} isDisplayed={isDisplayed}/>
                    </div>
                  : <>
                        <div className='header__burguer-wrapper'>
                            <button className='header__burger' onClick={handleBurger}>
                                <span className={`header__burger_${open} ${location.pathname === '/saved-news' && 'header__burger_black'} ${isDisplayed && 'header__burger_displayed'}`}></span>
                                <span className={`header__burger_${open} ${location.pathname === '/saved-news' && 'header__burger_black'} ${isDisplayed && 'header__burger_displayed'}`}></span>
                            </button>
                        </div>
                        <Overlay isOpen={isDisplayed}>
                            <div className='header__nav'>
                                <Navigation handlePopup={props}/>
                            </div>
                        </Overlay>
                    </>
                }

            </div>
        </nav>
  );
};

export default Header;
