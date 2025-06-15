import '../pages/index.css';
import { openModal, closeModal, setCloseModal } from './modal.js';
import { handleLikeCardClick, handledDeleteCardClick, createCard } from './card.js';
import { getCardList, addCard, removeCard, setUserInfo, setUserAvatar, getUserInfo } from "./api.js";
import { clearValidation, enableValidation } from "./validation.js";

const formValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

let userId = null;

let submitFormConfirm = () => { };

const cardList = document.querySelector('.places__list');

const profileModal = document.querySelector('.popup_type_edit');
const profileForm = profileModal.querySelector('.popup__form');
const profileTitleInput = profileForm.querySelector('.popup__input_type_name');
const profileDescriptionInput = profileForm.querySelector('.popup__input_type_description');
const profileSubmitButton = profileForm.querySelector('[type="submit"]');
const profileTitle = document.querySelector('.profile__title');
const profileAvatar = document.querySelector('.profile__image');
const profileDescription = document.querySelector('.profile__description');
const profileModalOpenButton = document.querySelector('.profile__edit-button');

const avatarFormModalWindow = document.querySelector('.popup_type_edit-avatar');
const avatarForm = avatarFormModalWindow.querySelector('.popup__form');
const avatarInput = avatarForm.querySelector('.popup__input');
const avatarSubmitButton = avatarForm.querySelector('[type="submit"]');

const newCardModal = document.querySelector('.popup_type_new-card');
const newCardForm = newCardModal.querySelector('.popup__form');
const newCardModalOpenButton = document.querySelector('.profile__add-button');
const newCardNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const newCardLinkInput = newCardForm.querySelector('.popup__input_type_url');

const cardSubmitButton = newCardForm.querySelector('[type="submit"]');
const cardDeleteModalWindow = document.querySelector('.popup_type_remove-card');
const cardDeleteSubmitButton = cardDeleteModalWindow.querySelector('[type="submit"]');

const imageModal = document.querySelector('.popup_type_image');
const imageElement = imageModal.querySelector('.popup__image');
const imageCaption = imageModal.querySelector('.popup__caption');

cardDeleteModalWindow.addEventListener('submit', (evt) => {
  evt.preventDefault();
  submitFormConfirm();
});

const previewImage = ({ name, link }) => {
  imageElement.src = link;
  imageElement.alt = `Фото ${name}`;
  imageCaption.textContent = name;
  openModal(imageModal);
};

const handleDeleteCard = (cardId, cardElement) => {
  submitFormConfirm = () => {
    removeCard(cardId)
      .then(() => {
        handledDeleteCardClick(cardElement);
        closeModal(cardDeleteModalWindow);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        cardDeleteSubmitButton.textContent = 'Да';
      });
  };
  openModal(cardDeleteModalWindow);
}

const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  cardSubmitButton.textContent = 'Создание...';
  addCard({ name: newCardNameInput.value, link: newCardLinkInput.value })
    .then((cardData) => {
      const cardElement = createCard(cardData, { onDeleteCard: handleDeleteCard, onLikeCard: handleLikeCardClick, onPreviewImage: previewImage }, userId);
      cardList.prepend(cardElement);
      closeModal(newCardModal);
      newCardForm.reset();
      clearValidation(newCardForm, enableValidation);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      cardSubmitButton.textContent = 'Создать';
    });
};

newCardForm.addEventListener('submit', handleCardFormSubmit);

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileSubmitButton.textContent = 'Сохранение...';
  setUserInfo({
    name: profileTitleInput.value,
    about: profileDescriptionInput.value
  })
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(profileModal);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profileSubmitButton.textContent = 'Сохранить';
    });
};

profileForm.addEventListener('submit', handleProfileFormSubmit);

const handleAvatarFormSubmit = (evt) => {
  evt.preventDefault();
  avatarSubmitButton.textContent = 'Сохранение...';
  setUserAvatar({
    avatar: avatarInput.value,
  })
    .then((userData) => {
      profileAvatar.style.backgroungImage = `url(${userData.avatar})`;
      closeModal(avatarFormModalWindow);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarSubmitButton.textContent = 'Сохранить';
    });
}

avatarForm.addEventListener('submit', handleAvatarFormSubmit);

profileModalOpenButton.addEventListener('click', () => {
  //clearValidation(profileForm, formValidation);
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileModal);
})

newCardModalOpenButton.addEventListener('click', () => {
  openModal(newCardModal);
});

profileAvatar.addEventListener('click', () => {
  openModal(avatarFormModalWindow);
});

setCloseModal(profileModal);
setCloseModal(newCardModal);
setCloseModal(imageModal);
setCloseModal(avatarFormModalWindow);
setCloseModal(cardDeleteModalWindow);

//enableValidation(formValidation);

Promise.all([getCardList(), getUserInfo()])
  .then(([cards, userData]) => {
    userId = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroungImage = `url(${userData.avatar})`;

    cards.forEach((data) => {
      const cardElement = createCard(
        data,
        {
          onPreviewImage: previewImage,
          onLikeCard: handleLikeCardClick,
          onDeleteCard: handleDeleteCard
        },
        userId
      );
      cardList.prepend(cardElement);
    });
  })
  .catch((err) => {
    console.log(err);
  });