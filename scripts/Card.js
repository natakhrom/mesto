import { showPopup } from './utils.js'

const magnifiedForm = document.querySelector('.popup_image-place');
const magnifiedImage = document.querySelector('.popup__big-image');
const magnifiedCaption = document.querySelector('.popup__text-image');

export default class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        // забираем размеку из HTML и клонируем элемент
        const cardElement = document
            .querySelector(this._cardSelector).content
            .querySelector('.card')
            .cloneNode(true);
    
        // вернём DOM-элемент карточки
        return cardElement;
    }

    generateCard() {
        // Запишем разметку в приватное поле _element. 
        // Так у других элементов появится доступ к ней.
        this._element = this._getTemplate();
        this._imageElement = this._element.querySelector('.card__image');
        this._buttonLike = this._element.querySelector('.card__button-like');
        this._buttonTrash = this._element.querySelector('.card__button-trash');

        this._setEventListeners(); // добавили обработчики
      
        // Добавим данные
        this._imageElement.src = this._link;
        this._imageElement.alt = `фото ${this._name}`;
        this._element.querySelector('.card__text').textContent = this._name;
      
        // Вернём элемент наружу
        return this._element;
    }

    _setEventListeners() {
        this._buttonLike.addEventListener('click', () => {
            this._likeButtonClick();
        });

        this._imageElement.addEventListener('click', () => {
            this._magnifyImage();
        });

        this._buttonTrash.addEventListener('click', () => {
            this._binButtonClick();
        });
    }

    _likeButtonClick() {
        this._buttonLike.classList.toggle('card__button-like_active');
    }

    _magnifyImage() {
        magnifiedImage.src = this._link;
        magnifiedImage.alt = `фото ${this._name}`;
        magnifiedCaption.textContent = this._name; 
        
        showPopup(magnifiedForm);
    }

    _binButtonClick() {
        this._buttonLike.removeEventListener('click', this._likeButtonClick);
        this._imageElement.removeEventListener('click', this._magnifyImage);
        this._buttonTrash.removeEventListener('click', this._binButtonClick);
        
        this._element.remove();
        this._element = null;
    }
}