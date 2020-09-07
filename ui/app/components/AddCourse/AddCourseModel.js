import { ApiClient } from '../../helpers/apiClient.js';

export class AddCourseModel {
    apiClient = new ApiClient();

    addCourse = async (data) => {
        const { jwt } = JSON.parse(localStorage.getItem('user') || '{}');
        return this.apiClient.addCourse(data, jwt);
    };

    validateName = (name) => {
        const result = {
            isValid: true,
            error: '',
        };

        if (!name.trim() || name.trim().length > 100) {
            result.isValid = false;
            result.error = 'Course name is invalid';
        }
        return result;
    };
}
