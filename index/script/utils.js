// Обработчик открытия-закрытия pop-up.
function togglePopup(popupElement) {
    popupElement.classList.toggle('popup_opened');
}

// Обработчик нажатия клавиши Esc на клавиатуре.
function keyDownHandler(evt) {
    if (evt.key === 'Escape') {
        // Нас интересует только Esc.
        const activeForm = document.querySelector('.popup_opened');

        if (activeForm !== undefined) {
            document.removeEventListener('keydown', keyDownHandler);
            togglePopup(activeForm);
        }
    }
}

// Обрабочик на подписку Esc для открытой формы.
function showPopup(popupElement) {
    document.addEventListener('keydown', keyDownHandler);
    togglePopup(popupElement);
}

// Обрабочик на отписку при закрытии формы.
function hidePopup(popupElement) {
    document.removeEventListener('keydown', keyDownHandler);
    togglePopup(popupElement);
}

// Метод, который проверяет валидность полей (принимает массив полей)
function hasInvalidInput(inputList) {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
     // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся фунцкция
      // hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    });
};

function hideInputError(settings, formElement, inputElement) {
    // Находим элемент ошибки
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    // Скрываем выделение input
    inputElement.classList.remove(settings.inputErrorClass);                            //'popup__info_type_error'
    // Скрываем сообщение об ошибке
    errorElement.classList.remove(settings.errorClass);                                 //'popup__info-error_active'
    // Очистим ошибку
    errorElement.textContent = '';
};

export { togglePopup, keyDownHandler, showPopup, hidePopup, hasInvalidInput, hideInputError };