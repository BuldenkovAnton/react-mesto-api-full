import React from "react";
import { Link } from "react-router-dom";

function Register({ onSubmit, isLoading }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailDirty, setEmailDirty] = React.useState(false);
  const [passwordDirty, setPasswordDirty] = React.useState(false);
  const [emailError, setEmailError] = React.useState(
    "Email не может быть пустым"
  );
  const [passwordError, setPasswordError] = React.useState(
    "Пароль не может быть пустым"
  );

  function handleEmailChange(e) {
    const newEmail = e.target.value;
    setEmail(newEmail);

    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (newEmail.length === 0) {
      setEmailError("Email не может быть пустым");
    } else if (!reg.test(String(newEmail).toLowerCase())) {
      setEmailError("Email не корректный");
    } else {
      setEmailError("");
    }
  }

  function handlePasswordChange(e) {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (newPassword.length === 0) {
      setPasswordError("Пароль не может быть пустым");
    } else if (!reg.test(String(newPassword).toLowerCase())) {
      setPasswordError(
        "Пароль должен содержать хотя бы одну цифру, заглавную букву и специальный символ. Количество символов от 6 до 16."
      );
    } else {
      setPasswordError("");
    }
  }

  function handleBlur(e) {
    switch (e.target.name) {
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
    }
  }

  function onRegister(e) {
    e.preventDefault();

    onSubmit({ email, password });
  }

  return (
    <main className="main page__main">
      <form
        name="register"
        className="form form_component_auth"
        onSubmit={onRegister}
        noValidate
      >
        <fieldset className="form__fieldset form__fieldset_component_auth">
          <h3 className="form__title form__title_type_auth">Регистрация</h3>
          <label className="form__label" htmlFor="email">
            <input
              className="form__input form__input_value_email form__input_component_auth"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={handleEmailChange}
              onBlur={handleBlur}
              required
            />
            {emailDirty && emailError && (
              <span className="form__input-error email-error">
                {emailError}
              </span>
            )}
          </label>
          <label className="form__label" htmlFor="password">
            <input
              className="form__input form__input_value_password form__input_component_auth"
              type="password"
              name="password"
              id="password"
              placeholder="Пароль"
              onChange={handlePasswordChange}
              onBlur={handleBlur}
              required
            />
            {passwordDirty && passwordError && (
              <span className="form__input-error password-error">
                {passwordError}
              </span>
            )}
          </label>
        </fieldset>

        <fieldset className="form__fieldset form__fieldset_component_auth">
          <button
            type="submit"
            className="form__save form__save_component_auth"
          >
            {isLoading ? "Регистрация..." : "Зарегистрироваться"}
          </button>
          <p className="form__text">
            Уже зарегистрированы?{" "}
            <Link className="link form__link" to="/sign-in">
              Войти
            </Link>
          </p>
        </fieldset>
      </form>
    </main>
  );
}

export default Register;
