import { ApiClient } from '../../helpers/apiClient.js';
import cfg from '../../config/common.js';

export class AuthorizationModel {
    apiClient = new ApiClient();
    user = JSON.parse(localStorage.getItem('user') || '{}');

    checkIfAuthorized = () => Object.keys(this.user).length > 0;

    getRole = () => this.user.role;

    validateForm = (email, password) => {
        const error = {
            isError: false,
            errors: [],
        };

        const emailRegExp = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i);

        if (!emailRegExp.test(email)) {
            error.isError = true;
            error.errors.push('invalid email');
        }

        if (password.length < 3 || password.length > 30) {
            error.isError = true;
            error.errors.push('invalid password');
        }

        return error;
    }

    getFormData = (event) => {
        const data = [...event.target].reduce((obj, el) => {
            const dataObj = obj;
            if (el.type !== 'submit') {
                dataObj[el.name] = el.value;
            }
            return dataObj;
        }, {});

        return {
            email: data['signin-form__email'],
            password: data['signin-form__password'],
        };
    }

    signIn = async (email, password) => {
        const data = { email, password };

        const response = await fetch(`${cfg.baseUrl}/api/auth`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        const jwt = response.headers.get('authorization');
        const userInfo = await response.json();
        this.setToLocalStorage({ jwt, ...userInfo });

        return { jwt, ...userInfo };
    }

    setToLocalStorage = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
    }
}
