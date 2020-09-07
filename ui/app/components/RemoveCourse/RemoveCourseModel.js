import { ApiClient } from '../../helpers/apiClient.js';

export class RemoveCourseModel {
    apiClient = new ApiClient();

    getJwt = () => {
        const { jwt } = JSON.parse(localStorage.getItem('user') || '{}');
        return jwt;
    };

    deleteCourse = async (id) => await this.apiClient.deleteCourse(this.getJwt(), id);

    getCurrentCourse = async (id) => {
        const courses = await this.apiClient.getCourses(this.getJwt());
        return courses.find((course) => course.id === id);
    };
}
