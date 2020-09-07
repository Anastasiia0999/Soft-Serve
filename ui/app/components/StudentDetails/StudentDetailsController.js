import { StudentDetailsModel } from './StudentDetailsModel.js';
import { StudentDetailsView } from './StudentDetailsView.js';

export class StudentDetailsController {
    constructor({ subscribe, notify }) {
        this.model = new StudentDetailsModel();
        this.view = new StudentDetailsView(this.handleEditStudent);

        this.subscribe = subscribe;
        this.notify = notify;

        this.subscribe('LOAD_STUDENT_DETAILS_PAGE', this.loadPage);
    }

    handleEditStudent = () => {
        this.notify('LOAD_EDIT_STUDENT_PAGE');
    }

    loadPage = () => {
        this.model.getStudentData().then((data) => this.view.renderComponent(data));
    }
}
