import { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    about: "",
  });
  const [loading, setLoading] = useState(false);
  const [validForm, setValidForm] = useState({
    name: false,
    about: false,
  });

  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setAbout(currentUser.about);
      // Atualiza a validação dos campos com base nos valores iniciais
      setValidForm({
        name: currentUser.name.length >= 2 && currentUser.name.length <= 40,
        about: currentUser.about.length >= 2 && currentUser.about.length <= 200,
      });
    }
  }, [currentUser, isOpen]);

  const isValidForm = validForm.name && validForm.about;

  const handleNameChange = (evt) => {
    setName(evt.target.value);
    setErrorMessage({
      ...errorMessage,
      name: evt.target.validationMessage,
    });
    setValidForm({
      ...validForm,
      name: evt.target.validity.valid,
    });
  };

  const handleAboutChange = (evt) => {
    setAbout(evt.target.value);
    setErrorMessage({
      ...errorMessage,
      about: evt.target.validationMessage,
    });
    setValidForm({
      ...validForm,
      about: evt.target.validity.valid,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!isValidForm) return; // Impede o submit se o formulário não for válido
    setLoading(true);

    onUpdateUser({
      name,
      about,
    });
  };

  return (
    <PopupWithForm
      title="Editar Perfil"
      name="profile"
      buttonText={loading ? "Salvando..." : "Salvar"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValidForm} // Passa o valor booleano para isValid
    >
      <input
        className={
          errorMessage.name
            ? "profile-popup__input profile-popup__input_type_error"
            : "profile-popup__input"
        }
        placeholder="Nome"
        type="text"
        id="name-profile"
        minLength="2"
        maxLength="40"
        required
        name="name"
        value={name}
        onChange={handleNameChange}
      />
      <span className="profile-popup__input-error_active">
        {errorMessage.name}
      </span>
      <input
        className={
          errorMessage.about
            ? "profile-popup__input profile-popup__input_type_error"
            : "profile-popup__input"
        }
        placeholder="Sobre mim"
        type="text"
        id="about-profile"
        minLength="2"
        maxLength="200"
        required
        name="about"
        value={about}
        onChange={handleAboutChange}
      />
      <span className="profile-popup__input-error_active">
        {errorMessage.about}
      </span>
    </PopupWithForm>
  );
}
