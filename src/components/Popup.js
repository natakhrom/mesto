export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._popupCloseButton = this._popup.querySelector('.popup__close-icon');
        this._handleEscape = evt => { this._handleEscClose(evt); };

        this._setEventListeners();
    }

    open() {
        document.addEventListener('keydown', this._handleEscape);
        this._popup.classList.add('popup_opened');
    }

    close() {
        document.removeEventListener('keydown', this._handleEscape);
        this._popup.classList.remove('popup_opened');
    }

    //** Закрытие попапа клавишей Esc */
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }
    
    //** Добавляет слушатель клика иконке закрытия попапа и оверлей */
    _setEventListeners() {
        this._popupCloseButton.addEventListener('click', () => {
            this.close();
        });

        this._popup.addEventListener('click', evt => {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        }); 
    }
}