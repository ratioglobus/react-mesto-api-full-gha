import { Link } from 'react-router-dom'

export default function Header ({ className, email, address, text, onClick }) {
  return (
    <header className={`header ${className || ''}`}>
      <div className='header__logo'></div>
      <div className='header__content'>
        <p className='header__text-email'>{email}</p>

        <Link
          className='header__text-link'
          to={address}
          onClick={onClick}>
          {text}
        </Link>

      </div>
    </header>
  )
}
