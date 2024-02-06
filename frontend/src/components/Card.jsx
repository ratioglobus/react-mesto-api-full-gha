import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card({ item, onCardClick, onCardLikeClick, onDeleteClick }) {

    function handleClick() {
        onCardClick(item);
    }

    function handleLikeClick () {
      onCardLikeClick(item)
    }

    function handleDeleteClick () {
      onDeleteClick(item);
    }

    const currentUser = React.useContext(CurrentUserContext)
    const isOwn = item.owner === currentUser._id
    const isLiked = item.likes.some(i => i === currentUser._id)
    const cardLikeButtonClassName =
    `elements__like-button ${
      isLiked && 'elements__like-button_active'
    }`

    return (
        <section className="elements">
          <div className="elements__item">
            <img src={item.link} alt={item.name} className='elements__photo' onClick={handleClick} />
            <div className="elements__content">
              <h2 className="elements__place">{item.name}</h2>
              <div className="elements__likes">
                <button
                  type="button"
                  // className={`elements__like-button ${isLiked && 'elements__like-button_active'}`}
                  className={cardLikeButtonClassName}
                  onClick={handleLikeClick}
                />
                <p className="elements__likes-count">{item.likes.length}</p>
              </div>
            </div>
            {isOwn && (
              <button type='button' className='elements__delete' onClick={handleDeleteClick}></button>
            )}
          </div>
      </section>
    )
}
