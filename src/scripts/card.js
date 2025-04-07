export const createCard = function (data, { onDeleteCard, onLikeCard, onPreviewImage }) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = data.link;
  cardImage.alt = data.name
  cardElement.querySelector('.card__title').textContent = data.name;
  likeButton.addEventListener('click', onLikeCard);
  deleteButton.addEventListener('click', onDeleteCard);
  cardImage.addEventListener('click', () => onPreviewImage(data));
  return cardElement;
};

export function deleteCard(evt) {
  evt.target.closest('.card').remove();
};

export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
};