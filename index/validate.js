//функция, которая добавляет класс с ошибкой
const showInputError = (settings, formElement, inputElement, errorMessage) => {
    // Находим элемент ошибки внутри самой функции
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);                               //'popup__info_type_error'
    // Заменим содержимое span с ошибкой на переданный параметр
    errorElement.textContent = errorMessage;
    // Показываем сообщение об ошибке
    errorElement.classList.add(settings.errorClass);                                    //'popup__info-error_active'
};

//функция, которая удаляет класс с ошибкой
const hideInputError = (settings, formElement, inputElement) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);                            //'popup__info_type_error'
  // Скрываем сообщение об ошибке
  errorElement.classList.remove(settings.errorClass);                                 //'popup__info-error_active'
  // Очистим ошибку
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (settings, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(settings, formElement, inputElement, inputElement.validationMessage);
  }
  else {
    // Если проходит, скроем
    hideInputError(settings, formElement, inputElement);
  }
};

// Функция, которая проверяет валидность полей (принимает массив полей)
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (settings, inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(settings.inactiveButtonClass);                                 //'popup__button_disabled'
  } 
  else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(settings.inactiveButtonClass);                              //'popup__button_disabled'
  }
};

//функция, которая добавляет слушателей 
const setEventListeners = (settings, formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(settings.inputElement));           //'.popup__info'
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);              //'.popup__button'

  // Вызовем toggleButtonState и передадим ей массив полей и кнопку
  toggleButtonState(settings, inputList, buttonElement);
  
  // Обойдем все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(settings, formElement, inputElement);
      toggleButtonState(settings, inputList, buttonElement);
    });
  });
};
  
const enableValidation = (settings) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(settings.formElement));                    //'.popup__container'
  
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  
    setEventListeners(settings, formElement);
  });
};

enableValidation({
  formElement: '.popup__container',
  inputElement: '.popup__info',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__info_type_error',
  errorClass: 'popup__info-error_active'
});
