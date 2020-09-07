import { ApiClient } from '../../helpers/apiClient.js';

export class EditLessonModel {
    constructor() {
        this.apiClient = new ApiClient();
    }

    editLesson = (data, id) => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        return this.apiClient.editLesson(data, user.jwt, id);
    }

    dataValidation = (obj) => {
        const errorObj = {
            hasError: false,
            errArr: [],
        };
        
        for (const el in obj) {
            switch (el) {
            case 'theme_name': {
                const theme = obj[el];
                if (!theme.trim() || theme.length > 50) {
                    errorObj.hasError = true;
                    errorObj.errArr.push('Invalid theme');
                }
            }
                break;
            case 'lesson_date': {
                const date = obj[el];
                if (!date.trim()) {
                    errorObj.hasError = true;
                    errorObj.errArr.push('Invalid date');
                } else {
                    obj[el] = date.replace('T', ' ');
                    obj[el] += ':00';
                }
            }
                break;
            default: {
                errorObj.hasError = true;
                errorObj.errArr.push('No fields were changed');
            }
            }
        }

        return errorObj;
    }

    submitForm = (ev) => {
        const data = [...ev.target].reduce((obj, el) => {
            const dataMentor = obj;
            if (el.type !== 'submit' && el.id !== 'select' && el.name !== 'cancel-btn' && el.className.indexOf('changed') >= 0) {
                dataMentor[el.name] = el.value;
            }
            return dataMentor;
        }, {});
        return data;
    }
}
