import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        this._magnifiedImage = this._popup.querySelector('.popup__big-image');
        this._magnifiedCaption = this._popup.querySelector('.popup__text-image');
    }

    open( {title, link} ) {
        this._magnifiedImage.src = link;
        this._magnifiedImage.alt = `фото ${title}`;
        this._magnifiedCaption.textContent = title;        
        
        super.open();
    }
}