import React from "react";
import closeIcon from '../../images/clase-icon.svg'

function PopupWithForm (props) {
    // временное решение ошибки сервера
    const [errorServer , setErrorServer ] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('')

    function serverErrorEnabled (evt) {
        evt.preventDefault();
        setErrorServer(true);
        setErrorMessage('Такой пользователь уже есть')

        return setTimeout(serverErrorDisabled, 3000)
    }

    function serverErrorDisabled () {
        setErrorServer(false);
        setErrorMessage('')

        props.onSubmit();
    }//

    const errorServerClassButton = `${errorServer ? 'modal__button-save_error': ''}`; //Поправить на 3 этапе
    const buttonNoValid = `${props.submitIsValid ? 'modal__button-save_disabled' : 'modal__button-save_active' }`;
    const infoTooltip = `${props.name === "info" ? `_${props.name}` : '' }`;

    function changePopup() {
        props.onClose();
        props.openNewPopup();
    }

    return (
        <div className={`modal modal_${props.name} ${props.isOpen}`}>
            <div className="modal__shadow" onClick={props.onClose}/>
            <div className={`modal__container modal__container${infoTooltip}`}>
                <button type="button" className="modal__close-button" onClick={props.onClose}>
                    <img className="modal__close" src={closeIcon} alt="Кнопка_выхода"/>
                </button>
                <h2 className={`modal__title modal__title${infoTooltip}`}>{props.title}</h2>
                {props.name !== "info" ?
                    <>
                        <form action="#" name={props.name} className="modal__field" onSubmit={props.name === "login" ? serverErrorEnabled : props.onSubmit} noValidate>
                            {props.children}
                            <span className={`modal__button-error ${errorServer ? 'modal__button-error_visible' : '' }`} id="buttonSave-error">{errorMessage}</span>
                            <button type="submit" className={`modal__button-save ${buttonNoValid} ${errorServerClassButton} `} disabled={props.submitIsValid}>{props.buttonText}
                            </button>
                        </form>
                        <p className="modal__subtitle">или <button type="button" className='modal__button-switch' onClick={changePopup}>{props.switchModal}</button></p>
                    </>
                :
                    <button type="button" className={`modal__button-switch modal__button-switch${infoTooltip}`} onClick={changePopup}>{props.switchModal}</button>
                }

            </div>
        </div>
    );
}


export default PopupWithForm ;