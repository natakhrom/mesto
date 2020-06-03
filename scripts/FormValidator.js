import { hasInvalidInput, hideInputError } from './utils.js'

export default class FormValidator {
  constructor(data, formElement) {
    this._inputElement = data.inputElement;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._formElement = formElement;
  }

  //Метод, который добавляет класс с ошибкой
  _showInputError(inputElement) {
    // Находим элемент ошибки внутри 
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);                            //'popup__info_type_error'
    // Заменим содержимое span с ошибкой на переданный параметр
    errorElement.textContent = inputElement.validationMessage;
    // Показываем сообщение об ошибке
    errorElement.classList.add(this._errorClass);                                 //'popup__info-error_active'
  };

  //Метод, который удаляет класс с ошибкой
  _hideInputError(inputElement) {
    const settings = {
      inputErrorClass: 'popup__info_type_error',
      errorClass: 'popup__info-error_active'
    };
    
    hideInputError(settings, this._formElement, inputElement);
  };

  // Метод, который проверяет валидность поля
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      this._showInputError(inputElement);
    }
    else {
      // Если проходит, скроем
      this._hideInputError(inputElement);
    }
  };

  // Метод принимает массив полей ввода
  // и элемент кнопки, состояние которой нужно менять
  _toggleButtonState(buttonElement, inputList) {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(...inputList)) {
      // сделай кнопку неактивной
      buttonElement.classList.add(this._inactiveButtonClass);                          //'popup__button_disabled'
    } 
    else {
      // иначе сделай кнопку активной
      buttonElement.classList.remove(this._inactiveButtonClass);                       //'popup__button_disabled'
    }
  };

  //Метод, который добавляет слушателей 
  _setEventListeners() {
      this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      // Находим все поля внутри формы,
      // сделаем из них массив методом Array.from
      const inputList = Array.from(this._formElement.querySelectorAll(this._inputElement));     //'.popup__info'
      const buttonElement = this._formElement.querySelector(this._submitButtonSelector);        //'.popup__button'
    
      // Обойдем все элементы полученной коллекции
      inputList.forEach((inputElement) => {
        // каждому полю добавим обработчик события input
        inputElement.addEventListener('input', () => {
          // Внутри колбэка вызовем isValid,
          // передав ей форму и проверяемый элемент
          this._isValid(inputElement);
          this._toggleButtonState(buttonElement, inputList);
        });
      });
  };

  enableValidation() {
    this._setEventListeners();
  };
}