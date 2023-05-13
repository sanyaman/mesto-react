function PopupWithForm({ name, title, isOpen, onClose, children, buttonText }) {
  return (
    <div className={`popup popup_${name} ${isOpen} `} aria-label={name}>
      <div className={`popup__container popup__container-${name}`}>
        <button onClick={onClose} className={`popup__close popup__close-${name}`} type="button"/>
        <form className="popup__form" name={`popupForm${name}`} >
          <h2 className="popup__profile-name">{title}</h2>{children}
          <button name="saveBtn" type="submit" className={`popup__sumbit popup__sumbit-${name}`}>{buttonText}</button>
        </form>
      </div>
    </div>);
}

export default PopupWithForm;
