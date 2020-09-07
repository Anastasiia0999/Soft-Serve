import { ApiClient } from '../../helpers/apiClient.js';

export class ListOfGroupsModel {
    apiClient = new ApiClient();

    getData = async () => {
        const { jwt } = JSON.parse(localStorage.getItem('user') || '{}');
        return this.apiClient.getAllGroups(jwt);
    }
}
