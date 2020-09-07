import { ListOfCoursesModel } from './ListOfCoursesModel.js';
import { ListOfCoursesView } from './ListOfCoursesView.js';

export class ListOfCoursesController {
    constructor({ notify, subscribe }) {
        this.model = new ListOfCoursesModel();
        this.view = new ListOfCoursesView(this.editCourse, this.deleteCourse);

        this.notify = notify;
        this.subscribe = subscribe;

        this.subscribe('LOAD_COURSES_LIST_PAGE', this.onLoad);
    }

    onLoad = () => {
        const role = this.model.getUserRole();
        this.model.getCoursesList()
            .then((coursesList) => this.view.renderList(coursesList, role));
    }

    editCourse = (event, id) => {
        event.preventDefault();
        this.notify('EDIT_COURSE', id);
    }

     deleteCourse = (event, id) => {
         event.preventDefault();
         this.notify('DELETE_COURSE', id);
     }
}
