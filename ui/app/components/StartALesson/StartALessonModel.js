import { ApiClient } from '../../helpers/apiClient.js';

export class StartALessonModel {
    apiClient = new ApiClient();

    sendData = async (data) => {
        const { jwt } = JSON.parse(localStorage.getItem('user' || '{}'));
        return this.apiClient.addLesson(data, jwt);
    }

    getStudents = async (studentIds) => {
        const { jwt } = JSON.parse(localStorage.getItem('user') || '{}');
        const requests = studentIds.map((id) => this.apiClient.getStudentById(jwt, id));

        const students = await Promise.all(requests);
        const studentsWithIds = students.map((student, index) => ({
            id: studentIds[index],
            ...student,
        }));

        return studentsWithIds;
    }

    getGroup = async (id) => {
        const { jwt } = JSON.parse(localStorage.getItem('user') || '{}');
        return this.apiClient.getGroupDetails(jwt, id);
    }

    getGroups = async () => {
        const { jwt } = JSON.parse(localStorage.getItem('user') || '{}');
        return this.apiClient.getAllGroups(jwt);
    }

    getData = (event) => {
        const lessonVisits = {};
        const data = [...event.target].reduce((obj, el) => {
            if (el.type !== 'reset' && el.type !== 'submit') {
                obj[el.name] = el.value;
            }
            if (el.name === 'mark') {
                lessonVisits[el.id] = {
                    ...lessonVisits[el.id],
                    student_mark: el.value,
                };
            }
            if (el.name === 'presence') {
                lessonVisits[el.id] = {
                    ...lessonVisits[el.id],
                    presence: el.checked,
                };
            }
            if (el.name === 'comment') {
                lessonVisits[el.id] = {
                    ...lessonVisits[el.id],
                    comment: el.value,
                };
            }
            return obj;
        }, {});
        const convertedData = this.convertData(data, lessonVisits);
        return convertedData;
    }

    convertData = (lessonInfo, lessonVisits) => {
        const { theme_name, lesson_date, group_id } = lessonInfo;

        const lesson_visits = [];
        Object.entries(lessonVisits).forEach(([key, value]) => {
            if (value.presence) {
                value.student_id = key;
                lesson_visits.push(value);
            }
        });

        return {
            theme_name,
            group_id,
            lesson_date: `${lesson_date.replace('T', ' ')}:00`,
            lesson_visits,
        };
    }
}
