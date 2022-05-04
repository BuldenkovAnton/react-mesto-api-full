function ImagePopup(props) {
  const isOpen = props.card.link && "popup_opened";

  return (
    <div className={`popup page__popup popup_type_image ${isOpen}`}>
      <div className="popup__container popup__container_type_image">
        <button
          type="button"
          className="popup__close"
          title="Закрыть"
          onClick={props.onClose}
        ></button>
        <figure className="popup__figure">
          <img
            className="popup__image"
            src={props.card.link}
            alt={props.card.name}
          />
          <figcaption className="popup__figcaption">
            {props.card.name}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
