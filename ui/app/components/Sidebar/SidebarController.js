import { SidebarView } from './SidebarView.js';
import { SidebarModel } from './SidebarModel.js';

export class SidebarController {
    constructor({ subscribe, notify }) {
        this.view = new SidebarView(this.optionClickedHandler);
        this.model = new SidebarModel();
        this.subscribe = subscribe;
        this.notify = notify;

        this.subscribe('LOAD_SIDEBAR', this.onLoad);
        this.subscribe('USER_LOGOUT', this.onLogout);
    }

    onLoad = () => {
        const options = this.model.getOptionsConfig();
        this.view.renderOptions(options[this.model.getUserRole()]);
        this.view.showSidebar();
    };

    onLogout = () => {
        this.view.removeOptions();
        this.view.hideSidebar();
    };

    optionClickedHandler = (event) => {
        let publisherEvent = '';
        if (event.target.tagName !== 'LI') {
            publisherEvent = event.target.parentNode.getAttribute('data-event');
        } else {
            publisherEvent = event.target.getAttribute('data-event');
        }

        this.notify(publisherEvent);
    }
}
