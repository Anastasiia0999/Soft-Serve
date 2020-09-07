import { EditLessonModel } from './EditLessonModel.js';
import { EditLessonView } from './EditLessonView.js';

export class EditLessonController {
    constructor({ subscribe, notify }) {
        this.model = new EditLessonModel();
        this.view = new EditLessonView(this.handleEditLesson, this.handleCancel);

        this.subscribe = subscribe;
        this.notify = notify;

        this.subscribe('EDIT_LESSON', this.loadForm);
    }

    loadForm = (idLesson) => {
        this.idLesson = idLesson;
        this.view.renderForm();
    }

    handleCancel = () => {
        this.view.deleteErrors();
        this.notify('LOAD_LESSONS_LIST_PAGE');
    }

    handleEditLesson = (ev) => {
        ev.preventDefault();
        const data = this.model.submitForm(ev);
        const objError = this.model.dataValidation(data);
        if (objError.hasError) {
            this.view.deleteErrors();
            objError.errArr.forEach((el) => {
                this.view.addError(el);
            });
        } else {
            this.view.deleteErrors();
            this.model.editLesson(data, this.idLesson)
                .then(() => {
                    this.notify('LOAD_LESSONS_LIST_PAGE');
                })
                .catch((err) => {
                    this.view.deleteErrors();
                    this.view.addError('Problems with server');
                });
        }
    }
}
