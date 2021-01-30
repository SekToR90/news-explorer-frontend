import React from "react";
import closeIcon from '../../images/clase-icon.svg'

function PopupWithForm (props) {
    // ременное решение ошибки сервера
    const [errorServer , setErrorServer ] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('')

    function serverErrorEnabled () {
        setErrorServer(true);
        setErrorMessage('Такой пользователь уже есть')

        return setTimeout(serverErrorDisabled, 4000)
    }

    function serverErrorDisabled () {

        setErrorServer(false);
        setErrorMessage('')

        props.onSubmit();
    }
    const errorServerClassButton = `${errorServer ? 'modal__button-save_error': ''}`;
    //

    return (
        <div className={`modal modal_${props.name} ${props.isOpen}`}>
            <div className="modal__container">
                <button type="button" className="modal__close-button" onClick={props.onClose}>
                    <img className="modal__close" src={closeIcon} alt="Кнопка_выхода"/>
                </button>
                <h2 className="modal__title">{props.title}</h2>
                <form action="#" name={props.name} className="modal__field" onSubmit={serverErrorEnabled} noValidate>
                    {props.children}
                    <span className={`modal__button-error ${errorServer ? 'modal__button-error_visible' : '' }`} id="buttonSave-error">{errorMessage}</span>
                    <button type="submit" className={`modal__button-save ${props.submitIsValid ? 'modal__button-save_disabled' : '' } ${errorServerClassButton}`} disabled={props.submitIsValid}>{props.buttonText}
                    </button>
                </form>
                <p className='modal__subtitle'>или <button type='submit' className='modal__button-switch'>{props.switchModal}</button></p>
            </div>
        </div>
    );
}


export default PopupWithForm ;