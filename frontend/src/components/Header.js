import logo from "../images/logo.svg";
import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

function Header(props) {
  const history = useHistory();
  const location = useLocation();

  const [showMobileMenu, setShowMobileMenu] = React.useState(false);

  function handleSignOut() {
    setShowMobileMenu(false);

    props.onSignOut();
  }

  function handleShowMobileMenu() {
    setShowMobileMenu(!showMobileMenu);
  }

  const buttonMobileMenuClass = `header__menu ${
    showMobileMenu && "header__menu_open"
  }`;
  const userMobileMenuClass = `user user_mobile ${
    showMobileMenu && "user_show"
  }`;

  return (
    <header className="header page__header">
      {props.loggedIn && (
        <div className={userMobileMenuClass}>
          <span className="user__email">{props.email}</span>
          <button
            className="link header__link user__logout"
            onClick={handleSignOut}
          >
            Выйти
          </button>
        </div>
      )}

      <div className="header__container">
        <Link to="/" className="link">
          <img className="logo" src={logo} alt="Логотип" />
        </Link>

        {props.children}

        {props.loggedIn && (
          <>
            <div className="user">
              <span className="user__email">{props.email}</span>
              <button
                className="link header__link user__logout"
                onClick={handleSignOut}
              >
                Выйти
              </button>
            </div>

            <button
              className={buttonMobileMenuClass}
              onClick={handleShowMobileMenu}
            ></button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
