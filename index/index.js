const editButton = document.querySelector('.profile__edit-button'); 
const closeEditButton = document.querySelector('.popup__close-icon');
const popupForm = document.querySelector('.popup');
const nameInput = document.querySelector('.popup__info_name');
const jobInput = document.querySelector('.popup__info_job');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__text');
const avatarImg = document.querySelector('.profile__avatar');
const cardElements = document.querySelector('.elements');
const popupFormNew = document.querySelector('.popup__new-place');
const titleNewPlaсe = document.querySelector('.popup__info_title');
const linkNewPlaсe = document.querySelector('.popup__info_link');
const addButton = document.querySelector('.profile__add-button');
const closeAddButton = document.querySelector('.popup__close-add');
const popupImage = document.querySelector('.popup__image');
const closeImage = document.querySelector('.popup__close-image');
const image = document.querySelector('.popup__big-image');
const imageText = document.querySelector('.popup__text-image');
const cardTemplate = document.querySelector('#card').content;
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
function loadInitialCards() {
    initialCards.forEach((element) => cardElements.append(createNewCard(element.name, element.link)));
}

// Обработчик клика на кнопку "лайк" карточки. 
function likeButtonClick(evt) {
    evt.target.classList.toggle('element__button-like_active');
}

// Обработчик клика на кнопку "удалить" карточку.
function binButtonClick(evt) {
    const div = evt.target.closest('.element');
    div.remove();
}

// Обработчик клика на картинку для увеличения изображения.
function magnifyImage(evt) {
    showClosePopup(popupImage);
    image.src = evt.target.src;
    imageText.textContent = evt.target.alt; 
}

// Создание новой карточки через клонирование шаблона.
function createNewCard(name, link) {
    const cardTemplateClone = cardTemplate.cloneNode(true);
    const imgElement = cardTemplateClone.querySelector('.element__image');
    
    imgElement.src = link;
    imgElement.alt = name;
    cardTemplateClone.querySelector('.element__text').textContent = name;

    cardTemplateClone.querySelector('.element__button-like').addEventListener('click', likeButtonClick);
    cardTemplateClone.querySelector('.element__button-trash').addEventListener('click', binButtonClick);

    imgElement.addEventListener('click', magnifyImage);

    return cardTemplateClone;
}

// Обработчик открытия-закрытия pop-up
function showClosePopup(popupElement) {
    popupElement.classList.toggle('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function saveEditedProfile(evt) {
    evt.preventDefault();   // Эта строчка отменяет стандартную отправку формы.

    // Вставьте новые значения с помощью textContent
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    avatarImg.alt = 'фото ' + nameInput.value;

    showClosePopup(popupForm);
}

// Обработчик добавления новой карточки.
function addNewCard(evt) {
    evt.preventDefault();
    
    const newCard = createNewCard(titleNewPlaсe.value, linkNewPlaсe.value);
    cardElements.prepend(newCard);
    
    showClosePopup(popupFormNew);
}

// событие по нажатию кнопки редактирования.
editButton.addEventListener('click', function() {
    showClosePopup(popupForm);
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
});

// событие по нажатию кнопки "закрыть" форму редактирования.
closeEditButton.addEventListener('click', () => showClosePopup(popupForm)); 

// событие по нажатию кнопки "сохранить" форму редактирования.
popupForm.addEventListener('submit', saveEditedProfile);

// событие по нажатию кнопки "добавить" новое изображение.
addButton.addEventListener('click', () => showClosePopup(popupFormNew));
 
// событие по нажатию кнопки "закрыть" форму добавления нового изображения.
closeAddButton.addEventListener('click', () => showClosePopup(popupFormNew)); 

// событие по нажатию кнопки "сохранить" для нового изображения.
popupFormNew.addEventListener('submit', addNewCard);

// событие по нажатию на кнопку закрыть для увеличенной версии картинки.
closeImage.addEventListener('click', () => showClosePopup(popupImage)); 

loadInitialCards();