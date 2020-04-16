const editButton = document.querySelector('.profile__edit-button'); 
const closeButton = document.querySelector('.popup__close-icon');
let popupForm = document.querySelector('.popup');
let nameInput = document.querySelector('.popup__info_name');
let jobInput = document.querySelector('.popup__info_job');
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__text');
let avatarImg = document.querySelector('.profile__avatar');

// функция открытия-закрытия pop-up
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
}   

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

function formSubmitHandler (evt) {
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

// событие по нажатию кнопки редактирования
editButton.addEventListener('click', function () { showCloseProfileEditPopUp(true); }); 
// событие по нажатию кнопки закрыть (Х)
closeButton.addEventListener('click', function () { showCloseProfileEditPopUp(false); }); 
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupForm.addEventListener('submit', formSubmitHandler); 
