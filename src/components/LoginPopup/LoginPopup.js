import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";


function LoginPopup (props) {
    const [email , setEmail] = React.useState('');
    const [emailIsValid , setEmailIsValid ] = React.useState(false);
    const [emailErrorMessage , setEmailErrorMessage ] = React.useState('');

    const [password , setPassword] = React.useState('');
    const [passwordIsValid , setPasswordIsValid ] = React.useState(false);
    const [passwordErrorMessage , setPasswordErrorMessage ] = React.useState('');

    function handleEmailChange(evt) {
        setEmail(evt.target.value)
        setEmailErrorMessage(evt.target.validationMessage);
        setEmailIsValid(evt.target.validationMessage ? false : true)
    }

    function handlePasswordChange(evt) {
        setPassword(evt.target.value)
        setPasswordErrorMessage(evt.target.validationMessage);
        setPasswordIsValid(evt.target.validationMessage ? false : true)
    }

    function resetAllInput () {
        setEmail('');
        setPassword('');
    }

    function handleSubmit(evt) {
        // Запрещаем браузеру переходить по адресу формы
        // evt.preventDefault();
        props.handleLogin() //Временное решение авторизации, переделать

        resetAllInput();
        props.onClose(); //удалить
    }

    return (
        <PopupWithForm name="login"
                       title="Вход"
                       buttonText="Войти"
                       switchModal='Зарегистрироваться'
                       isOpen={props.isOpen ? 'modal_open' : ''}
                       onSubmit={handleSubmit}
                       onClose ={props.onClose}
                       openNewPopup={props.openNewPopup}
                       submitIsValid={!emailIsValid || !passwordIsValid}
                       children={
            <>
                <p className='modal-title'>Email</p>
                <input type="email" name="email" className="modal__input modal__input-email"
                       placeholder="Введите почту" required autoComplete="off" value={email} onChange={handleEmailChange}/>
                <span className={`modal__error ${!emailIsValid ? 'modal__error_visible' : '' }`} id="email-error">{emailErrorMessage}</span>

                <p className='modal-title  modal-title-password'>Пароль</p>
                <input type="password" name="password" className="modal__input"
                       placeholder="Введите пароль" required autoComplete="off" value={password} onChange={handlePasswordChange}/>
                <span className={`modal__error ${!passwordIsValid ? 'modal__error_visible' : '' }`} id="urlAvatar-error">{passwordErrorMessage}</span>
            </>
        }
        />
    );
}

export default LoginPopup ;