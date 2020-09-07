export class MentorHiringView {
    root = document.querySelector('main');

    constructor(handleAddMentor, handleCancel) {
        this.handleAddMentor = handleAddMentor;
        this.handleCancel = handleCancel;
    }

    renderForm = (courses) => {
        this.root.innerHTML = `   
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-md-4 mt-4 border border-dark rounded">
                <form class="pt-2 py-2 hiring-form" name="mentor-hiring">
                <div class="error" ></div>
                  <h2 >Mentor Hiring</h2>
                  <hr>
                  <div class="row mb-4">
                    <div class="col d-flex align-items-center">
                      <label class="mr-3 w-25" for="login">Login</label>
                      <input class="form-control input-group-sm" type="text" name="email" id="login" required placeholder="Enter your email">
                    </div>
                  </div>
                  <div class="row mb-4">
                    <div class="col d-flex align-items-center">
                      <label class="mr-3 w-25" for="mentor-name">Name</label>
                      <input class="form-control input-group-sm" type="text" name="name" id="mentor-name" required placeholder="Enter your name">
                    </div>
                  </div>
                  <div class="row mb-4">
                    <div class="col d-flex align-items-center">
                      <label class="mr-3 w-25" for="mentor-surname">Surname</label>
                      <input class="form-control input-group-sm" type="text" name="surname" id="mentor-surname" required placeholder="Enter your surname">
                    </div>
                  </div>
                  <div class="row mb-4">
                    <div class="col d-flex align-items-center">
                      <label class="mr-4" for="select">Courses</label>
                      <select class="form-control" id="select" name="courses-id" multiple>
                        ${courses.map((course) => `<option class='select-item' value="${course.id}">${course.name}</option>`)}
                      </select>
                    </div>
                  </div>
                  <div class="row justify-content-around my-3 pr-3">
                    <input type="submit" name="submit-btn" class="btn btn-dark w-25" value="Save">
                    <input type="button" name="cancel-btn" class="btn btn-dark w-25 cancel" value="Cancel">
                  </div>
                </form>
              </div>
            </div>
          </div>
        `;

        const hiringForm = document.querySelector('.hiring-form');
        hiringForm.addEventListener('submit', this.handleAddMentor);

        const cancelBtn = document.querySelector('.cancel');
        cancelBtn.addEventListener('click', this.handleCancel);

        this.errorsField = document.querySelector('.error');
    }

    addError = (error) => {
        this.errorsField.innerHTML = `<div class="alert alert-danger" role="alert">${error}</div>`;
    }

    deleteErrors = () => {
        this.errorsField.innerHTML = '';
    }
}
