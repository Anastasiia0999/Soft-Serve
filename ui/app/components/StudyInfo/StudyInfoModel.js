import { ApiClient } from '../../helpers/apiClient.js';

export class StudyInfoModel {
    apiClient = new ApiClient();

    getStudyInfo = async () => {
        const { id, jwt } = JSON.parse(localStorage.getItem('user') || '{}');
        return this.apiClient.getAllLessonsByStudent(jwt, id);
    }

    getAdditionalInfo = (lessons) => {
        const { first_name, last_name } = JSON.parse(localStorage.getItem('user') || '{}');
        let sumOfMark = 0;
        let amountOfPresence = 0;

        lessons.forEach((lesson) => {
            sumOfMark += lesson.mark;
            amountOfPresence += lesson.presence;
        });

        const averageMark = (sumOfMark / lessons.length).toFixed(1);
        const rate = sumOfMark + amountOfPresence;

        return {
            averageMark,
            rate,
            first_name,
            last_name,
        };
    }
}
