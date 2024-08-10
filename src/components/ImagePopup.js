export default function ImagePopup({ isOpen, onClose, card }) {
  return (
    <>
      <div
        className={isOpen ? "overlay overlay_opened" : "overlay"}
        onClick={onClose}
      />
      <div className={isOpen ? "img-popup img-popup_opened" : "img-popup"}>
        <div id="popup-image">
          <button
            className="img-popup__btn-close"
            id="btn-close-image"
            type="reset"
            onClick={onClose}
          ></button>
          <div className="img-popup__container">
            <img
              src={card.link}
              alt={card.name}
              className="img-popup__preview"
            />
            <p className="img-popup__title">{card.name}</p>
          </div>
        </div>
      </div>
    </>
  );
}
