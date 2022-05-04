import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const inputRef = React.useRef();
  const [buttonText, setButtonText] = React.useState("Сохранить");

  React.useEffect(() => {
    setButtonText(props.isLoading ? "Сохранение..." : "Сохранить");
  }, [props.isLoading]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    });

    inputRef.current.value = "";
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="change-avatar"
      disabled={false}
      onSubmit={handleSubmit}
      buttonText={buttonText}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <label className="form__label" htmlFor="avatar-input">
        <input
          className="form__input form__input_value_avatar popup__input"
          type="url"
          name="avatar"
          id="avatar-input"
          placeholder="Ссылка на аватар пользователя"
          ref={inputRef}
          required
        />
        <span className="form__input-error avatar-input-error popup__error popup__error_visible popup__error_visible"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
