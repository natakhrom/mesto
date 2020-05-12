const editButton = document.querySelector('.profile__edit-button'); 
const closeEditButton = document.querySelector('.popup__close-icon');
const popupForm = document.querySelector('.popup_edit-form');
const nameInput = document.querySelector('.popup__info_name');
const jobInput = document.querySelector('.popup__info_job');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__text');
const avatarImg = document.querySelector('.profile__avatar');
const cardsContainer = document.querySelector('.cards');
const popupFormNew = document.querySelector('.popup_new-place');
const titleNewPlaсe = document.querySelector('.popup__info_title');
const linkNewPlaсe = document.querySelector('.popup__info_link');
const addButton = document.querySelector('.profile__add-button');
const closeAddButton = document.querySelector('.popup__close-add');
const popupImage = document.querySelector('.popup_image-place');
const closeImage = document.querySelector('.popup__close-image');
const image = document.querySelector('.popup__big-image');
const imageText = document.querySelector('.popup__text-image');
const overlayList = Array.from(document.querySelectorAll('.popup'));
const cardTemplate = document.querySelector('#card').content;
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

// Обработчик открытия-закрытия pop-up
function togglePopup(popupElement) {
    popupElement.classList.toggle('popup_opened');
}

// Обработчик клика на кнопку "лайк" карточки. 
function likeButtonClick(evt) {
    evt.target.classList.toggle('card__button-like_active');
}

// Обработчик клика на картинку для увеличения изображения.
function magnifyImage(evt) {
    image.src = evt.target.src;
    imageText.textContent = evt.target.alt; 
    togglePopup(popupImage);
}

// Обработчик клика на кнопку "удалить" карточку.
function binButtonClick(evt) {
    const binBtn = evt.target;
    const cardContainer = binBtn.closest('.card');

    const likeBtn = cardContainer.querySelector('.card__button-like');
    likeBtn.removeEventListener('click', likeButtonClick);

    const imgElement = cardContainer.querySelector('.card__image');
    imgElement.removeEventListener('click', magnifyImage);

    binBtn.removeEventListener('click', binButtonClick);
    cardContainer.remove();
}

// Создание новой карточки через клонирование шаблона.
function createNewCard(name, link) {
    const cardTemplateClone = cardTemplate.cloneNode(true);
    const imgElement = cardTemplateClone.querySelector('.card__image');
    
    imgElement.src = link;
    imgElement.alt = name;
    cardTemplateClone.querySelector('.card__text').textContent = name;

    cardTemplateClone.querySelector('.card__button-like').addEventListener('click', likeButtonClick);
    cardTemplateClone.querySelector('.card__button-trash').addEventListener('click', binButtonClick);

    imgElement.addEventListener('click', magnifyImage);

    return cardTemplateClone;
}

// Добавление начального набора карточек.
function loadInitialCards() {
    initialCards.forEach((element) => cardsContainer.append(createNewCard(element.name, element.link)));
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function saveEditedProfile(evt) {
    evt.preventDefault();   // Эта строчка отменяет стандартную отправку формы.

    const inputList = Array.from(evt.currentTarget.querySelectorAll('.popup__info'));

    if (hasInvalidInput(inputList))
        return;

    // Вставьте новые значения с помощью textContent
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    avatarImg.alt = `фото ${nameInput.value}`;

    togglePopup(popupForm);
}

// Обработчик добавления новой карточки.
function addNewCard(evt) {
    evt.preventDefault();

    const inputList = Array.from(evt.currentTarget.querySelectorAll('.popup__info'));

    if (hasInvalidInput(inputList))
        return;
    
    const newCard = createNewCard(titleNewPlaсe.value, linkNewPlaсe.value);
    cardsContainer.prepend(newCard);
    
    togglePopup(popupFormNew);
}

function openEditPopup() {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    togglePopup(popupForm);
}

// Обработчик события клика на overlay.
function clickOnOverlayHandler(evt) {
    if (evt.target === evt.currentTarget) {
        togglePopup(evt.currentTarget);
    }
}

// Добавление обработчика клика на overlay.
function addClickOnOverlayListener() {
    overlayList.forEach((element) => {
        element.addEventListener('click', clickOnOverlayHandler); 
    });
}
 
// Обработчик нажатия клавиш на клавиатуре.
function keyDownHandler(evt) {
    if (evt.key === 'Escape') {
        // Нас интересует только Esc.
        const activeForm = overlayList.find((element) => element.classList.contains('popup_opened'));

        if (activeForm !== undefined) {
            togglePopup(activeForm);
        }
    }
}

 // Добавление обработчика нажатия клавиш.
function addKeyDownListener() {
    document.addEventListener('keydown', keyDownHandler);
}

function closeForm(evt) {
    const closeBtn = evt.target;
    const parentPopup = closeBtn.closest('.popup');
    const parentForm = parentPopup.querySelector('.popup__container');
    const settings = {
        inputErrorClass: 'popup__info_type_error',
        errorClass: 'popup__info-error_active'
      };
    
    const inputList = Array.from(parentForm.querySelectorAll('.popup__info'))
    inputList.forEach((element) => {
        hideInputError(settings, parentForm, element);
    });
    togglePopup(parentPopup);
}

loadInitialCards();

addClickOnOverlayListener();

addKeyDownListener();

// событие по нажатию кнопки редактирования.
editButton.addEventListener('click', openEditPopup);

// событие по нажатию кнопки "закрыть" форму редактирования.
closeEditButton.addEventListener('click', closeForm); 

// событие по нажатию кнопки "сохранить" форму редактирования.
popupForm.addEventListener('submit', saveEditedProfile);

// событие по нажатию кнопки "добавить" новое изображение.
addButton.addEventListener('click', () => togglePopup(popupFormNew));
 
// событие по нажатию кнопки "закрыть" форму добавления нового изображения.
closeAddButton.addEventListener('click', closeForm); 

// событие по нажатию кнопки "сохранить" для нового изображения.
popupFormNew.addEventListener('submit', addNewCard);

// событие по нажатию на кнопку закрыть для увеличенной версии картинки.
closeImage.addEventListener('click', () => togglePopup(popupImage)); 