export class HeaderModel {
    get user() {
        return JSON.parse(localStorage.getItem('user') || '{}');
    }

    logout = () => localStorage.removeItem('user');
}
