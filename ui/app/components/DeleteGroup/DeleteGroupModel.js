import { ApiClient } from '../../helpers/apiClient.js';

export class DeleteGroupModel {
    apiClient = new ApiClient();

    getJwt = () => {
        const { jwt } = JSON.parse(localStorage.getItem('user') || '{}');
        return jwt;
    };

    getCurrentGroup = async (id) => await this.apiClient.getGroupDetails(this.getJwt(), id);

    deleteGroup = async (id) => await this.apiClient.deleteGroup(this.getJwt(), id);
}
