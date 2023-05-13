import React, { useState } from "react";
import "../index.css";
import Header from "./Header.js"
import Main from "./Main.js"
import Footer from "./Footer.js"
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";


function App() {

  function handleEditAvatarClick() {
    setIsAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPopupOpen(true);
  }

  function handleCardClick(card) {
    setIsSelectedCard(card);
  }

  function closeAllPopups() {
    setIsAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPopupOpen(false);
    setIsSelectedCard({});
  }

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setIsSelectedCard] = React.useState({})


  return (
    <>
      <Header />

      <Main
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onEditProfile={handleEditProfileClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm
        name="add"
        title="Новое место"
        isOpen={isAddPlacePopupOpen ? "popup_opened" : ""}
        onClose={closeAllPopups}
        buttonText="Добавить"
      >
        <fieldset className="popup__field popup__field-add">
          <input type="text" name="name" id="input-placename" placeholder="Подпись к картинке" className="popup__fill popup__fill_value_title" required minLength="2" maxLength="30" />
          <span className="popup__fill-error" id="input-placename-error" />
          <input type="url" name="link" id="input-placelink" placeholder="Ссылка на картинку" className="popup__fill popup__fill_value_image" required />
          <span className="popup__fill-error" id="input-placelink-error" />
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        name="edit"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen ? "popup_opened" : ""}
        onClose={closeAllPopups}
        buttonText="Сохранить"
      >
        <fieldset className="popup__field popup__field-edit">
          <input type="text" name="name" id="input-username" placeholder="Имя профиля" className="popup__fill popup__fill_value_name" required minLength="2" maxLength="40" />
          <span className="popup__fill-error" id="input-username-error" />
          <input type="text" name="about" id="input-useractivity" placeholder="Информация профиля" className="popup__fill popup__fill_value_description" required minLength="2" maxLength="200" />
          <span className="popup__fill-error" id="input-useractivity-error" />
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        name="profile"
        title="Обновить Аватар"
        isOpen={isEditAvatarPopupOpen ? "popup_opened" : ""}
        onClose={closeAllPopups}
        buttonText="Обновить"
      >
        <fieldset className="popup__field popup__field-profile">
          <input type="url" name="link" id="input-avatarlink" placeholder="Ссылка на Картинку" className="popup__fill popup__fill_value_profile" required />
          <span className="popup__fill-error" id="input-avatarlink-error" />
        </fieldset>
      </PopupWithForm>

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
    </>
  );
}

export default App;

