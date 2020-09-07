import { ListOfGroupsModel } from './ListOfGroupsModel.js';
import { ListOfGroupsView } from './ListOfGroupsView.js';

export class ListOfGroupsController {
    constructor({ subscribe, unsubscribe, notify }) {
        this.model = new ListOfGroupsModel();
        this.view = new ListOfGroupsView(this.handleInfoLoad);
        this.subscribe = subscribe;
        this.unsubscribe = unsubscribe;
        this.notify = notify;
        this.subscribe('LOAD_GROUPS_LIST_PAGE', this.onPageLoad);
    }

    onPageLoad = async () => {
        const data = await this.model.getData();
        this.view.render(data);
    }

    handleInfoLoad = (groupId) => {
        this.notify('GROUP_DETAILS', groupId);
    }
}
