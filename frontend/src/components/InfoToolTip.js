import imageSuccess from "../images/register-success.svg";
import imageError from "../images/register-error.svg";

function InfoToolTip(props) {
  const isOpen = props.isOpen && "popup_opened";
  const imageSrc = props.isSuccess ? imageSuccess : imageError;

  return (
    <div className={`popup page__popup popup_type_infotool ${isOpen}`}>
      <div className="popup__container popup__container_type_auth">
        <button
          type="button"
          className="popup__close"
          title="Закрыть"
          onClick={props.onClose}
        ></button>
        <figure className="popup__figure">
          <img
            className="popup__image popup__image_component_auth"
            src={imageSrc}
            alt={props.message}
          />
          <figcaption className="popup__figcaption popup__figcaption_component_auth">
            {props.message}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default InfoToolTip;
