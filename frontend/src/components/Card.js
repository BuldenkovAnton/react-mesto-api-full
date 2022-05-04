import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `like__button ${
    isLiked ? "like__button_active" : ""
  }`;

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleDelete() {
    props.onCardDelete(props.card._id);
  }

  return (
    <article className="element">
      <a className="element__show-link" onClick={handleClick}>
        <img
          className="element__img"
          src={props.card.link}
          alt={props.card.name}
        />
      </a>
      {isOwn && (
        <button
          type="button"
          className="element__trash trash"
          onClick={handleDelete}
          title="Удалить карточку"
        ></button>
      )}
      <div className="element__group">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like like">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            title="Поставить лайк"
          ></button>
          <span className="like__count">{props.card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;
