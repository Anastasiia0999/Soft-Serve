import { ApiClient } from '../../helpers/apiClient.js';

export class MentorHiringModel {
    constructor() {
        this.API = new ApiClient();
    }

    addMentor = (mentorData) => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        return this.API.hireMentor(mentorData, user.jwt);
    }

    getCoursesList = () => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        return this.API.getCourses(user.jwt);
    }

    dataValidation = ({ name, surname, email }) => {
        const errorObj = {
            hasError: false,
            err: '',
        };

        const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        if (!pattern.test(email) || !name.trim() || !surname.trim()) {
            errorObj.hasError = true;
            errorObj.err = 'Fill in all fields';
        }
        return errorObj;
    }
}
