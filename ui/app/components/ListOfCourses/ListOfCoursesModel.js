import { ApiClient } from '../../helpers/apiClient.js';

export class ListOfCoursesModel {
    apiClient = new ApiClient();

    getCoursesList = async () => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        return this.apiClient.getCourses(user.jwt);
    }

    getUserRole = () => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        return user.role;
    }
}
