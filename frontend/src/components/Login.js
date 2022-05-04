import React from "react";

function Login({ onSubmit, isLoading }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function onLogin(e) {
    e.preventDefault();

    onSubmit({ email, password });
  }

  return (
    <main className="main page__main">
      <form
        name="register"
        className="form form_component_auth"
        onSubmit={onLogin}
        noValidate
      >
        <fieldset className="form__fieldset form__fieldset_component_auth">
          <h3 className="form__title form__title_type_auth">Вход</h3>
          <label className="form__label" htmlFor="email">
            <input
              className="form__input form__input_value_email form__input_component_auth"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={handleEmailChange}
              required
            />
          </label>
          <label className="form__label" htmlFor="password">
            <input
              className="form__input form__input_value_password form__input_component_auth"
              type="password"
              name="password"
              id="password"
              placeholder="Пароль"
              onChange={handlePasswordChange}
              required
            />
          </label>
        </fieldset>

        <fieldset className="form__fieldset form__fieldset_component_auth">
          <button
            type="submit"
            className="form__save form__save_component_auth"
          >
            {isLoading ? "Проверяю..." : "Войти"}
          </button>
        </fieldset>
      </form>
    </main>
  );
}

export default Login;
