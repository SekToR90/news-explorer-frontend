import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function InfoTooltip (props) {
    return (
        <PopupWithForm name="info"
                       title="Пользователь успешно зарегистрирован!"
                       switchModal="Войти"
                       openNewPopup={props.openNewPopup}
                       isOpen={props.isOpen ? 'modal_open' : ''}
                       onClose ={props.onClose}
        />
    );
}

export default InfoTooltip ;