function PopupWithForm(props) {
  const isOpen = props.isOpen ? "popup_opened" : "";
  const disabledClass = `form__save popup__button  ${
    props.disabled && "popup__button_disabled"
  }`;

  return (
    <div className={`popup page__popup popup_type_${props.name} ${isOpen}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          title="Закрыть"
          onClick={props.onClose}
        ></button>
        <form
          name={props.name}
          className="form popup__form"
          onSubmit={props.onSubmit}
          noValidate
        >
          <h3 className="form__title">{props.title}</h3>
          {props.children}

          <button
            type="submit"
            className={disabledClass}
            disabled={props.disabled}
          >
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
