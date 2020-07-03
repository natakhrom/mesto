export default class Card {
    constructor(data, userId, cardSelector, handleCardClick, handleCardRemove, handleLikeClick) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._cardId = data._id;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleCardRemove = handleCardRemove;
        this._handleLikeClick = handleLikeClick;
        this._removable = data.owner._id === userId;
        this._liked = this._likes.some(item => item._id === userId);
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
        this._likesCounter = this._element.querySelector('.card__counter-likes');

        if (!this._removable) {
            this._buttonTrash.classList.add('card__button-trash_hide');
        }

        if (this._liked) {
            this._buttonLike.classList.add('card__button-like_active');
        }

        this._setEventListeners(); //** Добавили обработчики */ 
      
        // Добавим данные
        this._imageElement.src = this._link;
        this._imageElement.alt = `фото ${this._name}`;
        this._element.querySelector('.card__text').textContent = this._name;
        this._likesCounter.textContent = this._likes.length;
      
        //** Вернём элемент наружу */ 
        return this._element;
    }

    remove() {
        this._element.remove();
        this._element = null;
    }

    getCardId() {
        return this._cardId;
    }

    getCardLiked() {
        return this._liked;
    }

    switchLikeButton() {
        this._liked = !this._liked;
        this._buttonLike.classList.toggle('card__button-like_active');
    }

    setActualLikeCounter(count) {
        this._likesCounter.textContent = count;
    }

    _setEventListeners() {
        this._buttonLike.addEventListener('click', () => {
            this._handleLikeClick(this);
        });

        this._imageElement.addEventListener('click', () => {
            this._handleCardClick({
                'title': this._name,
                'link': this._link
            });
        });

        if (this._removable) {
            this._buttonTrash.addEventListener('click', () => {
                this._handleCardRemove(this);
            });
        }
    }
}