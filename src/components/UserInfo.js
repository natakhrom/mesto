export default class UserInfo {
    constructor(userNameSelector, userAboutSelector, userAvatarSelector) {
        this._userName = document.querySelector(userNameSelector);
        this._userAbout = document.querySelector(userAboutSelector);
        this._link = document.querySelector(userAvatarSelector);
    }

    getUserInfo() {
        return {
            'name': this._userName.textContent,
            'about': this._userAbout.textContent
        };
    }

    setUserInfo({ name, about }) {
        this._userName.textContent = name;
        this._userAbout.textContent = about;
    }

    setAvatarImage({avatar}) {
        this._link.style.backgroundImage = `url('${avatar}')`;
    }
}