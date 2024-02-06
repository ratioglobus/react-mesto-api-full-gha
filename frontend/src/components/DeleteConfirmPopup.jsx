import PopupWithForm from './PopupWithForm';

export default function DeleteConfirmPopup({ isOpen, onClose, onDelete }) {

  function handleSubmit (e) {
    e.preventDefault()
    onDelete()
  }
  return (
    <PopupWithForm
        title='Вы уверены?'
        name='deleteConfirm-form'
        buttonText='Да'
        isOpen={isOpen}
        onClose={onClose}
        // onSubmit={onConfirm}
        onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}
