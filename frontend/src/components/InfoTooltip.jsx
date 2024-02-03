import iconDone from '../images/icon-success.svg';
import iconError from '../images/icon-fail.svg';

export default function InfoTooltip ({ isOpen, status, onClose}) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__container'>
        <button
          type='button'
          className={`popup__close-button`}
          onClick={onClose}
        />

        {status.status === true && <img src={iconDone} className='popup__picture' alt='Успешно'/>}
        {status.status === false && (
          <img src={iconError} className='popup__picture' alt='Ошибка' />
        )}

        {status.status === true && (
          <h3 className='popup__caption'>{status.message}</h3>
        )}
        {status.status === false && (
          <h3 className='popup__caption'>{status.message}</h3>
        )}
      </div>
    </div>
  )
}
