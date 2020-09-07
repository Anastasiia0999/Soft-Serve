import { DeleteStudentModel } from './DeleteStudentModel.js';
import { DeleteStudentView } from './DeleteStudentView.js';

export class DeleteStudentController {
    constructor({ subscribe, notify }) {
        this.view = new DeleteStudentView(this.handleDeleteStudent);
        this.model = new DeleteStudentModel();

        this.subscribe = subscribe;
        this.notify = notify;

        this.subscribe('DELETE_STUDENT', this.modalLoad);
    }

    modalLoad = (idStudent) => {
        this.idStudent = idStudent;

        this.model.getStudentById(idStudent)
            .then((student) =>{
                this.view.renderModal(student.first_name, student.last_name);
            })
    };

    handleDeleteStudent = (event) => {
        event.preventDefault();
        this.model.removeStudent(this.idStudent)
            .then(() => {
                this.view.deleteModal();
                this.notify('LOAD_STUDENTS_LIST_PAGE');
            })
            .catch((err) => {
                this.view.addError('Problems with server');
            });
    };
}
