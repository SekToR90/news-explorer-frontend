import React from 'react';

function PopupWithForm(props) {
  const buttonNoValid = `${props.submitIsValid ? 'modal__button-save_disabled' : 'modal__button-save_active'}`;
  const infoTooltip = `${props.name === 'info' ? `_${props.name}` : ''}`;

  function changePopup() {
    props.onClose();
    props.openNewPopup();
  }

  return (
    <div className={`modal modal_${props.name} ${props.isOpen}`}>
      <div className="modal__shadow" onClick={props.onClose} />
      <div className={`modal__container modal__container${infoTooltip}`}>
        <div type="button" className="modal__close-button" onClick={props.onClose}>
          <div className="modal__close" />
        </div>
        <h2 className={`modal__title modal__title${infoTooltip}`}>{props.title}</h2>
        {props.name !== 'info' ? (
          <>
            <form action="#" name={props.name} className="modal__field" onSubmit={props.onSubmit} noValidate>
              {props.children}
              <button
                type="submit"
                className={`modal__button-save ${buttonNoValid} ${props.errorServerClassButton} `}
                disabled={props.submitIsValid}
              >
                {props.buttonText}
              </button>
            </form>
            <p className="modal__subtitle">
              или{' '}
              <button type="button" className="modal__button-switch" onClick={changePopup}>
                {props.switchModal}
              </button>
            </p>
          </>
        ) : (
          <button
            type="button"
            className={`modal__button-switch modal__button-switch${infoTooltip}`}
            onClick={changePopup}
          >
            {props.switchModal}
          </button>
        )}
      </div>
    </div>
  );
}

export default PopupWithForm;
