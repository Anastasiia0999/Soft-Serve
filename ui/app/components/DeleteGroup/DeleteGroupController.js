import { DeleteGroupModel } from './DeleteGroupModel.js';
import { DeleteGroupView } from './DeleteGroupView.js';

export class DeleteGroupController {
    constructor({ subscribe, notify }) {
        this.view = new DeleteGroupView(this.handleDelete);
        this.model = new DeleteGroupModel();
        this.subscribe = subscribe;
        this.notify = notify;

        this.subscribe('DELETE_GROUP', this.onLoad);
    }

    onLoad = async ({ id }) => {
        this.groupId = id;
        this.view.renderWindow();
        const { group_name } = await this.model.getCurrentGroup(this.groupId);
        this.view.updateGroupName(group_name);
    };

    handleDelete = (event) => {
        event.preventDefault();
        this.view.hideError();
        this.model.deleteGroup(this.groupId)
            .then((response) => {
                if (response.ok) {
                    this.view.removeWindow();
                    this.notify('LOAD_GROUPS_LIST_PAGE');
                } else {
                    this.view.displayError();
                }
            })
            .catch(() => this.view.displayError());
    };
}
