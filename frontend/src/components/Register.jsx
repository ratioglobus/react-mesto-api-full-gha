import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';


export default function Register ({ onRegister, isLoading }) {
  
  const [inputData, setInputData] = React.useState({ email: '', password: '' });

  function handleChangeEmail(event) {
    setInputData({ email: event.target.value, password: inputData.password })
  };

  function handleChangePassword(event) {
    setInputData({ email: inputData.email, password: event.target.value })
  };

  function handleSubmit(event) {
    event.preventDefault()
    onRegister(inputData)
  };

  return (
    <>
      <Header address={'/react-mesto-auth/sign-in'} text={'Войти'} />
      <main className='content'>
        <form
          action='#'
          className='form'
          method='POST'
          onSubmit={handleSubmit}
          id={'registerForm'}
          name={'registerForm'}
        >
          <h2 className='form__title'>Регистрация</h2>
          <input
            type='email'
            id='emailLoginInput'
            name='emailLoginInput'
            className='form__input'
            placeholder='Email'
            minLength='2'
            maxLength='64'
            autoComplete='off'
            value={inputData.email || ''}
            onChange={handleChangeEmail}
            required=""
          />
          <input
            type='password'
            id='passwordLoginInput'
            name='passwordLoginInput'
            className='form__input'
            placeholder='Пароль'
            minLength='2'
            maxLength='64'
            autoComplete='off'
            value={inputData.password || ''}
            onChange={handleChangePassword}
            required=""
          />
          <button
            type='submit'
            className='form__button'
            form={'registerForm'}
          >
          {isLoading ? 'Регистрация...' : 'Зарегистриваться'}
          </button>
          
          <Link to='/react-mesto-auth/sign-in' className='form__caption'>
            Уже зарегистрированы? Войти
          </Link>
        </form>
      </main>
    </>
  )
}
