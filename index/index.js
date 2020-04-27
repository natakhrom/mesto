const editButton = document.querySelector('.profile__edit-button'); 
const closeButton = document.querySelector('.popup__close-icon');
const popupForm = document.querySelector('.popup');
const nameInput = document.querySelector('.popup__info_name');
const jobInput = document.querySelector('.popup__info_job');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__text');
const avatarImg = document.querySelector('.profile__avatar');
const cardElements = document.querySelector('.elements');
const popupFormNew = document.querySelector('.popup_new-place');
const titleNewPlase = document.querySelector('.popup__info_title');
const linkNewPlase = document.querySelector('.popup__info_link');
const addButton = document.querySelector('.profile__add-button');
const closeAddButton = document.querySelector('.popup__close-add');
const imagePopup = document.querySelector('.image');
const closeImage = document.querySelector('.image__close-icon');
const imageForm = document.querySelector('.image__popup');
const imageText = document.querySelector('.image__text');
const cardTemplate = document.querySelector('#element').content;

const initialCards = [
    {
        name: 'Бурятия',
        link: 'https://images.unsplash.com/photo-1560775675-18665a9b3ae0?ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80'
    },
    {
        name: 'Выборг',
        link: 'https://images.unsplash.com/photo-1536012354193-8bb300dc3ce6?ixlib=rb-1.2.1&auto=format&fit=crop&w=376&q=80'
    },
    {
        name: 'Карелия',
        link: 'https://images.unsplash.com/photo-1543699936-c901ddbf0c05?ixlib=rb-1.2.1&auto=format&fit=crop&w=333&q=80'
    },
    {
        name: 'Красноярск',
        link: 'https://images.unsplash.com/photo-1554481644-50d52b6fe742?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80'
    },
    {
        name: 'Зеленогад',
        link: 'https://images.unsplash.com/photo-1536577301209-d0f0cfaa5166?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
        name: 'Смоленск',
        link: 'https://images.unsplash.com/photo-1565004455363-1ca9a1169690?ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80'
    },
];

// Добавление начального набора карточек.
for (let i = 0; i < initialCards.length; ++i) {
    let cardData = initialCards[i];
    let newCard = createNewCard(cardData.name, cardData.link);
    cardElements.append(newCard);
};

// Создание новой карточки через клонирование шаблона.
function createNewCard(name, link) {
    let cardTemplateClone = cardTemplate.cloneNode(true);
    let imgElement = cardTemplateClone.querySelector('.element__image');
    
    imgElement.src = link;
    imgElement.alt = name;
    cardTemplateClone.querySelector('.element__text').textContent = name;

    cardTemplateClone.querySelector('.element__button-like').addEventListener('click', likeButtonClick);
    cardTemplateClone.querySelector('.element__button-trash').addEventListener('click', binButtonClick);

    imgElement.addEventListener('click', function () { 
        openCloseImagePopup(true); 
        imageForm.src = link;
        imageText.textContent = name;});
    
    return cardTemplateClone;
}

// Обработчик клика на кнопку "лайк". 
function likeButtonClick(evt) {
    evt.target.classList.toggle('element__button-like_active');
}

// Обработчик клика на кнопку удалить.
function binButtonClick(evt) {
    let div = evt.target.closest('.element');
    div.remove();
}

// Обработчик открытия-закрытия увеличенной версии картинки.
function openCloseImagePopup(open) {
    if (open) {
        imagePopup.classList.remove('image_type_closed');
        imagePopup.classList.add('image_type_opened');
    }
    else {
        imagePopup.classList.remove('image_type_opened');
        imagePopup.classList.add('image_type_closed');
    }
}

// Обработчик открытия-закрытия pop-up редактирования
function showCloseProfileEditPopUp(show) {
    if (show) {                                        // pop-up открывается 
        nameInput.value = nameProfile.textContent;
        jobInput.value = jobProfile.textContent;
        popupForm.classList.remove('popup_type_closed');
        popupForm.classList.add('popup_type_opened');
    }
    else {                                             // pop-up закрывается
        popupForm.classList.remove('popup_type_opened');
        popupForm.classList.add('popup_type_closed');       
    }
};   

// функция открытия-закрытия pop-up добавления  
function addButtonPopUp(show) {
    if (show) {
        popupFormNew.classList.remove('popup_type_closed');
        popupFormNew.classList.add('popup_type_opened');
    }
    else {                                             
        popupFormNew.classList.remove('popup_type_opened');
        popupFormNew.classList.add('popup_type_closed');  
    }
};

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function saveEditedProfile(evt) {
    evt.preventDefault();   // Эта строчка отменяет стандартную отправку формы.
                            // Так мы можем определить свою логику отправки.
                            // О том, как это делать, расскажем позже.

    // Вставьте новые значения с помощью textContent
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    avatarImg.alt = 'фото ' + nameInput.value;
    
    //событие по нажатию кнопки "Сохранить"
    showCloseProfileEditPopUp(false); 
}

// Обработчик добавления новой карточки.
function addNewCard(evt) {
    evt.preventDefault(); 
    let newCard = createNewCard(titleNewPlase.value, linkNewPlase.value);
    cardElements.prepend(newCard);
    addButtonPopUp(false); 
}

// событие по нажатию кнопки редактирования.
editButton.addEventListener('click', function () { showCloseProfileEditPopUp(true); }); 
// событие по нажатию кнопки закрыть (Х).
closeButton.addEventListener('click', function () { showCloseProfileEditPopUp(false); }); 
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка».
popupForm.addEventListener('submit', saveEditedProfile); 
// событие по нажатию кнопки "+".
addButton.addEventListener('click', function () { addButtonPopUp(true); });
// событие по нажатию кнопки закрыть (Х).
closeAddButton.addEventListener('click', function () { addButtonPopUp(false); });
// событие по нажатию кнопки сохранить для нового изображения.
popupFormNew.addEventListener('submit', addNewCard);
// событие по нажатию на кнопку закрыть для увеличенной версии картинки.
closeImage.addEventListener('click', function() { openCloseImagePopup(false); });