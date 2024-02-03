import { React, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';
import Header from './Header';

export default function Main({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, 
    onCardLike, onCardDelete, email, onLogOut }) {

    const { name, about, avatar } = useContext(CurrentUserContext);

    return (
        <>
        <Header
            email={email}
            address={'/react-mesto-auth/sign-in'}
            onClick={onLogOut}
            text={'Выйти'}
        />
        <main className="content">
            <section className="profile">
                <div className="profile__avatar" onClick={onEditAvatar}>
                    <button type="button" className="profile__avatar-button" />
                <img
                    className="profile__avatar-img"
                    alt="Аватар профиля"
                    src={avatar}
                />
                </div>
                <div className="profile__author">
                <div className="profile__info">
                    <h1 className='profile__name'>{name}</h1>
                    <button type="button" className="profile__edit-button" onClick={onEditProfile}/>
                </div>
                <p className='profile__about'>{about}</p>
                </div>
                <button type="button" className="profile__add-button" onClick={onAddPlace}/>
            </section>

            <section className='elements__container'>
            <div className='elements'>
                {cards.map(item => {
                    return <Card 
                    key={item._id} 
                    cardData={item} 
                    onCardClick={onCardClick}
                    onCardLike={onCardLike}
                    onCardDelete={onCardDelete}/>;
                })}
                </div>
            </section>
        </main>
        </>
    )
}
