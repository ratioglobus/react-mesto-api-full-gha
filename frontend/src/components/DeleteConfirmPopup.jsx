import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function DeleteConfirmPopup({ isOpen, onClose, onConfirm }) {

  return (
    <PopupWithForm
        title='Вы уверены?'
        name='deleteConfirm-form'
        buttonText='Да'
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onConfirm}
    ></PopupWithForm>
  );
}
