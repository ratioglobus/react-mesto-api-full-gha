import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
  
    const currentUser = useContext(CurrentUserContext);
  
    function handleSubmit(event) {
      event.preventDefault();
  
      onUpdateUser({
        name,
        about: description
      });
    }
  
    useEffect(() => {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }, [currentUser, isOpen]);
  
    return (
      <PopupWithForm
        title='Редактировать профиль'
        name='profile-form'
        buttonText='Сохранить'
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          id="nameProfile"
          name="nameProfile"
          className="popup__input popup__input_value_name"
          placeholder="Введите имя"
          autoComplete="off"
          minLength={2}
          maxLength={40}
          value={name  || ''}
          onChange={event => setName(event.target.value)}
          required=""
        />
        <span id="error-nameProfile" className="popup__error-message"></span>
        <input
          id='about'
          className='popup__input popup__input_value_about'
          type='text'
          name='aboutProfile'
          minLength={2}
          maxLength={200}
          placeholder='О себе'
          value={description  || ''}
          onChange={event => setDescription(event.target.value)}
          required=""
        />
        <span id="error-aboutProfile" className="popup__error-message" />
      </PopupWithForm>
    );
  }
  