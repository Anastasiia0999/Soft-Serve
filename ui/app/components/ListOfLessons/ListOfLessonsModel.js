import { ApiClient } from '../../helpers/apiClient.js';

export class ListOfLessonsModel {
    ApiClient = new ApiClient();

    loadData = async () => {
        const { jwt } = JSON.parse(localStorage.getItem('user') || '{}');
        return this.ApiClient.getAllLessons(jwt);
    }
}
