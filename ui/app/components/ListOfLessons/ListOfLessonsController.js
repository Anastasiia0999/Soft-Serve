import ListOfLessonsView from './ListOfLessonsView.js';
import { ListOfLessonsModel } from './ListOfLessonsModel.js';

export class ListOfLessonsController {
    constructor({ notify, subscribe }) {
        this.view = new ListOfLessonsView(this.onOpen);
        this.model = new ListOfLessonsModel();
        this.notify = notify;
        this.subscribe = subscribe;
        this.subscribe('LOAD_LESSONS_LIST_PAGE', this.onLoad);
    }

    onLoad = async () => {
        const data = await this.model.loadData();
        this.view.render(data);
    }

    onOpen = (event, id) => {
        event.preventDefault();
        this.notify('EDIT_LESSON', id);
    }
}
