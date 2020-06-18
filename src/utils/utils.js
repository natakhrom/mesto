//** Метод, который проверяет валидность полей (принимает массив полей) */ 
export function hasInvalidInput(...inputList) {
    for (let inputElement of inputList) {
        if (!inputElement.validity.valid) {
            return true;
        }
    }

    return false;
};

export function hideInputError(settings, formElement, inputElement) {
    //** Находим элемент ошибки */ 
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    //** Скрываем выделение input */ 
    inputElement.classList.remove(settings.inputErrorClass);                            //** 'popup__info_type_error' */ 
    //** Скрываем сообщение об ошибке */ 
    errorElement.classList.remove(settings.errorClass);                                 //** 'popup__info-error_active' */ 
    //** Очистим ошибку */ 
    errorElement.textContent = '';
};