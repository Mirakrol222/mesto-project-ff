import { disableSubmitButton } from "./validation.js";

export const openModal = (modal) => {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscape);
};

export const closeModal = (modal) => {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscape);
};

const handleEscape = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_is-opened');
    closeModal(activePopup);
  }
};

export const setCloseModal = (modal) => {
  const closeButton = modal.querySelector('.popup__close');
  closeButton.addEventListener('click', () => {
    closeModal(modal);
  });

  modal.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closeModal(modal);
    }
  });
};