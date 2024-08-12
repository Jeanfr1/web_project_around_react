export default function PopupWithForm({
  children,
  title,
  name,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  isValid,
}) {
  return (
    <>
      <div
        className={isOpen ? "overlay overlay_opened" : "overlay"}
        onClick={onClose}
      />
      <div
        className={
          isOpen ? `${name}-popup ${name}-popup_opened` : `${name}-popup`
        }
        id={`popup-${name}`}
      >
        <p className={`${name}-popup__title`}>{title}</p>
        <form className={`${name}-popup__container`} onSubmit={onSubmit}>
          {children}
          <button
            className={`${name}-popup__btn-close`}
            id={`btn-close-${name}`}
            type="reset"
            onClick={onClose}
          ></button>
          <button
            className={
              isValid
                ? `${name}-popup__btn-submit`
                : `${name}-popup__btn-submit ${name}-popup__btn-submit_inactive`
            }
            id={`btn-submit-${name}`}
            type="submit"
            disabled={!isValid}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </>
  );
}
