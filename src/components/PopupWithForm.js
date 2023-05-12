function PopupWithForm({ name, title, isOpen, onClose, children }) {
  return (
    <div className={`popup popup_${name} ${isOpen} `} aria-label={name}>
      <div className={`popup__container popup__container-${name}`}>
        <button onClick={onClose} className={`popup__close popup__close-${name}`} type="button"></button>
        <form className="popup__form" name={`popupForm${name}`} noValidate>
        <h2 className="popup__profile-name">{title}</h2>
          {children}
        </form>
      </div>
    </div>);
}

export default PopupWithForm;
