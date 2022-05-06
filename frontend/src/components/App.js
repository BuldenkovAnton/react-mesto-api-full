import React from "react";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import getCookie from "../utils/cookie";

import Header from "./Header";
import Main from "./Main";
import Register from "./Register";
import Login from "./Login";
import InfoToolTip from "./InfoToolTip";

import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePlacePopup from "./DeletePlacePopup";
import ImagePopup from "./ImagePopup";
import ProtectedRoute from "./ProtectedRoute";

function App(props) {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [currentUser, setCurrentUser] = React.useState({
    _id: "",
    name: "",
    about: "",
    avatar: "",
  });

  const [cards, setCards] = React.useState([]);

  const [isAuthResultPopupOpen, setIsAuthResultPopupOpen] =
    React.useState(false);
  const [authResultStatus, setAuthResultStatus] = React.useState(false);
  const [authResultMessage, setAuthResultMessage] = React.useState("");

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  const [deleteCardId, setDeleteCardId] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);

  const history = useHistory();

  React.useEffect(() => {
    tokenCheck()
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      loadData().then(() => history.push("/"));
    }
  }, [loggedIn]);

  function handleCardDelete(cardId) {
    setIsLoading(true);

    api
      .deleteCard(cardId)
      .then((user) => {
        const filteredCards = cards.filter((card) => card._id !== cardId);
        setCards(filteredCards);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(true);

    api
      .setUserInfo(name, about)
      .then((user) => {
        setCurrentUser({
          _id: user._id,
          name: user.name,
          about: user.about,
          avatar: user.avatar,
        });
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);

    api
      .setUserAvatar(avatar)
      .then((user) => {
        setCurrentUser({
          _id: user._id,
          name: user.name,
          about: user.about,
          avatar: user.avatar,
        });
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit({ name, link }) {
    setIsLoading(true);

    api
      .createCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleDeletePlaceClick(cardId) {
    setDeleteCardId(cardId);
    setIsDeletePlacePopupOpen(!isDeletePlacePopupOpen);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePlacePopupOpen(false);
    setSelectedCard({ name: "", link: "" });

    setIsAuthResultPopupOpen(false);
  }

  function handleRegister({ email, password }) {
    setIsLoading(true);

    return api
      .register(email, password)
      .then((response) => {
        history.push("/sign-in");
      })
      .catch((errorCode) => {
        let message = "Что-то пошло не так! Попробуйте еще раз!";
        if (errorCode === 400) message = "Некорректно заполнено одно из полей";
        if (errorCode === 409) message = "Пользователь уже зарегистрирован с такой почтой";

        setAuthResultStatus(false);
        setIsAuthResultPopupOpen(true);
        setAuthResultMessage(message);
      })
      .finally(() => setIsLoading(false));
  }

  function handleLogin({ email, password }) {
    setIsLoading(true);

    return api
      .authorize(email, password)
      .then((message) => {
        tokenCheck();
      })
      .catch((errorCode) => {
        let message = "";

        switch (errorCode) {
          case 400:
            message = "Не передано одно из полей";
            break;
          case 401:
            message = "Неправильные почта или пароль";
            break;
          default:
            message = "Что-то пошло не так! Попробуйте еще раз!";  
        }

        setAuthResultStatus(false);
        setIsAuthResultPopupOpen(true);
        setAuthResultMessage(message);
      })
      .finally(() => setIsLoading(false));
  }

  function onSignOut() {
    return api
    .logout()
    .then((message) => {
      setLoggedIn(false);
      history.push("/signin");
    })
  }

  function tokenCheck() {
    if (getCookie('jwtToken')) {
      return api
      .checkMe()
      .then((user) => {
        setEmail(user.email);
        setLoggedIn(true);
      })
      .catch((errorCode) => {
        let message = "";

        switch (errorCode) {
          case 401:
            message = "Необходима авторизация";
            break;
          default:
            message = "Что-то пошло не так! Попробуйте еще раз!";
        }

      console.log(message);
      });
    }
}

  function loadData() {
    return Promise.all([api.getUserInfo(), api.getCardList()])
      .then(([userInfo, cardList]) => {
        setCurrentUser({
          _id: userInfo._id,
          name: userInfo.name,
          about: userInfo.about,
          avatar: userInfo.avatar,
        });
        setCards(cardList);
      })
      .catch((error) => console.log(error));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Switch>
          <Route path="/sign-up">
            <Header
              loggedIn={loggedIn}
              changeLoggedIn={setLoggedIn}
              onSignOut={onSignOut}
              email={email}
            >
              <Link className="link header__link" to="/sign-in">
                Войти
              </Link>
            </Header>
            <Register isLoading={isLoading} onSubmit={handleRegister} />
          </Route>

          <Route path="/sign-in">
            <Header
              loggedIn={loggedIn}
              changeLoggedIn={setLoggedIn}
              onSignOut={onSignOut}
              email={email}
            >
              <Link className="link header__link" to="/sign-up">
                Регистрация
              </Link>
            </Header>
            <Login isLoading={isLoading} onSubmit={handleLogin} />
          </Route>

          <ProtectedRoute
            path="/"
            loggedIn={loggedIn}
            changeLoggedIn={setLoggedIn}
            onSignOut={onSignOut}
            email={email}
            component={Main}
            cards={cards}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleDeletePlaceClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
          />
        </Switch>
      </div>

      <InfoToolTip
        isOpen={isAuthResultPopupOpen}
        isSuccess={authResultStatus}
        message={authResultMessage}
        onClose={closeAllPopups}
      />

      <EditProfilePopup
        isLoading={isLoading}
        onUpdateUser={handleUpdateUser}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      />

      <EditAvatarPopup
        isLoading={isLoading}
        onUpdateAvatar={handleUpdateAvatar}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      />

      <AddPlacePopup
        isLoading={isLoading}
        onUpdateCard={handleAddPlaceSubmit}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      />

      <DeletePlacePopup
        isLoading={isLoading}
        cardId={deleteCardId}
        onDeleteCard={handleCardDelete}
        isOpen={isDeletePlacePopupOpen}
        onClose={closeAllPopups}
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;
