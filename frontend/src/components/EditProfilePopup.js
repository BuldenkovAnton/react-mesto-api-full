import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [buttonText, setButtonText] = React.useState("Сохранить");

  const [nameDirty, setNameDirty] = React.useState(false);
  const [descriptionDirty, setDescriptionDirty] = React.useState(false);
  const [nameError, setNameError] = React.useState("");
  const [descriptionError, setDescriptionError] = React.useState("");
  const [validForm, setValidForm] = React.useState(false);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    setNameDirty(false);
    setDescriptionDirty(false);
  }, [currentUser, props.isOpen]);

  React.useEffect(() => {
    if (nameError || descriptionError) {
      setValidForm(false);
    } else {
      setValidForm(true);
    }
  }, [nameError, descriptionError]);

  function handleNameChange(e) {
    const newName = e.target.value;
    setName(newName);

    if (newName.length === 0) {
      setNameError("Название не может быть пустым");
    } else if (newName.length < 2 || newName.length > 40) {
      setNameError("Название должно содержать от 2 до 40 символов");
    } else {
      setNameError("");
    }
  }

  function handleDescriptionChange(e) {
    const newDescription = e.target.value;
    setDescription(newDescription);

    if (newDescription.length === 0) {
      setDescriptionError("Описание не может быть пустым");
    } else if (newDescription.length < 2 || newDescription.length > 200) {
      setDescriptionError("Описание должно содержать от 2 до 200 символов");
    } else {
      setDescriptionError("");
    }
  }

  function handleBlur(e) {
    switch (e.target.name) {
      case "avtorName":
        setNameDirty(true);
        break;
      case "avtorJob":
        setDescriptionDirty(true);
        break;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      disabled={!validForm}
      buttonText={props.isLoading ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <label className="form__label" htmlFor="avtor-name-input">
        <input
          className="form__input form__input_value_title popup__input"
          type="text"
          name="avtorName"
          id="avtor-name-input"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          onBlur={handleBlur}
          onChange={handleNameChange}
          value={name || ""}
          required
        />
        {nameDirty && nameError && (
          <span className="form__input-error avtor-name-input-error popup__error popup__error_visible">
            {nameError}
          </span>
        )}
      </label>
      <label className="form__label" htmlFor="avtor-job-input">
        <input
          className="form__input form__input_value_job popup__input"
          type="text"
          name="avtorJob"
          id="avtor-job-input"
          placeholder="Работа"
          minLength="2"
          maxLength="200"
          onBlur={handleBlur}
          onChange={handleDescriptionChange}
          value={description || ""}
          required
        />
        {descriptionDirty && descriptionError && (
          <span className="form__input-error avtor-job-input-error popup__error popup__error_visible">
            {descriptionError}
          </span>
        )}
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
