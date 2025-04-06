import '../pages/index.css';
import { initialCards } from './cards.js';
import { openModal, closeModal, setCloseModal } from './modal.js';
import { createCard, deleteCard, likeCard } from './card.js';

const cardList = document.querySelector('.places__list');

const profileModal = document.querySelector('.popup_type_edit');
const profileForm = profileModal.querySelector('.popup__form')
const profileTitleInput = profileForm.querySelector('.popup__input_type_name')
const profileDescriptionInput = profileForm.querySelector('.popup__input_type_description')
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileModalOpenButton = document.querySelector('.profile__edit-button');

const newCardModal = document.querySelector('.popup_type_new-card');
const newCardForm = newCardModal.querySelector('.popup__form');
const newCardModalOpenButton = document.querySelector('.profile__add-button');
const newCardNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const newCardLinkInput = newCardForm.querySelector('.popup__input_type_url');

const imageModal = document.querySelector('.popup_type_image');
const imageElement = imageModal.querySelector('.popup__image');
const imageCaption = imageModal.querySelector('.popup__caption');
const modalImageOpenButton = document.querySelector('.card__image');





profileModalOpenButton.addEventListener('click', () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileModal);
});

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileModal);
};

profileForm.addEventListener('submit', handleProfileFormSubmit);




const previewImage = ({ name, link }) => {
  imageElement.src = link;
  imageElement.alt = `Фото ${name}`;
  imageCaption.textContent = name;
  openModal(imageModal);
};


initialCards.forEach((data) => {
  cardList.append(createCard(data, { onPreviewImage: previewImage, onLikeCard: likeCard, onDeleteCard: deleteCard }));
});

const newCardFormSubmit = (evt) => {
  evt.preventDefault();
  cardList.prepend(createCard({
    name: newCardNameInput.value,
    link: newCardLinkInput.value
  },{
    onPreviewImage: previewImage,
    onLikeCard: likeCard,
    onDeleteCard: deleteCard
  }));
  closeModal(newCardModal);
  newCardForm.reset
};

newCardForm.addEventListener('submit', newCardFormSubmit);

newCardModalOpenButton.addEventListener('click', () => {
  openModal(newCardModal);
});

modalImageOpenButton.addEventListener('click', () => {
  openModal(imageModal);
});



setCloseModal(profileModal);
setCloseModal(newCardModal);
setCloseModal(imageModal);