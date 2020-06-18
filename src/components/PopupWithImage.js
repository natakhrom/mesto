import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor({title, link}, popupSelector) {
        super(popupSelector);

        this._title = title;
        this._link = link;

        this._magnifiedImage = this._popup.querySelector('.popup__big-image');
        this._magnifiedCaption = this._popup.querySelector('.popup__text-image');
    }

    open() {
        this._magnifiedImage.src = this._link;
        this._magnifiedImage.alt = `фото ${this._title}`;
        this._magnifiedCaption.textContent = this._title;        
        
        super.open();
    }
}