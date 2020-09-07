import { ApiClient } from '../../helpers/apiClient.js';

export class DeleteStudentModel {
    constructor() {
        this.user = JSON.parse(localStorage.getItem('user') || '{}');
        this.apiClient = new ApiClient();
    }

    getJwt = () => this.user.jwt;

    getStudentById = (id) => this.apiClient.getStudentById(this.getJwt(),id);


    removeStudent = (id) => this.apiClient.deleteStudent(this.getJwt(), id);
}
