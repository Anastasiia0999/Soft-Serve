import { EditCourseView } from './EditCourseView.js';
import { EditCourseModel } from './EditCourseModel.js';

export class EditCourseController {
    constructor({ subscribe, notify }) {
        this.view = new EditCourseView(this.handleAddCourse, this.handleCancel);
        this.model = new EditCourseModel();
        this.subscribe = subscribe;
        this.notify = notify;

        this.subscribe('EDIT_COURSE', this.onLoad);
    }

    onLoad = async (courseInfo) => {
        this.view.renderForm();
        this.courseId = courseInfo;
        const { name } = await this.model.getCurrentCourse(this.courseId);
        this.view.renderInput(name);
    };

    handleAddCourse = (event) => {
        event.preventDefault();
        const courseName = event.target['course-name'].value;
        const validationResult = this.model.validateName(courseName);

        if (!validationResult.isValid) {
            this.view.showError(validationResult.error);
        } else {
            this.model.editCourse({ name: courseName }, this.courseId)
                .then((response) => {
                    response.ok ? this.notify('LOAD_COURSES_LIST_PAGE') : this.view.showError('Server error occurred');
                })
                .catch(() => this.view.showError('Server error occurred'));
        }
    };

    handleCancel = () => this.notify('LOAD_COURSES_LIST_PAGE');
}
