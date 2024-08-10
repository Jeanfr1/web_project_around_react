import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({
  card,
  onRemoveCardClick,
  onCardClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((like) => like._id === currentUser._id);
  const cardLikeButtonClassName = isLiked
    ? "elements__card-btn-hearth elements__card-btn-hearth_active"
    : "elements__card-btn-hearth";

  function handleClick() {
    onCardClick(card);
  }

  return (
    <div className="elements__card" id={card._id}>
      <div className="elements__card-photo">
        <img
          src={card.link}
          alt={card.name}
          className="elements__card-photo-imagen"
          onClick={handleClick}
        />
        {isOwn && (
          <button
            className="elements__card-btn-trash"
            onClick={() => onRemoveCardClick(card)}
          />
        )}
      </div>
      <div className="elements__card-info">
        <p className="elements__card-title">{card.name}</p>
        <div className="elements__card-like-container">
          <button
            className={cardLikeButtonClassName}
            onClick={() => onCardLike(card)}
          />
          <p className="elements__card-likes-counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}
