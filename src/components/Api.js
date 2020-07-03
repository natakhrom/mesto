export default class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _request(path, payload, callback) {
        return fetch(path, payload) 
            .then(res => {  
                if (res.ok) {
                    return res.json();
                }
                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then(callback)
            .catch(err => {
                console.log(err); // выведем ошибку в консоль
            });
    }

    _requestWithoutCatch(path, payload) {
        return fetch(path, payload) 
        .then(res => {  
            if (res.ok) {
                return res.json();
            }
            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    getUserInfo() {
        return this._requestWithoutCatch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        });
    }

    getInitialCards() {
        return this._requestWithoutCatch(`${this._baseUrl}/cards`, {
            headers: this._headers
        });
    }

    patchEditProfile(name, about, callback) {
        return this._request(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        }, callback);
    }

    postAddNewCard(name, link, callback) {
        return this._request(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify ({
                name: name,
                link: link
            })
        }, callback);
    }

    patchNewAvatar(link, callback) {
        return this._request(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify ({
                avatar: link
            })
        }, callback);
    }

    deleteCard(cardId, callback) {
        return this._request(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        }, callback);
    }

    putLike(cardId, callback) {
        return this._request(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this._headers
        }, callback);
    }

    deleteLike(cardId, callback) {
        return this._request(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        }, callback);
    }
}