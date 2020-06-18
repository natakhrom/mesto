import Popup from './Popup.js';
import FormValidator from './FormValidator.js';
import { hasInvalidInput, hideInputError } from '../utils/utils.js'

export default class PopupWithForm extends Popup {
    constructor(handleFormSubmit, popupSelector) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;

        this._button = this._popup.querySelector('.popup__button');
        this._inputList = this._popup.querySelectorAll('.popup__info');

        const validator = new FormValidator({
                inputElement: '.popup__info',
                submitButtonSelector: '.popup__button',
                inactiveButtonClass: 'popup__button_disabled',
                inputErrorClass: 'popup__info_type_error',
                errorClass: 'popup__info-error_active'
            }, 
            this._popup);

        validator.enableValidation();
    }

    _getInputValues() {
        const formValues = {};

        this._inputList.forEach(input => {
          formValues[input.name] = input.value;
        });
      
        return formValues;
    }

    _setEventListeners() {
        this._popup.addEventListener('submit', evt => {
            evt.preventDefault();

            //** Даже с невалидными данными в форме можно вызвать submit нажав Enter. */ 
            //** Данный условный оператор обрабатывает такую ситуацию и не даёт завершить метод успешно если есть ошибки в данных. */ 
            if (hasInvalidInput(...this._inputList)) {
                return;
            }

            //** Добавим вызов функции _handleFormSubmit, передадим ей объект — результат работы _getInputValues */ 
            this._handleFormSubmit(this._getInputValues());
            this.close();
        });

        super._setEventListeners();
    }

    open() {
        this._button.classList.add('popup__button_disabled');

        const settings = {
            'inputErrorClass': 'popup__info_type_error',
            'errorClass': 'popup__info-error_active'
        };

        this._inputList.forEach(input => {
            hideInputError(settings, this._popup, input);
        });

        super.open();
    }

    close() {
        super.close();
        this._popup.querySelector('.popup__container').reset();
    }
}