export default class Section {
    constructor({data, renderer}, containerSelector) {
        this._arrayCards = data;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem(item) {
        this._container.prepend(item);
    }

    renderItems() {
        this._arrayCards.forEach(item => { 
            this._renderer(item);
        });
    }
}