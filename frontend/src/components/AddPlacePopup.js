import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");
  const [buttonText, setButtonText] = React.useState("Создать");

  const [nameDirty, setNameDirty] = React.useState(false);
  const [linkDirty, setLinkDirty] = React.useState(false);
  const [nameError, setNameError] = React.useState("");
  const [linkError, setLinkError] = React.useState("");
  const [validForm, setValidForm] = React.useState(false);

  React.useEffect(() => {
    setName("");
    setLink("");
    setNameDirty(false);
    setLinkDirty(false);
    setNameError("Название не может быть пустым");
    setLinkError("Ссылка не может быть пустой");
  }, [props.isOpen]);

  React.useEffect(() => {
    setButtonText(props.isLoading ? "Создание..." : "Создать");
  }, [props.isLoading]);

  React.useEffect(() => {
    if (nameError || linkError) {
      setValidForm(false);
    } else {
      setValidForm(true);
    }
  }, [nameError, linkError]);

  function handleNameChange(e) {
    const newName = e.target.value;
    setName(newName);

    if (newName.length === 0) {
      setNameError("Название не может быть пустым");
    } else if (newName.length < 2 || newName.length > 30) {
      setNameError("Название должно содержать от 2 до 30 символов");
    } else {
      setNameError("");
    }
  }

  function handleLinkChange(e) {
    const newLink = e.target.value;
    setLink(newLink);

    const reg =
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    if (newLink.length === 0) {
      setLinkError("Ссылка не может быть пустой");
    } else if (!reg.test(String(newLink).toLowerCase())) {
      setLinkError("Некорректная ссылка");
    } else {
      setLinkError("");
    }
  }

  function handleBlur(e) {
    switch (e.target.name) {
      case "cardName":
        setNameDirty(true);
        break;
      case "cardLink":
        setLinkDirty(true);
        break;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateCard({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="new-card"
      disabled={!validForm}
      buttonText={buttonText}
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <label className="form__label" htmlFor="card-name-input">
        <input
          className="form__input form__input_value_title popup__input"
          type="text"
          name="cardName"
          id="card-name-input"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          value={name}
          onBlur={handleBlur}
          onChange={handleNameChange}
          required
        />
        {nameDirty && nameError && (
          <span className="form__input-error card-name-input-error popup__error popup__error_visible">
            {nameError}
          </span>
        )}
      </label>
      <label className="form__label" htmlFor="card-link-input">
        <input
          className="form__input form__input_value_link popup__input"
          type="url"
          name="cardLink"
          id="card-link-input"
          placeholder="Ссылка на картинку"
          value={link}
          onBlur={handleBlur}
          onChange={handleLinkChange}
          required
        />
        {linkDirty && linkError && (
          <span className="form__input-error card-link-input-error popup__error popup__error_visible">
            {linkError}
          </span>
        )}
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
