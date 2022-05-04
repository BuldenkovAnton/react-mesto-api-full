import React from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import Card from "./Card";
import Header from "./Header";
import Footer from "./Footer";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <Header
        loggedIn={props.loggedIn}
        changeLoggedIn={props.setLoggedIn}
        onSignOut={props.onSignOut}
        email={props.email}
      />
      <main className="main page__main">
        <section className="profile page__profile" aria-label="Профиль">
          <div className="avatar profile__avatar" onClick={props.onEditAvatar}>
            <img
              className="avatar__image"
              src={currentUser.avatar}
              alt="Аватар"
            />
          </div>

          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__edit-button"
              title="Редактировать пользователя"
              onClick={props.onEditProfile}
            ></button>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
          <button
            type="button"
            className="profile__add-button"
            title="Добавить"
            onClick={props.onAddPlace}
          ></button>
        </section>
        <section className="elements page__elements" aria-label="Элементы">
          {props.cards &&
            props.cards.map((card) => (
              <Card
                card={card}
                key={card._id}
                onCardLike={props.onCardLike}
                onCardClick={props.onCardClick}
                onCardDelete={props.onCardDelete}
              />
            ))}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Main;
