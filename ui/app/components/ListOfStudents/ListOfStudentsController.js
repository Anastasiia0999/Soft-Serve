import { ListOfStudentsModel } from './ListOfStudentsModel.js';
import { ListOfStudentsView } from './ListOfStudentsView.js';

export class ListOfStudentsController {
    constructor({ subscribe, notify }) {
        this.view = new ListOfStudentsView(this.onStudentEdit, this.onStudentDetails,
            this.onStudentDelete);
        this.model = new ListOfStudentsModel();
        this.notify = notify;
        this.subscribe = subscribe;
        this.subscribe('LOAD_STUDENTS_LIST_PAGE', this.onLoad);
    }

    onLoad = async () => {
        const data = await this.model.loadData();
        this.view.render(data);
    }

    onStudentEdit = (studentId) => {
        this.notify('LOAD_EDIT_STUDENT_PAGE', { studentId });
        console.log('Start edit', studentId);
    }

    onStudentDetails = (studentId) => {
        this.notify('STUDENT_DETAILS', { studentId });
        console.log('Details Student', studentId);
    }

    onStudentDelete = (studentId) => {
        this.notify('DELETE_STUDENT', studentId);
        console.log('Delete Student', studentId);
    }
}
