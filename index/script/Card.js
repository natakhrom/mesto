import { showPopup } from './utils.js'

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
        this._setEventListeners(); // добавили обработчики
      
        // Добавим данные
        this._element.querySelector('.card__image').src = this._link;
        this._element.querySelector('.card__text').textContent = this._name;
      
        // Вернём элемент наружу
        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.card__button-like').addEventListener('click', () => {
          this._likeButtonClick();
        });

        this._element.querySelector('.card__image').addEventListener('click', () => {
            this._magnifyImage();
        });

        this._element.querySelector('.card__button-trash').addEventListener('click', () => {
            this._binButtonClick();
        });
    }

    _likeButtonClick() {
        this._element.querySelector('.card__button-like').classList.toggle('card__button-like_active');
    }

    _magnifyImage() {
        document.querySelector('.popup__big-image').src = this._link;
        document.querySelector('.popup__text-image').textContent = this._name; 
        
        const bigImage = document.querySelector('.popup_image-place');
        showPopup(bigImage);
    }

    _binButtonClick() {
        const binBtn = this._element.querySelector('.card__button-trash');
        this._element = binBtn.closest('.card');
    
        const likeBtn = this._element.querySelector('.card__button-like');
        likeBtn.removeEventListener('click', this._likeButtonClick);
    
        const imgElement = this._element.querySelector('.card__image');
        imgElement.removeEventListener('click', this._magnifyImage);
    
        binBtn.removeEventListener('click', this._binButtonClick);
        this._element.remove();
    }
}