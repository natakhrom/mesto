const editButton = document.querySelector('.profile__button-edit');
const closeButton = document.querySelector('.popup__close-icon');
let popupForm = document.querySelector('.popup');
let nameInput = document.querySelector('.popup__info_name');
let jobInput = document.querySelector('.popup__info_job');
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__text');

editButton.addEventListener('click', showProfileEditPopUp);

function showProfileEditPopUp() {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;

    popupForm.classList.add('popup_opened');
}

closeButton.addEventListener('click', closeProfileEditPopUp);

function closeProfileEditPopUp() {
    popupForm.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Вставьте новые значения с помощью textContent

    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;

    closeProfileEditPopUp();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupForm.addEventListener('submit', formSubmitHandler);
