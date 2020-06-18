export default class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._title = data.title;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        //** забираем размеку из HTML и клонируем элемент */ 
        const cardElement = document
            .querySelector(this._cardSelector).content
            .querySelector('.card')
            .cloneNode(true);
    
        //** вернём DOM-элемент карточки */ 
        return cardElement;
    }

    generateCard() {
        //** Запишем разметку в приватное поле _element.  */ 
        //** Так у других элементов появится доступ к ней. */ 
        this._element = this._getTemplate();
        this._imageElement = this._element.querySelector('.card__image');
        this._buttonLike = this._element.querySelector('.card__button-like');
        this._buttonTrash = this._element.querySelector('.card__button-trash');

        this._setEventListeners(); //** Добавили обработчики */ 
      
        // Добавим данные
        this._imageElement.src = this._link;
        this._imageElement.alt = `фото ${this._title}`;
        this._element.querySelector('.card__text').textContent = this._title;
      
        //** Вернём элемент наружу */ 
        return this._element;
    }

    _setEventListeners() {
        this._buttonLike.addEventListener('click', () => {
            this._likeButtonClick();
        });

        this._imageElement.addEventListener('click', () => {
            this._handleCardClick({
                'title': this._title,
                'link': this._link
            });
        });

        this._buttonTrash.addEventListener('click', () => {
            this._binButtonClick();
        });
    }

    _likeButtonClick() {
        this._buttonLike.classList.toggle('card__button-like_active');
    }

    _binButtonClick() {
        this._element.remove();
        this._element = null;
    }
}