import cfg from '../config/common.js';

let instance = null;
export class ApiClient {
    apiBase = cfg.baseUrl;
    constructor() {
        instance = instance || this;
        return instance;
    }

    postGlobalResource = async (url, data = null, headers, method, jsonNeed = false) => {
        const res = await fetch(`${this.apiBase}${url}`,
            {
                method,
                body: data ? JSON.stringify(data) : null,
                headers: headers || null,
            });

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        if (jsonNeed) {
            return await res.json();
        }
        return await res;
    };

    //  User api
    userSignIn = async (data) => await this.postGlobalResource(cfg.userSignIn, data, { 'Content-Type': 'application/json' }, 'POST', true);
    userSignOut = async (jwt) => await this.postGlobalResource(cfg.userSignOut, null, { Authorization: jwt }, 'DELETE', false);

    //  Courses api
    addCourse = async (data, jwt) => await this.postGlobalResource(cfg.addCourse, data, { Authorization: jwt, 'Content-Type': 'application/json' }, 'POST', false);
    getCourses = async (jwt) => await this.postGlobalResource(cfg.getCourses, null, { Authorization: jwt }, 'GET', true);
    editCourse = async (data, jwt, id) => await this.postGlobalResource(`${cfg.editCourse}/${id}`, data, { Authorization: jwt, 'Content-Type': 'application/json' }, 'PUT', false);
    deleteCourse = async (jwt, id) => await this.postGlobalResource(`${cfg.deleteCourse}/${id}`, null, { Authorization: jwt }, 'DELETE', false);

    //  Mentors api
    hireMentor = async (data, jwt) => await this.postGlobalResource(cfg.hireMentor, data, { Authorization: jwt, 'Content-Type': 'application/json' }, 'POST', false);
    getListOfMentors = async (jwt) => await this.postGlobalResource(cfg.getListOfMentors, null, { Authorization: jwt }, 'GET', true);
    editMentor = async (data, jwt, id) => await this.postGlobalResource(`${cfg.editMentor}/${id}`, data, { Authorization: jwt, 'Content-Type': 'application/json' }, 'PUT', false);
    fireMentor = async (jwt, id) => await this.postGlobalResource(`${cfg.fireMentor}/${id}`, null, { Authorization: jwt }, 'DELETE', false);

    //  Groups api
    addGroup = async (data, jwt) => await this.postGlobalResource(cfg.addGroup, data, { Authorization: jwt, 'Content-Type': 'application/json' }, 'POST', false);
    getAllGroups = async (jwt) => await this.postGlobalResource(cfg.getAllGroups, null, { Authorization: jwt }, 'GET', true);
    editGroup = async (data, jwt, id) => await this.postGlobalResource(`${cfg.editGroup}/${id}`, data, { Authorization: jwt, 'Content-Type': 'application/json' }, 'PUT', false);
    getGroupDetails = async (jwt, id) => await this.postGlobalResource(`${cfg.getGroupDetails}/${id}`, null, { Authorization: jwt }, 'GET', true);
    deleteGroup = async (jwt, id) => await this.postGlobalResource(`${cfg.deleteGroup}/${id}`, null, { Authorization: jwt }, 'DELETE', false);

    //  Students api
    addStudent = async (data, jwt) => await this.postGlobalResource(cfg.addStudent, data, { Authorization: jwt, 'Content-Type': 'application/json' }, 'POST', true);
    getAllStudents = async (jwt) => await this.postGlobalResource(cfg.getAllStudents, null, { Authorization: jwt }, 'GET', true);
    getStudentById = async (jwt, id) => await this.postGlobalResource(`${cfg.getStudentById}/${id}`, null, {Authorization: jwt, 'Content-Type': 'application/json' }, 'GET', true);
    editStudent = async (data, jwt, id) => await this.postGlobalResource(`${cfg.editStudent}/${id}`, data, { Authorization: jwt, 'Content-Type': 'application/json' }, 'PUT', false);
    deleteStudent = async (jwt, id) => await this.postGlobalResource(`${cfg.deleteStudent}/${id}`, null, { Authorization: jwt }, 'DELETE', false);

    //  Lessons api
    addLesson = async (data, jwt) => await this.postGlobalResource(cfg.addLesson, data, { Authorization: jwt, 'Content-Type': 'application/json' }, 'POST', false);
    editLesson = async (data, jwt, id) => await this.postGlobalResource(`${cfg.editLesson}/${id}`, data, { Authorization: jwt, 'Content-Type': 'application/json' }, 'PUT', false);
    getAllLessons = async (jwt) => await this.postGlobalResource(cfg.getAllLessons, null, { Authorization: jwt }, 'GET', true);
    getAllLessonsByGroup = async (jwt, id) => await this.postGlobalResource(`${cfg.getAllLessonsByGroup}/${id}`, null, { Authorization: jwt }, 'GET', true);
    getAllLessonsByCourse = async (jwt, id) => await this.postGlobalResource(`${cfg.getAllLessonsByCourse}/${id}`, null, { Authorization: jwt }, 'GET', true);
    getAllLessonsByMentor = async (jwt, id) => await this.postGlobalResource(`${cfg.getAllLessonsByMentor}/${id}`, null, { Authorization: jwt }, 'GET', true);
    getAllLessonsByStudent = async (jwt, id) => await this.postGlobalResource(`${cfg.getAllLessonsByStudent}/${id}`, null, { Authorization: jwt }, 'GET', true);
    deleteGroupFromLesson = async (jwt, id) => await this.postGlobalResource(`${cfg.deleteGroupFromLesson}/${id}`, null, { Authorization: jwt }, 'DELETE', false);

    //  Themes api
    getThemes = async (jwt) => await this.postGlobalResource(cfg.getThemes, null, { Authorization: jwt }, 'GET', true);
}
