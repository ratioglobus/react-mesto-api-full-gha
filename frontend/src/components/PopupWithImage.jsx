import React from 'react';

export default function PopupWithImage({ isOpen, card, onClose }) {
    return (
      <div className={`popup popup-image popup_background_dark ${isOpen ? 'popup_opened' : ''}`}>
        <div className='popup-image__container'>
            <img src={card.link} alt={card.name} className='popup-image__img'/>
            <p className='popup-image__about'>{card.name}</p>
          <button type='button' className='popup__close-button popup-image__close-button' onClick={onClose}></button>
        </div>
      </div>
    );
}
