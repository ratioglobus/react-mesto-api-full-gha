import React from 'react';
import Header from './Header';

export default function Login({ onLogin, isLoading }) {
  
  const [inputData, setInputData] = React.useState({ email: '', password: '' })

  function handleChangeEmail(event) {
    setInputData({ email: event.target.value, password: inputData.password })
  };

  function handleChangePassword(event) {
    setInputData({ email: inputData.email, password: event.target.value })
  };

  function handleSubmit(event) {
    event.preventDefault()
    onLogin(inputData)
  };

  return (
    <>
      <Header address={'/react-mesto-auth/sign-up'} text={'Регистрация'} />
      <main className='content'>
        <form
          action='#'
          className='form'
          method='POST'
          id={'loginForm'}
          name={'loginForm'}
          onSubmit={handleSubmit}
        >
          <h2 className='form__title'>Вход</h2>
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
            form={'loginForm'}
            className='form__button'
          >
          {isLoading ? 'Вход...' : 'Войти'}
          </button>
        </form>
      </main>
    </>
  )
}
