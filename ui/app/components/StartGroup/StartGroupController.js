import { StartGroupModel } from './StartGroupModel.js';
import { StartGroupView } from './StartGroupView.js';

export class StartGroupController {
    constructor({ subscribe, notify }) {
        this.model = new StartGroupModel();
        this.view = new StartGroupView(this.handleCreateGroup);
        this.subscribe = subscribe;
        this.notify = notify;

        this.subscribe('START_GROUP', this.onLoad);
    }

    onLoad = async () => {
        this.view.renderForm();
        const courses = await this.model.getCourses();
        this.view.renderCourses(courses);
    };

    handleCreateGroup = async (event) => {
        event.preventDefault();
        const formData = this.model.extractFormData(event);

        const validationResult = this.model.validateForm(formData);
        if (validationResult.isValid) {
            this.view.clearErrors();
            try {
                formData.student_ids = await this.model.getStudentsIds(formData);
            } catch (e) {
                this.view.renderErrors(['Unable to load students.']);
                return;
            }
            delete formData.students;

            this.model.addGroup(formData)
                .then((response) => {
                    response.ok ? this.notify('LOAD_GROUPS_LIST_PAGE') : this.view.renderErrors(['An error occurred. Try again later.']);
                    alert('Group successfully created');
                })
                .catch(() => this.view.renderErrors(['An error occurred. Try again later.']));
        } else {
            this.view.renderErrors(validationResult.errors);
        }
    }
}
