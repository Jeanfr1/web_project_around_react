import { useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [validForm, setValidForm] = useState({
    avatar: false,
  });

  const isValidForm = () => validForm.avatar;

  const handleAvatarChange = (evt) => {
    avatarRef.current.value = evt.target.value;
    setErrorMessage(avatarRef.current.validationMessage);
    setValidForm({
      avatar: evt.target.validity.valid,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setLoading(true);
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };

  return (
    <PopupWithForm
      title="Alterar foto de perfil"
      name="avatar"
      buttonText={loading ? "Salvando..." : "Salvar"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValidForm}
    >
      <input
        className={
          errorMessage
            ? "avatar-popup__input avatar-popup__input_type_error"
            : "avatar-popup__input"
        }
        placeholder="Link para a imagem"
        type="url"
        id="url-avatar"
        required
        name="avatar"
        ref={avatarRef}
        onChange={handleAvatarChange}
      />
      <span className="avatar-popup__input-error_active">{errorMessage}</span>
    </PopupWithForm>
  );
}
