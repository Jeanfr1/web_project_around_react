import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function ConfirmationPopup({
  isOpen,
  onClose,
  onCardDelete,
  card,
}) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setLoading(true);
    onCardDelete(card._id);
  };

  return (
    <PopupWithForm
      title="Você tem certeza?"
      name="confirmation"
      buttonText={loading ? "Excluindo..." : "Sim"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={() => true}
    />
  );
}
