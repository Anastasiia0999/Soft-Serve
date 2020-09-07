import { EditStudentModel } from './EditStudentModel.js';
import { EditStudentView } from './EditStudentView.js';

export class EditStudentController {
	constructor({ subscribe, unsubscribe, notify }) {
		this.model = new EditStudentModel();
		this.view = new EditStudentView(this.handleEditStudent, this.handleCloseEditStudent);

		// Publisher methods
		this.subscribe = subscribe;
		this.unsubscribe = unsubscribe;
		this.notify = notify;

		this.subscribe('LOAD_EDIT_STUDENT_PAGE', this.loadPage);
	}

	handleEditStudent = (id, data) => {
		const res = EditStudentModel.validateData(data);

		if (res.ok) {
			this.view.resetErrors();
			this.model.editStudent(id, data)
				.then(ok => {
					if(ok) {
						this.notify('LOAD_STUDENTS_LIST_PAGE', id);
					}
				});
		} else {
			EditStudentView.showErrors(res.errors);
		}
	};

	loadPage = ({studentId}) => {
		this.model.fetchData(studentId).then((data) => {
			this.view.render(studentId, data);
		});
	};

	handleCloseEditStudent = (studentId) => {
		this.notify('LOAD_STUDENTS_LIST_PAGE', studentId);
	}
}
