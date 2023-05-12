function Card({ card, onCardClick }) {

  function handleClick() {
    onCardClick(card)
  }

  return (
    <li className="element__item-grid">
      <img onClick={handleClick} className="element__image-grid" alt={card.name} src={card.link} />
      <button
        className="element__delete-buttone"
        type="button"
        aria-label="корзина"
      ></button>
      <div className="element__info-grid">
        <h2 className="element__title-grid" >{card.name}</h2>
        <label className="element__like-label">
          <button
            className="element__like-buttone"
            type="button"
            aria-label="лайк"
          ></button>
          <span className="element__counter">{card.likes.length}</span>
        </label>
      </div>
    </li>
  );
}







export default Card
