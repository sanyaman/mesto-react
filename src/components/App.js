import React, { useState, useEffect } from 'react';
import '../index.css';
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import AddPlacePopup from './AddPlacePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import DeleteCardPopup from './DeleteCardPopup';
import ImagePopup from './ImagePopup.js';
import { api } from '../utils/Api.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'


function App() {

  function handleEditAvatarClick() {
    setAvatarPopup(true);
  }
  function handleEditProfileClick() {
    setProfilePopup(true);
  }
  function handleAddPlaceClick() {
    setAddPopup(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card, isLiked) {
    api.toggleLike(isLiked, card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log('Ошибка:', err))
  }
  function confirmDelete() {
    setIsLoading(true)
    api.removeCard(isConfirmed)
      .then(() => {
        setCards(state => state.filter((c) => c._id !== isConfirmed));
      })
      .catch((err) => console.log('Ошибка:', err))
      .finally(() => {
        setIsLoading(false)
        setDeletePopup(false);
      })
  }

  function handleCardDelete(id) {
    setDeletePopup(true)
    setIsConfirmed(id)
  }

  function handleUpdateUser(user) {
    setIsLoading(true)
    api.setUserData(user)
      .then((newUser) => {
        setCurrentUser(newUser);
        setProfilePopup(false);
      })
      .catch((err) => console.log('Ошибка:', err))
      .finally(() => setIsLoading(false))
  }

  function handleUpdateAvatar(link) {
    setIsLoading(true)
    api.setUserAvatar(link)
      .then((newUser) => {
        setCurrentUser(newUser);
        setAvatarPopup(false);
      })
      .catch((err) => console.log('Ошибка:', err))
      .finally(() => setIsLoading(false))
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true)
    api.uploadCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setAddPopup(false);
      })
      .catch((err) => console.log('Ошибка:', err))
      .finally(() => setIsLoading(false))
  }

  function closeAllPopups() {
    setAvatarPopup(false);
    setProfilePopup(false);
    setAddPopup(false);
    setDeletePopup(false);
    setSelectedCard({});
  }

  const [isConfirmed, setIsConfirmed] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEditProfilePopupOpen, setProfilePopup] = useState(false);
  const [isAddPlacePopupOpen, setAddPopup] = useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopup] = useState(false);
  const [isDeletePopupOpen, setDeletePopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState({})
  const [currentUser, setCurrentUser] = useState(
    {
      name: "Жак",
      about: "Доширак",  
    });
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([{ name, about, avatar, _id }, cardList]) => {
        setCurrentUser({ name, about, avatar, _id })
        setCards(cardList)
      }
      )
      .catch((err) => console.log('Ошибка:', err))
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />

      <Main
        cards={cards}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onEditProfile={handleEditProfileClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
      />

      <Footer />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        isLoading={isLoading}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        isLoading={isLoading}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        isLoading={isLoading}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <DeleteCardPopup
        isOpen={isDeletePopupOpen}
        isLoading={isLoading}
        onClose={closeAllPopups}
        onDeleteCard={confirmDelete}
      />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
