import './index.css'
import { editButton, nameInput, jobInput, addButton, initialCards } from '../utils/constants.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

function handleCardClick(card) {
    const popup = new PopupWithImage(card, '.popup_image-place');
    popup.open();
}

const cardInserter = new Section({data: initialCards, renderer: cardItem => {
    const card = new Card(cardItem, '#card', handleCardClick);
    const cardElement = card.generateCard();

    cardInserter.addItem(cardElement);
}}, '.cards');

cardInserter.renderItems();


const userInfo = new UserInfo('.profile__name', '.profile__text');
const profilePopup = new PopupWithForm(personInfo => {
    userInfo.setUserInfo(personInfo);
}, '.popup_edit-form');

//** Событие по нажатию кнопки редактирования */  
editButton.addEventListener('click', evt => {
    const userCard = userInfo.getUserInfo();
    nameInput.value = userCard.name;
    jobInput.value = userCard.about;

    profilePopup.open();
});


const newCardPopup = new PopupWithForm(newCard => {
    const card = new Card(newCard, '#card', handleCardClick);
    const cardElement = card.generateCard();

    cardInserter.addItem(cardElement);
}, '.popup_new-place');

//**  Cобытие по нажатию кнопки "добавить" новое изображение */  
addButton.addEventListener('click', evt => {
    newCardPopup.open();
});