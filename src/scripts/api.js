
const config = {
  baseUrl: 'https://nomoreparties.co/v1/cohort-mag-4',
  headers: {
    authorization: '80270577-247e-44bb-a274-1fb9efcb9899',
    'Content-Type': 'application/json'
  }
}






const getResponseData = (res) => {
  return res.ok ? res.json() : Promice.reject(`Ошибка: ${res.status}`);
};




export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(getResponseData);
};







export const getCardList = () => {
  return fetch(`${config.baseUrl}/cards`, { headers: config.headers })
    .then(getResponseData);
};





export const addCard = ({ name, link }) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ name, link })
  }).then(getResponseData);
};








export const removeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(getResponseData);
};


export const setUserInfo = ({ name, about }) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ name, about })
  }).then(getResponseData);
};







export const setUserAvatar = ({ avatar }) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar })
  }).then(getResponseData);
};




export const changeLikeCardStatus = (cardID, like) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: like ? 'PUT' : 'DELETE',
    headers: config.headers
  }).then((res) => getResponseData(res));
};

/*
const e = () => {
  return fetch('https://nomoreparties.co/v1/cohort-42/cards', {
    headers: {
      authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6'
    }
  })
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });
};

/*
GET https://nomoreparties.co/v1/:cohort-mag-4/users/me
fetch('https://nomoreparties.co/v1/:cohort-mag-4/users/me');

*/


/*

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}
    */