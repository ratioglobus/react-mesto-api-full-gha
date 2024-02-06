import { useState, useEffect, useRef } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import avatar from '../images/potter.jpg';
import api from './../utils/api';
import authApi from '../utils/authApi';

import Main from './Main';
import Footer from './Footer';
import PopupWithImage from './PopupWithImage';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteConfirmPopup from './DeleteConfirmPopup';
import HandleEscClose from './HandleEscClose';
import HandleOverlayClose from './HandleOverlayClose';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import GoTop from './GoTop';


function App() {

  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setisImagePopupOpen] = useState(false);
  const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({name: '...', about: '...', avatar: avatar});
  const [cards, setCards] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [status, setStatus] = useState({ message: '', status: false });
  const [infoTooltipIsOpen, setInfoTooltipIsOpen] = useState(false);
  const [scrollPosition, setSrollPosition] = useState(0);
  const [showGoTop, setshowGoTop] = useState("goTopHidden");
  const navigate = useNavigate();
  const refScrollUp = useRef();


  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const token = localStorage.getItem('jwt')
      auth(token)
    }
  }, []);

  function auth(token) {
    authApi.getInfo(token)
      .then(() => {
        localStorage.setItem('loggedIn', JSON.stringify(true))
        setLoggedIn(true)
        navigate('/')
      })
      .catch(() => {
        localStorage.setItem('loggedIn', JSON.stringify(false))
      })
  }

  function handleLogin({ email, password }) {
    localStorage.setItem('email', email)
    setIsLoading(true)

    return authApi.authorize(email, password)
      .then(res => {
        if (res.token) {
          setLoggedIn(true)
          localStorage.setItem('jwt', res.token)
          localStorage.setItem('loggedIn', JSON.stringify(true))
          navigate('/')
        }
      })
      .catch(() => {
        setInfoTooltipIsOpen(true)
        setStatus({
          message: 'Неверный логин или пароль',
          status: false
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleRegister({ email, password }) {
    setIsLoading(true)
    return authApi.register(email, password)
      .then(() => {
        setStatus({ message: 'Вы успешно зарегистрировались!', status: true })
        navigate('/signin')
      })
      .catch(() => {
        setStatus({
          message: 'Что-то пошло не так! Попробуйте ещё раз.',
          status: false
        })
      })
      .finally(() => {
        setInfoTooltipIsOpen(true)
        setIsLoading(false)
      })
  }

  function onLogOut() {
    localStorage.clear()
    setLoggedIn(false)
  }

  useEffect(() => {
    if (loggedIn) {
      api.setAuthorizationHeader(localStorage.getItem('jwt'))
      Promise.all([api.getUserData(), api.getInitialCards()])
        .then(([person, cards]) => {
          setCurrentUser(person)
          setCards(cards)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [loggedIn]);

  const handleVisibleButton = () => {
    const position = window.scrollY;
    setSrollPosition(position);

    if (scrollPosition > 50) {
      return setshowGoTop("goTop");
    } else if (scrollPosition < 50) {
      return setshowGoTop("goTopHidden");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleVisibleButton);
  });

  const handleScrollUp = () => {
    refScrollUp.current.scrollIntoView({ behavior: "smooth" });
  };

  function handleCardLike (card) {
    const isLiked = card.likes.some(i => i === currentUser._id)
    if (isLiked) {
      api
        .dislikeCard(card._id)
        .then(newCard => {
          setCards(state => state.map(c => (c._id === card._id ? newCard : c)))
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      api
        .likeCard(card._id)
        .then(newCard => {
          setCards(state => state.map(c => (c._id === card._id ? newCard : c)))
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  function handleCardDelete() {
    setIsLoading(true)
    const id = selectedCard._id
    api
      .deleteCard(id)
      .then(() => {
        setCards(cards => cards.filter(c => c._id !== id))
        closeAllPopups()
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleCardDeleteClick(card) {
    setSelectedCard(card);
    setIsDeleteConfirmPopupOpen(true);
  }

  function handleUpdateUser(userData) {
    api.setUserInfo(userData)
      .then(newUserData => setCurrentUser(newUserData))
      .then(() => closeAllPopups())
      .catch(err => console.error(err));
  }

  function handleUpdateAvatar(newAvatar) {
    api.changeUserAvatar(newAvatar)
      .then(newUserData => setCurrentUser(newUserData))
      .then(() => closeAllPopups())
      .catch(err => console.error(err));
  }

  function handleAddPlace(card) {
    api.setNewCard(card)
      .then(newCard => setCards([newCard, ...cards]))
      .then(() => closeAllPopups())
      .catch(err => console.error(err));
  }

  function handleEditAvatarClick() {
    setisEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setisEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setisAddPlacePopupOpen(true);
  }

  function handleCardClick(cardData) {
    setisImagePopupOpen(true);
    setSelectedCard(cardData);
  }

  function closeAllPopups() {
    setisEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setisEditAvatarPopupOpen(false);
    setisImagePopupOpen(false);
    setIsDeleteConfirmPopupOpen(false);
    setInfoTooltipIsOpen(false)
  }

  HandleOverlayClose(closeAllPopups);
  HandleEscClose(closeAllPopups);


  return (
    <CurrentUserContext.Provider value={currentUser}>

      <Routes>
          <Route path='/signin'
            element={<Login onLogin={handleLogin} isLoading={isLoading} />}
          />
          <Route path='/signup'
            element={
              <Register onRegister={handleRegister} isLoading={isLoading} />
            }
          />
          <Route path='/'
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <div ref={refScrollUp}> </div>
                <Main
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLikeClick={handleCardLike}
                  onDelete={handleCardDeleteClick}
                  cards={cards}
                  onLogOut={onLogOut}
                  email={localStorage.getItem('email')}
                />
                <GoTop showGoTop={showGoTop} scrollUp={handleScrollUp} />
              </ProtectedRoute>
            }
          />

          <Route
            path='*'
            element={
              loggedIn ? <Navigate to='/' /> : <Navigate to='/signin' />
            }
          />
      </Routes>

      {loggedIn && <Footer />}

      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>

      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace}/>

      <DeleteConfirmPopup isOpen={isDeleteConfirmPopupOpen} onClose={closeAllPopups} onDelete={handleCardDelete}/>

      <PopupWithImage isOpen={isImagePopupOpen} onClose={closeAllPopups} card={selectedCard}/>

      <InfoTooltip isOpen={infoTooltipIsOpen} onClose={closeAllPopups} status={status} />

  </CurrentUserContext.Provider>
  )
}

export default App;
