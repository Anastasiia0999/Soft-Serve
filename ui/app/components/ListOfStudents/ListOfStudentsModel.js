import { ApiClient } from '../../helpers/apiClient.js';

export class ListOfStudentsModel {
    apiClient = new ApiClient();

    loadData = async () => {
        const { jwt } = JSON.parse(localStorage.getItem('user') || '{}');
        return this.apiClient.getAllStudents(jwt);
    }
}
