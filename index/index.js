const editButton = document.querySelector('.profile__button_edit'); 
const closeButton = document.querySelector('.popup__close-icon');
let popupForm = document.querySelector('.popup');
let nameInput = document.querySelector('.popup__info_name');
let jobInput = document.querySelector('.popup__info_job');
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__text');

editButton.addEventListener('click', function () { showCloseProfileEditPopUp(true); }); // событие по нажатию кнопки редактирования
closeButton.addEventListener('click', function () { showCloseProfileEditPopUp(false); }); // событие по нажатию кнопки закрыть (Х)

function showCloseProfileEditPopUp(show) {
    if (show) {
        nameInput.value = nameProfile.textContent;
        jobInput.value = jobProfile.textContent;
        popupForm.classList.remove('popup_closed');
        popupForm.classList.add('popup_opened');
    }
    else {
        popupForm.classList.remove('popup_opened');
        popupForm.classList.add('popup_closed');       
    }
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

    showCloseProfileEditPopUp(false); //событие по нажатию кнопки "Сохранить"
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupForm.addEventListener('submit', formSubmitHandler); 
