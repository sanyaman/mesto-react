import defaultAvatar from "../images/image3.png"
import editAvatar from "../images/pencil.svg"
import Card from "../components/Card.js"
import { api } from "../utils/Api.js"
import React from "react";

function Main({ onEditAvatar, onAddPlace, onEditProfile, onCardClick }) {
  const [avatar, setAvatar] = React.useState(defaultAvatar);
  const [name, setName] = React.useState("Жак");
  const [about, setAbout] = React.useState("Доширак");
  const [cards, setCards] = React.useState([]);


  React.useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([{ name, about, avatar }, cardList]) => {
        setAvatar(avatar)
        setName(name)
        setAbout(about)
        setCards(cardList)
      })
      .catch((err) => console.log("Ошибка:", err))
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-pen" onClick={onEditAvatar}>
          <img src={avatar} alt="Акванутый" className="profile__avatar" />
        </div>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__title">{name}</h1>
            <p className="profile__subtitle">{about}</p>
          </div>
          <button onClick={onEditProfile} className="profile__button-edit" type="button" aria-label="Изменить" title="Редактировать Профиль" />
        </div>
        <button onClick={onAddPlace} className="profile__button-add" type="button" aria-label="Добавить" title="Добавить новое Фото" />
      </section>
      <ul className="element__grid">
        {cards.map((card) =>
          (<Card key={card._id} card={card} onCardClick={onCardClick} />))}
      </ul>
    </main >
  );
}

export default Main;
