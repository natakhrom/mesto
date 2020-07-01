import './index.css';
import { editButton, nameInput, jobInput, addButton, editAvatar, avatarImage } from '../utils/constants.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { api } from '../components/Api.js';

let cardToRemove;

const popupWithImage = new PopupWithImage('.popup_image-place');
const userInfo = new UserInfo('.profile__name', '.profile__text');
const cardInserter = new Section({ data: [], renderer: () => {}}, '.cards');
const popupImageRemove = new PopupWithForm(() => {
    if (cardToRemove !== undefined) {
        api.deleteCard(cardToRemove.getCardId())
            .then(() => { cardToRemove.remove(); });
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
            });
    }
    else {
        api.putLike(card.getCardId())
            .then(response => { 
                card.switchLikeButton();
                card.setActualLikeCounter(response.likes.length);
            });
    }
}

function addNewCard(cardItem, removable, liked) {
    const card = new Card(cardItem, '#card', handleCardClick, handleCardRemove, handleLikeClick);
    const cardElement = card.generateCard(removable, liked);

    cardInserter.addItem(cardElement);
}

api.getUserInfo().then(response => {
    userInfo.setUserInfo(response);
    avatarImage.style.backgroundImage = `url('${response.avatar}')`;

    const ourId = response._id;

    api.getInitialCards().then(cards => {
        cards.reverse().forEach(card => {
            const cardOwnerId = card.owner._id;
            const removable = cardOwnerId === ourId;
            const liked = card.likes.some(item => item._id === ourId);

            addNewCard(card, removable, liked);
        });
    });
});

const profilePopup = new PopupWithForm(personInfo => {
    profilePopup.setButtonText("Сохранение...");
    api.patchEditProfile(personInfo.firstname, personInfo.about)
        .then(response => userInfo.setUserInfo(response));
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
            addNewCard(response, true, false);
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
            avatarImage.style.backgroundImage = `url('${response.avatar}')`;
        })
}, '.popup_avatar');

//** Событие по нажатию кнопки редактирования аватара */
editAvatar.addEventListener('click', () => {
    popupAvatar.open();
})


