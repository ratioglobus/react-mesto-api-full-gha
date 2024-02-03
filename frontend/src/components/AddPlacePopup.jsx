import { useState } from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [namenewimage, setName] = useState('');
  const [linknewimage, setLink] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    onAddPlace({ namenewimage, linknewimage });
    setName("");
    setLink("");
  };

  return (
    <PopupWithForm
      title='Новое место'
      name='addimage-form'
      buttonText='Создать'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="namenewimage"
        name="namenewimage"
        className="popup__input popup__input_value_name-addimage"
        placeholder="Название"
        minLength={2}
        maxLength={30}
        autoComplete="off"
        required=""
        value={namenewimage || ''}
        onChange={event => setName(event.target.value)}
      />
      <span id="error-namenewimage" className="popup__error-message"/>
      <input
        type="url"
        id="linknewimage"
        name="linknewimage"
        className="popup__input popup__input_value_link-addimage"
        placeholder="Ссылка на картинку"
        autoComplete="off"
        required=""
        value={linknewimage || ''}
        onChange={event => setLink(event.target.value)}
      />
     <span id="error-linknewimage" className="popup__error-message" />
    </PopupWithForm>
  );
}
