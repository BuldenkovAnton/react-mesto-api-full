import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeletePlacePopup(props) {
  const [buttonText, setButtonText] = React.useState("Да");

  React.useEffect(() => {
    setButtonText(props.isLoading ? "Удаление..." : "Да");
  }, [props.isLoading]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onDeleteCard(props.cardId);
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="delete-card"
      disabled={false}
      buttonText={buttonText}
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
    />
  );
}

export default DeletePlacePopup;
