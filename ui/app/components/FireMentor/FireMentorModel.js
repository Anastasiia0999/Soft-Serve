import { ApiClient } from '../../helpers/apiClient.js';

export class FireMentorModel {
    constructor() {
        this.user = JSON.parse(localStorage.getItem('user') || '{}');
        this.fireMentor = ApiClient.fireMentor;
    }

    getJwt = () => this.user.jwt;

    deleteMentor = (id) => this.fireMentor(this.getJwt(), id);
}
