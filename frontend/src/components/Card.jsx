import React from 'react';
import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card({ cardData, onCardClick, onCardLike, onCardDelete }) {

    function handleClick() {
        onCardClick(cardData);
    }

    const { _id: currentUserId } = useContext(CurrentUserContext);
    const { name, likes, link, owner } = cardData;

    const isLiked = likes.some(like => like._id === currentUserId);
    const isOwn = owner._id === currentUserId;

    return (
        <section className="elements">
          <div className="elements__item">
            <img src={link} alt={name} className='elements__photo' onClick={handleClick} />
            <div className="elements__content">
              <h2 className="elements__place">{name}</h2>
              <div className="elements__likes">
                <button
                  type="button"
                  className={`elements__like-button ${isLiked && 'elements__like-button_active'}`}
                  onClick={() => onCardLike(cardData)}>
                </button>
                <p className="elements__likes-count">{likes.length}</p>
              </div>
            </div>
            {isOwn && (
              <button type='button' className='elements__delete' onClick={() => onCardDelete(cardData)}></button>
            )}
          </div>
      </section>
    )
}
