export default class UserInfo {
    constructor(userNameSelector, userAboutSelector) {
        this._userName = document.querySelector(userNameSelector);
        this._userAbout = document.querySelector(userAboutSelector);
    }

    getUserInfo() {
        const userCard = {
            'name': this._userName.textContent,
            'about': this._userAbout.textContent
        };

        return userCard;
    }

    setUserInfo({ firstname, about }) {
        this._userName.textContent = firstname;
        this._userAbout.textContent = about;
    }
}