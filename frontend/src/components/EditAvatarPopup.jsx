import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const inputRef = useRef();
  
    function handleSubmit(event) {
      event.preventDefault();
  
      onUpdateAvatar({
        linkNewAvatar: inputRef.current.value
      });
    }
  
    return (
      <PopupWithForm
        title='Обновить аватар'
        name="newAvatar-form"
        buttonText='Сохранить'
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <input
          ref={inputRef}
          id="linkNewAvatar"
          className="popup__input popup__input_value_link-newAvatar"
          type='url'
          name="linkNewAvatar"
          placeholder="Ссылка на картинку"
          required=""
        />
       <span className='popup__error-message' id='error-linkNewAvatar'></span>
      </PopupWithForm>
    );
  }
