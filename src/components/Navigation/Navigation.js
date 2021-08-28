import React from 'react';

import { Link, useLocation } from 'react-router-dom';

import './Navigation.css';

import logoutIcon from '../../images/logout.svg';
import logoutIconBlack from '../../images/logout-black.svg';

const Navigation = (props) => {
  const [isLoggedIn] = React.useState(false);
  const [getWidth, setGetWidth] = React.useState(window.innerWidth);
  const location = useLocation();

  const updateDimensions = () => {
    setGetWidth(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [getWidth]);

  return (
        <div className='navigation__wrapper'>
            {isLoggedIn
              ? <>
                    <Link className={`navigation__home ${location.pathname === '/savednews' && 'navigation__home_black'}`} to='/'>Home</Link>
                    <Link className={`navigation__saved-articles ${location.pathname === '/savednews' && 'navigation__saved-articles_black'}`} to='/savednews'>Saved articles</Link>
                    <div className={`navigation__logout ${location.pathname === '/savednews' && 'navigation__logout_black'}`}>
                        <div className='navigation__logout-wrapper'>
                            <p className={`navigation__logout-name ${location.pathname === '/savednews' && 'navigation__logout-name_black'}`}>Fran</p>
                            {getWidth < 700 ? <img className='navigation__logout-icon' src = {logoutIcon} alt=''/>
                              : <img className='navigation__logout-icon' src = {`${location.pathname === '/savednews' ? logoutIconBlack : logoutIcon}`} alt=''/>}
                        </div>

                    </div>
                </>
              : <>
                    <a className='navigation__home' href='/'>Home</a>
                    <button className='navigation__signin' onClick={props.handlePopup.onOpenPopup}>Sign in</button>
                </>
            }

        </div>
  );
};

export default Navigation;
