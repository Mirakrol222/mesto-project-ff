import { changeLikeCardStatus } from "./api.js";

export const handleLikeCardClick = (cardId, likeButton, likesCount) => {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  changeLikeCardStatus(cardId, !isLiked)
    .then((cardData) => {
      likeButton.classList.toggle('card__like-button_is-active');
      likesCount.textContent = cardData.likes.length;
    })
    .catch((err) => console.log(`Ошибка статуса лайка ${err}`));
};

export const handledDeleteCardClick = (cardElement) => {
  cardElement.remove();
};

export const createCard = function (data, { onDeleteCard, onLikeCard, onPreviewImage }, userId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  const likesCount = cardElement.querySelector('.card__like-count');
  cardImage.style.backgroundImage = `url(${data.link})`;
  cardElement.querySelector('.card__title').textContent = data.name;

  const isLiked = data.likes.some((like) => like._id === userId);
  if (isLiked) likeButton.classList.add('card__like-button_is-active');
  likesCount.textContent = data.likes.length;

  if (data.owner._id === userId && onDeleteCard) {
    deleteButton.addEventListener('click', () => {
      onDeleteCard(data._id, cardElement);
    });
  } else {
    deleteButton.remove();
  }

  if (onLikeCard) {
    likeButton.addEventListener('click', () => {
      onLikeCard(data._id, likeButton, likesCount)
    });
  }

  if (onPreviewImage) {
    cardImage.addEventListener('click', () => onPreviewImage(data));
  }

  return cardElement;
};