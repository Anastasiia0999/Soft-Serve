export class EditStudentView {
	constructor(handleEditStudent, handleCloseEditStudent) {
		this.main = document.querySelector('main');
		this.handleEditStudent = handleEditStudent;
		this.handleCloseEditStudent = handleCloseEditStudent;

		// MOCKED
		this.id = 0;
	}

	onMount() {
		this.form = this.main.querySelector('#edit-student-form');
		this.form.addEventListener('submit', this.onFormSubmit);
		this.errorContainers = this.main.querySelectorAll('.error');

		document.querySelector('.cancel-edit-student-button').addEventListener('click', this.onCancelEdit);
	}

	onFormSubmit = (event) => {
		event.preventDefault();
		const data = this.getFormData(event.target);
		this.handleEditStudent(this.studentId, data);
	};

	getFormData = (form) => {
		return [...form].reduce((accumulator, element) => {
			if (element.type !== 'submit' && element.type !== 'button') {
				accumulator[element.name] = element.value;
			}

			return accumulator;
		}, {});
	};

	static showErrors(errors) {
		for (const name in errors) {
			if (errors.hasOwnProperty(name)) {
				const errorContainer = document.querySelector(`.error[data-name=${name}]`);
				errorContainer.textContent = errors[name];
				errorContainer.classList.remove('d-none');
			}
		}
	}

	resetErrors() {
		this.errorContainers.forEach((element) => {
			element.classList.add('d-none');
		});
	}

	onCancelEdit = () => {
		this.handleCloseEditStudent(this.studentId);
	}

	render(id, student) {
		this.studentId = id;

		this.main.innerHTML = `
        <div class="container">
            <div class="row">
              <div class="col-6 offset-3 mt-5">
                <h3 class="mb-4 text-center">Edit student information</h3>
    
                <form id="edit-student-form">
                  <!--Name-->
                  <div class="form-group">
                    <div class="row mb-1">
                      <label class="col-4" for="group-name">Name</label>
                      <input
                        class="col-8 form-control"
                        type="text"
                        id="group-name"
                        name="name"
                        placeholder="Name"
                        value="${student.first_name}"
                      />
                    </div>
                    <div class="row">
                      <div data-name="name" class="error d-none text-danger offset-4"></div>
                    </div>
                  </div>
                  
                  <!--Surname-->
                  <div class="form-group">
                    <div class="row mb-1">
                      <label class="col-4" for="group-surname">Surname</label>
                      <input
                        class="col-8 form-control"
                        type="text"
                        id="group-surname"
                        name="surname"
                        placeholder="Surname"
                        value="${student.last_name}"
                      />
                    </div>
                    <div class="row">
                      <div data-name="surname" class="error d-none text-danger offset-4"></div>
                    </div>
                  </div>
    
                  <!--Email-->
                  <div class="form-group">
                    <div class="row mb-1">
                      <label class="col-4" for="group-name">Email</label>
                      <input
                        class="col-8 form-control"
                        type="email"
                        id="group-email"
                        name="email"
                        placeholder="example@gmail.com"
                        value="${student.email}"
                      />
                    </div>
                    <div class="row">
                      <div data-name="email" class="error d-none text-danger offset-3"></div>
                    </div>
                  </div>
    
                  <!--Group-->
<!--                  <div class="form-group">
                    <div class="row mb-1">
                      <label class="col-4" for="group-name">Group</label>
                      <select multiple class="col-8 form-control" type="text" id="group-group" name="group">
                        <option value="" disabled hidden selected></option>
                        <option value="1">Group 1</option>
                        <option value="2">Group 2</option>
                        <option value="3">Group 3</option>
                      </select>
                    </div>
                    <div class="row">
                      <div data-name="group" class="error d-none text-danger offset-3"></div>
                    </div>
                  </div>-->
    
                  <!--Submit-->
                  <div class="d-flex justify-content-center">
                    <button type="button" class="cancel-edit-student-button btn btn-secondary btn-danger col-4 mr-4">
                      Cancel
                    </button>
                    <button
                      type="submit"
                      class="btn btn-primary btn-success col-4"
                      id="edit-student-edit-button"
                    >
                      Edit
                    </button>
                  </div>
                </form>
              </div>
            </div>
        </div>
        `;

		this.onMount();
	}
}
