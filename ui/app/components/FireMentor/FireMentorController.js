import { FireMentorModel } from './FireMentorModel.js';
import { FireMentorView } from './FireMentorView.js';

export class FireMentorController {
    constructor({ subscribe, notify }) {
        this.view = new FireMentorView(this.handleDeleteMentor);
        this.model = new FireMentorModel();

        this.subscribe = subscribe;
        this.notify = notify;

        this.subscribe('DELETE_MENTOR', this.modalLoad);
    }

    modalLoad = (dataMentor) => {
        this.idMentor = dataMentor.id;

        this.view.renderModal(dataMentor.name);
    };

    handleDeleteMentor = (event) => {
        event.preventDefault();
        this.model.deleteMentor(this.idMentor)
            .then(() => {
                this.view.deleteModal();
                this.notify('LIST_OF_MENTORS');
            })
            .catch((err) => {
                this.view.addError('Problems with server');
            });
    };
}
