import { StartALessonModel } from './StartALessonModel.js';
import { StartALessonView } from './StartALessonView.js';

export class StartALessonController {
    constructor({ subscribe, notify }) {
        this.handles = {
            handleGroupSelect: this.handleGroupSelect,
            handleCreateLesson: this.handleCreateLesson,
        };
        this.model = new StartALessonModel();
        this.view = new StartALessonView(this.handles);
        this.subscribe = subscribe;
        this.notify = notify;
        this.subscribe('START_LESSON', this.onLoad);
    }

    onLoad = () => {
        this.model.getGroups().then((groups) => {
            this.view.render(groups);
        });
    }

    handleCreateLesson = (event) => {
        event.preventDefault();        
        const data = this.model.getData(event);
        this.model.sendData(data).then(() => {
            this.notify('LOAD_LESSONS_LIST_PAGE');
        });
    }

    handleGroupSelect = (event) => {
        const id = event.target.value;
        this.model.getGroup(id).then(({ student_ids }) => {
            this.model.getStudents(student_ids).then((students) => {
                this.view.renderStudents(students);
            });
        });
    }
}
