import React from 'react';

export default function PopupWithForm({ isOpen, onClose, popupFormName, title, name, children, buttonText, onSubmit }) {
    return (
    <div className={`popup popup-${name} ${isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
            <button type="button" className="popup__close-button popup-newAvatar__close-button" onClick={onClose}></button>
            <h3 className="popup__title">{title}</h3>
            <form noValidate action="#"  id={popupFormName} className="popup__form popup-newAvatar__form" method="POST" onSubmit={onSubmit} name={name}>
                {children} 
                <button type="submit" className="popup__save-button popup-newAvatar__save-button">{buttonText}</button>
            </form>
        </div>
    </div>
    )
}
