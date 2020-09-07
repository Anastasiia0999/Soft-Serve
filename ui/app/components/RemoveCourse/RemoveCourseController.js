import { RemoveCourseView } from './RemoveCourseView.js';
import { RemoveCourseModel } from './RemoveCourseModel.js';

export class RemoveCourseController {
    constructor({ subscribe, notify }) {
        this.view = new RemoveCourseView(this.handleDelete);
        this.model = new RemoveCourseModel();
        this.subscribe = subscribe;
        this.notify = notify;

        this.subscribe('DELETE_COURSE', this.onLoad);
    }

    onLoad = async (courseInfo) => {
        this.view.renderWindow();
        this.courseId = courseInfo;
        const { name } = await this.model.getCurrentCourse(this.courseId);
        this.view.insertCourseName(name);
    };

    handleDelete = (event) => {
        event.preventDefault();
        this.view.hideError();
        this.model.deleteCourse(this.courseId)
            .then((response) => {
                if (response.ok) {
                    this.notify('LOAD_COURSES_LIST_PAGE');
                    this.view.removeWindow();
                } else {
                    this.view.showError();
                }
            })
            .catch(() => this.view.showError());
    };
}
