import { ApiClient } from '../../helpers/apiClient.js';

export class EditCourseModel {
    apiClient = new ApiClient();

    getCurrentCourse = async (id) => {
        const courses = await this.apiClient.getCourses(this.getJwt());
        return courses.find((item) => item.id === id);
    };

    getJwt = () => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        return user.jwt;
    };

    editCourse = (data, id) => this.apiClient.editCourse(data, this.getJwt(), id);

    validateName = (name) => {
        const result = {
            isValid: true,
            error: '',
        };

        if (name.trim().length < 3 || name.trim().length > 100) {
            result.isValid = false;
            result.error = 'Course name is invalid';
        }
        return result;
    };
}
