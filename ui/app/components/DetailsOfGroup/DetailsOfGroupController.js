import { DetailsOfGroupModel } from './DetailsOfGroupModel.js';
import { DetailsOfGroupView } from './DetailsOfGroupView.js';

export class DetailsOfGroupController {
    constructor({ subscribe, notify }) {
        this.model = new DetailsOfGroupModel();
        this.view = new DetailsOfGroupView(this.handleGoToEditGroupView, this.handleGoToDeleteGroupView);
        this.subscribe = subscribe;
        this.notify = notify;

        this.subscribe('GROUP_DETAILS', this.loadData);
    }

    loadData = async (groupId) => {
        const data = await this.model.loadData(groupId);
        const { student_ids, mentor_ids } = data;
        data.students = await this.model.loadStudentsData(student_ids);
        data.mentors = await this.model.loadMentors(mentor_ids);
        this.view.render(data);
    };

    handleGoToEditGroupView = (id, group_name, start_date, finish_date) => {
        this.notify('LOAD_EDIT_GROUP_PAGE', { id, group_name, start_date, finish_date });
    };

    handleGoToDeleteGroupView = (id) => {
        this.notify('DELETE_GROUP', { id });
    };
}
