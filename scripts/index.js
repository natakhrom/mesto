import Card from './Card.js'
import FormValidator from './FormValidator.js'
import { showPopup, hidePopup, hasInvalidInput, hideInputError } from './utils.js'

const editButton = document.querySelector('.profile__edit-button');
const popupForm = document.querySelector('.popup_edit-form');
const nameInput = document.querySelector('.popup__info_name');
const jobInput = document.querySelector('.popup__info_job');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__text');
const avatarImg = document.querySelector('.profile__avatar');
const cardsContainer = document.querySelector('.cards');
const popupFormNew = document.querySelector('.popup_new-place');
const titleNewPlace = document.querySelector('.popup__info_title');
const linkNewPlace = document.querySelector('.popup__info_link');
const addButton = document.querySelector('.profile__add-button');


const initialCards = [
    {
        name: 'Бурятия',
        link: 'https://images.unsplash.com/photo-1560775675-18665a9b3ae0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjY1MDE0fQ&auto=format&fit=crop&w=750&q=80'
    },
    {
        name: 'Выборг',
        link: 'https://images.unsplash.com/photo-1536012354193-8bb300dc3ce6?ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80'
    },
    {
        name: 'Карелия',
        link: 'https://images.unsplash.com/photo-1543699936-c901ddbf0c05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=633&q=80'
    },
    {
        name: 'Красноярск',
        link: 'https://images.unsplash.com/photo-1554481644-50d52b6fe742?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80'
    },
    {
        name: 'Зеленоград',
        link: 'https://images.unsplash.com/photo-1536577301209-d0f0cfaa5166?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=802&q=80'
    },
    {
        name: 'Смоленск',
        link: 'https://images.unsplash.com/photo-1565004455363-1ca9a1169690?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
    },
];

// Добавление начального набора карточек.
function loadInitialCards() {
    initialCards.forEach(element => { 
        // Создадим экземпляр карточки
        const card = new Card(element, '#card');
        // Сгенерируем и добавим разметку для карточки в DOM
        cardsContainer.append(card.generateCard())
    });
}

// Обработчик «отправки» формы
function saveEditedProfile(evt) {
    evt.preventDefault();   // Эта строчка отменяет стандартную отправку формы.

    const inputList = Array.from(evt.currentTarget.querySelectorAll('.popup__info'));

    //условный опертор предотвращает сохранение невалидных данных по нажатию на Enter. Так же для функции addNewCard.
    if (hasInvalidInput(...inputList))
        return;

    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    avatarImg.alt = `фото ${nameInput.value}`;

    hidePopup(popupForm);
}

// Обработчик добавления новой карточки.
function addNewCard(evt) {
    evt.preventDefault();

    const inputList = Array.from(evt.currentTarget.querySelectorAll('.popup__info')); 

    if (hasInvalidInput(...inputList))
        return;
    
    const data = {
        name: titleNewPlace.value,
        link: linkNewPlace.value
    };
    const newCard = new Card(data, '#card');
    cardsContainer.prepend(newCard.generateCard());
    
    hidePopup(popupFormNew);
}

function cleanForm(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__info'));
    const settings = {
        inputErrorClass: 'popup__info_type_error',
        errorClass: 'popup__info-error_active'
    };  

    inputList.forEach(inputElement => {
        hideInputError(settings, formElement, inputElement);
    });
}

function openEditPopup() {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;

    const formElement = popupForm.querySelector('.popup__container');
    const submitBtn = formElement.querySelector('.popup__button');
    submitBtn.classList.remove('popup__button_disabled');

    cleanForm(formElement);
    showPopup(popupForm);
}

function openNewCardPopup() {
    const formElement = popupFormNew.querySelector('.popup__container');
    const submitBtn = formElement.querySelector('.popup__button');
    submitBtn.classList.add('popup__button_disabled');
    formElement.reset();

    cleanForm(formElement);
    showPopup(popupFormNew);
}

// Обработчик события клика на overlay.
function clickOnOverlayHandler(evt) {
    if (evt.target === evt.currentTarget) {
        hidePopup(evt.currentTarget);
    }
}

// Добавление обработчика клика на overlay.
function addClickOnOverlayListener() {
    const overlayList = Array.from(document.querySelectorAll('.popup'));
    overlayList.forEach((element) => {
        element.addEventListener('click', clickOnOverlayHandler); 
    });
}

// Закрытие фрмы по клику на крестик 
function addCloseButtonEvent() {
    const closeBtnList = Array.from(document.querySelectorAll('.popup__close-icon'));
    closeBtnList.forEach((closeButton) => {
        const formElement = closeButton.closest('.popup');
        closeButton.addEventListener('click', () => hidePopup(formElement));
    });
}

function addFormValidation() {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll('.popup__container'));              //'.popup__container'

    formList.forEach((formElement) => {
        const formPopup = new FormValidator({
            inputElement: '.popup__info',
            submitButtonSelector: '.popup__button',
            inactiveButtonClass: 'popup__button_disabled',
            inputErrorClass: 'popup__info_type_error',
            errorClass: 'popup__info-error_active'
            }, formElement);

        formPopup.enableValidation();
    });
}

loadInitialCards();

addClickOnOverlayListener();

addCloseButtonEvent();

addFormValidation();

// событие по нажатию кнопки редактирования.
editButton.addEventListener('click', openEditPopup);

// событие по нажатию кнопки "сохранить" форму редактирования.
popupForm.addEventListener('submit', saveEditedProfile);

// событие по нажатию кнопки "добавить" новое изображение.
addButton.addEventListener('click', openNewCardPopup);
 
// событие по нажатию кнопки "сохранить" для нового изображения.
popupFormNew.addEventListener('submit', addNewCard);