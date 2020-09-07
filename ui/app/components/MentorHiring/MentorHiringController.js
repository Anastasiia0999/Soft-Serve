import { MentorHiringModel } from './MentorHiringModel.js';
import { MentorHiringView } from './MentorHiringView.js';

export class MentorHiringController {
    constructor({ subscribe, notify }) {
        this.model = new MentorHiringModel();
        this.view = new MentorHiringView(this.handleAddMentor, this.handleCancel);

        this.subscribe = subscribe;
        this.notify = notify;

        this.subscribe('HIRE_MENTOR', this.loadForm);
    }

    loadForm = () => {
        this.model.getCoursesList()
            .then((coursesList) => this.view.renderForm(coursesList));
        /* this.model.getCoursesList('http://www.json-generator.com/api/json/get/clIlTbmoOa?indent=2')
            .then((coursesList) => this.view.renderForm(coursesList)); */
    }

    handleCancel = () => {
        this.view.deleteErrors();
        this.notify('LIST_OF_MENTORS');
    }

    handleAddMentor = (ev) => {
        ev.preventDefault();
        const selectedCoursesId = [];
        const data = [...ev.target].reduce((obj, el) => {
            const dataMentor = obj;
            if (el.type !== 'submit' && el.id !== 'select' && el.name !== 'cancel-btn') {
                dataMentor[el.name] = el.value;
            } else if (el.id === 'select') {
                [...el.selectedOptions].forEach((opt) => selectedCoursesId.push(opt.index));
                dataMentor[el.name] = selectedCoursesId;
            }
            return dataMentor;
        }, {});
        const valid = this.model.dataValidation(data);
        if (valid.hasError) {
            this.view.deleteErrors();
            this.view.addError(valid.err);
        } else {
            this.model.addMentor(data)
                .then(() => {
                    this.notify('LIST_OF_MENTORS');
                })
                .catch((err) => {
                    this.view.deleteErrors();
                    this.view.addError('Problems with server');
                });
        }
    }
}
