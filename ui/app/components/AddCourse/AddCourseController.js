import { AddCourseView } from './AddCourseView.js';
import { AddCourseModel } from './AddCourseModel.js';

export class AddCourseController {
    constructor({ subscribe, notify }) {
        this.view = new AddCourseView(this.handleAddCourse, this.handleCancel);
        this.model = new AddCourseModel();
        this.notify = notify;
        this.subscribe = subscribe;

        this.subscribe('ADD_COURSE', this.view.renderForm);
    }

    handleAddCourse = (event) => {
        event.preventDefault();
        const courseName = event.target['course-name'].value;
        const validationResult = this.model.validateName(courseName);

        if (!validationResult.isValid) {
            this.view.showError(validationResult.error);
        } else {
            this.model.addCourse({ name: courseName })
                .then((response) => {
                    response.ok ? this.notify('LOAD_COURSES_LIST_PAGE') : this.view.showError('Server error occurred');
                })
                .catch(() => this.view.showError('Server error occurred'));
        }
    };

    handleCancel = () => this.notify('LOAD_COURSES_LIST_PAGE');
}
