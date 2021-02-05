import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function RegisterPopup(props) {
  const [email, setEmail] = React.useState('');
  const [emailIsValid, setEmailIsValid] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');

  const [password, setPassword] = React.useState('');
  const [passwordIsValid, setPasswordIsValid] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

  const [name, setName] = React.useState('');
  const [nameIsValid, setNameIsValid] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
    setEmailErrorMessage(evt.target.validationMessage);
    setEmailIsValid(evt.target.validationMessage ? false : true);
  }

  function handleNameChange(evt) {
    setName(evt.target.value);
    setNameErrorMessage(evt.target.validationMessage);
    setNameIsValid(evt.target.validationMessage ? false : true);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
    setPasswordErrorMessage(evt.target.validationMessage);
    setPasswordIsValid(evt.target.validationMessage ? false : true);
  }

  function resetAllInput() {
    setEmail('');
    setPassword('');
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    resetAllInput();
    props.onClose(); //удалить
    props.openInfoTooltipPopup();
  }

  return (
    <PopupWithForm
      name="register"
      title="Регистрация"
      buttonText="Зарегистрироваться"
      switchModal="Войти"
      isOpen={props.isOpen ? 'modal_open' : ''}
      onSubmit={handleSubmit}
      onClose={props.onClose}
      openNewPopup={props.openNewPopup}
      submitIsValid={!emailIsValid || !passwordIsValid}
      children={
        <>
          <p className="modal-title">Email</p>
          <input
            type="email"
            name="email"
            className="modal__input modal__input-email"
            placeholder="Введите почту"
            required
            autoComplete="off"
            value={email}
            onChange={handleEmailChange}
          />
          <span className={`modal__error ${!emailIsValid ? 'modal__error_visible' : ''}`} id="email-error">
            {emailErrorMessage}
          </span>

          <p className="modal-title  modal-title-password">Пароль</p>
          <input
            type="password"
            name="password"
            className="modal__input"
            placeholder="Введите пароль"
            required
            autoComplete="off"
            value={password}
            minLength={8}
            onChange={handlePasswordChange}
          />
          <span className={`modal__error ${!passwordIsValid ? 'modal__error_visible' : ''}`} id="urlAvatar-error">
            {passwordErrorMessage}
          </span>

          <p className="modal-title  modal-title-name">Имя</p>
          <input
            type="text"
            name="name"
            className="modal__input"
            placeholder="Введите своё имя"
            required
            autoComplete="off"
            value={name}
            minLength={2}
            onChange={handleNameChange}
          />
          <span className={`modal__error ${!nameIsValid ? 'modal__error_visible' : ''}`} id="urlAvatar-error">
            {nameErrorMessage}
          </span>
        </>
      }
    />
  );
}

export default RegisterPopup;
