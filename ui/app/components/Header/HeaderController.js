import { HeaderModel } from './HeaderModel.js';
import { HeaderView } from './HeaderView.js';

export class HeaderController {
    constructor({ subscribe, notify }) {
        this.view = new HeaderView(this.onLogout);
        this.model = new HeaderModel();
        this.subscribe = subscribe;
        this.notify = notify;
        this.onLoad();
        this.subscribe('LOAD_HEADER', this.onLoad);
    }

    onLoad = () => this.model.user.id && this.view.render(this.model.user);

    onLogout = () => {
        this.model.logout();
        this.view.hide();
        this.notify('LOAD_AUTHORIZATION_PAGE');
        this.notify('USER_LOGOUT');
    }
}
