import { ApiClient } from '../../helpers/apiClient.js';

export class StartGroupModel {
    apiClient = new ApiClient();

    getJwt = () => {
        const { jwt } = JSON.parse(localStorage.getItem('user') || '{}');
        return jwt;
    };

    getCourses = async () => this.apiClient.getCourses(this.getJwt());

    addGroup = async (data) => this.apiClient.addGroup(data, this.getJwt());

    extractFormData = (event) => [...event.target].reduce((data, formElem) => {
        const currentData = data;
        if (formElem.type !== 'reset' && formElem.type !== 'submit') {
            if (formElem.tagName === 'SELECT') {
                currentData[formElem.id] = Number(formElem.value.trim());
            } else {
                currentData[formElem.id] = formElem.value.trim();
            }
        }
        return currentData;
    }, {});

    validateForm = ({ name, start_date, finish_date, students }) => {
        const validationResult = {
            isValid: true,
            errors: [],
        };
        const dateRegExp = new RegExp(/20[0-9]{2}-((0[1-9])|(1[0-2]))-(0[1-9]|[1-2][0-9]|[3][0-1])/);
        if (!dateRegExp.test(finish_date)) {
            validationResult.errors.push('Invalid finish date');
        }
        if (!dateRegExp.test(start_date)) {
            validationResult.errors.push('Invalid start date');
        }
        if (new Date(start_date).getTime() > new Date(finish_date).getTime()) {
            validationResult.errors.push('Invalid dates');
        }
        if (name.length < 5 || name.length > 100) {
            validationResult.errors.push('Invalid group name');
        }
        if (!students) {
            validationResult.errors.push('Enter students data');
        }
        if (validationResult.errors.length) {
            validationResult.isValid = false;
        }
        return validationResult;
    };

    getStudentsIds = async ({ students }) => {
        const emailRegExp = new RegExp(/[a-zA-Z0-9@.\-_]{5,}/gm);
        const studentsEmails = students.match(emailRegExp)
            .map((studentEmail) => ({ email: studentEmail }));

        const requests = studentsEmails
            .map((studentsData) => this.apiClient.addStudent(studentsData, this.getJwt()));

        return await Promise.all(requests);
    };
}
