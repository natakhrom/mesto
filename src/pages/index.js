import './index.css';
import { editButton, nameInput, jobInput, addButton, editAvatar } from '../utils/constants.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

let userId;
let cardToRemove;

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12',
    headers: {
      authorization: 'bc2f7d16-f7fa-49da-ae6d-059f2268552e',
      'Content-Type': 'application/json'
    }
});
const popupWithImage = new PopupWithImage('.popup_image-place');
const userInfo = new UserInfo('.profile__name', '.profile__text', '.profile__avatar');
const cardInserter = new Section({ data: [], renderer: () => {}}, '.cards');
const popupImageRemove = new PopupWithForm(() => {
    if (cardToRemove !== undefined) {
        api.deleteCard(cardToRemove.getCardId()) 
            .then(() => { 
                cardToRemove.remove(); 
                popupImageRemove.close();
            })
            .catch(error => console.log(error));
    }
}, '.popup_image-delete');

function handleCardClick(card) {
    popupWithImage.open(card);
}

function handleCardRemove(card) {
    cardToRemove = card;
    popupImageRemove.open(true);
}

function handleLikeClick(card) {
    if (card.getCardLiked()) {
        api.deleteLike(card.getCardId())  
            .then(response => {
                card.switchLikeButton();
                card.setActualLikeCounter(response.likes.length);
            })
            .catch(error => console.log(error));
    }
    else {
        api.putLike(card.getCardId()) 
            .then(response => { 
            card.switchLikeButton();
            card.setActualLikeCounter(response.likes.length);
            })
            .catch(error => console.log(error));
    }
}

function addNewCard(cardItem, userId) {
    const card = new Card(cardItem, userId, '#card', handleCardClick, handleCardRemove, handleLikeClick);
    const cardElement = card.generateCard();

    cardInserter.addItem(cardElement);
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userInfoResponse, cardsResponse]) => {
        userInfo.setUserInfo(userInfoResponse);
        userInfo.setAvatarImage(userInfoResponse);

        userId = userInfoResponse._id;

        cardsResponse.reverse().forEach(card => {
            addNewCard(card, userId);
        });
    })
    .catch(error => console.log(error));

const profilePopup = new PopupWithForm(personInfo => {
    profilePopup.setButtonText("Сохранение...");
    api.patchEditProfile(personInfo.firstname, personInfo.about) 
        .then(response => {
            userInfo.setUserInfo(response); 
            profilePopup.close(); 
        })
        .catch(error => console.log(error))
        .finally(() => {
            profilePopup.setButtonText(profilePopup.getButtonOriginalText());
        });
}, '.popup_edit-form');

//** Событие по нажатию кнопки редактирования */  
editButton.addEventListener('click', evt => {
    const userCard = userInfo.getUserInfo();
    nameInput.value = userCard.name;
    jobInput.value = userCard.about;

    profilePopup.open(false);
});

const newCardPopup = new PopupWithForm(newCard => {
    newCardPopup.setButtonText("Сохранение...");
    api.postAddNewCard(newCard.title, newCard.link)
        .then(response => {
        addNewCard(response, userId);
        newCardPopup.close();
        })
        .catch(error => console.log(error))
        .finally(() => {
            newCardPopup.setButtonText(newCardPopup.getButtonOriginalText());
        });
}, '.popup_new-place');

//**  Cобытие по нажатию кнопки "добавить" новое изображение */  
addButton.addEventListener('click', () => {
    newCardPopup.open(false);
});

const popupAvatar = new PopupWithForm(data => {
    popupAvatar.setButtonText("Сохранение...");
    api.patchNewAvatar(data.link) 
    .then(response => {
        userInfo.setAvatarImage(response);
        popupAvatar.close();
    })
    .catch(error => console.log(error))
    .finally(() => {
        popupAvatar.setButtonText(popupAvatar.getButtonOriginalText());
    });
}, '.popup_avatar');

//** Событие по нажатию кнопки редактирования аватара */
editAvatar.addEventListener('click', () => {
    popupAvatar.open();
})