class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _request(path, payload) {
        return fetch(path, payload) 
            .then(res => {  
                if (res.ok) {
                    return res.json();
                }
                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch(err => {
                console.log(err); // выведем ошибку в консоль
            });
    }

    getUserInfo() {
        return this._request(`${this._baseUrl}/users/me`, {
            headers: this._headers
        });
    }

    getInitialCards() {
        return this._request(`${this._baseUrl}/cards`, {
            headers: this._headers
        });
    }

    patchEditProfile(name, about) {
        return this._request(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        });
    }

    postAddNewCard(name, link) {
        return this._request(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify ({
                name: name,
                link: link
            })
        });
    }

    patchNewAvatar(link) {
        return this._request(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify ({
                avatar: link
            })
        });
    }

    deleteCard(cardId) {
        return this._request(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        });
    }

    putLike(cardId) {
        return this._request(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this._headers
        });
    }

    deleteLike(cardId) {
        return this._request(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        });
    }
}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12',
    headers: {
      authorization: 'bc2f7d16-f7fa-49da-ae6d-059f2268552e',
      'Content-Type': 'application/json'
    }
});