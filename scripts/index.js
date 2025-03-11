const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

const createCard = function (data, doDelete) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = data.link;
  cardElement.querySelector('.card__title').textContent = data.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', doDelete);
  
  return cardElement;
};

function deleteCard(evt) {
  evt.target.closest('.card').remove();
};

initialCards.forEach((data) => {
  cardList.append(createCard(data, deleteCard));
});