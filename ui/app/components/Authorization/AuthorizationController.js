import { AuthorizationModel } from './AuthorizationModel.js';
import { AuthorizationView } from './AuthorizationView.js';

export class AuthorizationController {
    roleEvents = {
        1: 'LOAD_STUDY_INFO_PAGE',
        2: 'LOAD_GROUPS_LIST_PAGE',
        4: 'LOAD_MENTOR_LIST_PAGE',
    };

    constructor({ subscribe, notify }) {
        this.model = new AuthorizationModel();
        this.view = new AuthorizationView(this.handleSignIn);

        this.notify = notify;
        this.subscribe = subscribe;

        this.subscribe('LOAD_AUTHORIZATION_PAGE', this.loadPage);

        this.loadPage();
        this.handleAuthorized();
    }

    loadPage = () => {
        this.view.renderAuthorization();
    }

    handleAuthorized = () => {
        const role = this.model.getRole();
        if (role) {
            this.notifyByRole(role);
        }
    }

    notifyByRole = (role) => {
        if (!this.roleEvents[role]) {
            this.view.showServerError('Invalid role');
            return;
        }
        const event = this.roleEvents[role];
        this.notify('LOAD_SIDEBAR');
        this.notify('LOAD_HEADER');
        this.notify(event);
    }

    handleSignIn = (event) => {
        event.preventDefault();
        this.view.clearErrors();

        const { email, password } = this.model.getFormData(event);

        const error = this.model.validateForm(email, password);
        if (error.isError) {
            this.view.showErrorMessage(error.errors);
            return;
        }

        this.model.signIn(email, password)
            .then((userData) => {
                const { role } = userData;
                this.notifyByRole(role);
            })
            .catch(() => {
                this.view.showServerError('Server error');
            });
    }
}
