export class StartGroupView {
    constructor(handleCreateGroup) {
        this.handleCreateGroup = handleCreateGroup;
    }

    rootNode = document.querySelector('main');

    renderCourses = (data) => data.forEach((course) => {
        document.querySelector('select').innerHTML += `<option value="${course.id}">${course.name}</option>`;
    });

    renderForm = () => {
        this.rootNode.innerHTML = `
          <div class="container mt-5">
            <div class="row justify-content-center">
              <div class="col-md-6 col-sm-8 card">
                <form class="px-2 py-4" name="start-group">
                  <h3>Group starting</h3>
                  <hr>
                  <div class="row mb-3">
                    <div class="col d-flex align-items-center">
                      <label class="mb-0" for="group-name">Group name</label>
                    </div>
                    <div class="col-md-8">
                      <input class="form-control" type="text" name="group-name" id="name" required placeholder="group name">
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col d-flex align-items-center">
                      <label class="mb-0" for="group-course">Course</label>
                    </div>
                    <div class="col-md-8">
                      <select class="custom-select" name="group-course" id="course_id" required>
                        <option selected="selected" disabled hidden value="">Choose course...</option>
                      </select>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col d-flex align-items-center">
                      <label class="mb-0" for="start-date">Start date</label>
                    </div>
                    <div class="col-md-8">
                      <input class="form-control" type="text" name="start-date" id="start_date" required placeholder="YYYY-MM-DD">
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col d-flex align-items-center">
                      <label class="mb-0" for="end-date">Finish date</label>
                    </div>
                    <div class="col-md-8">
                      <input class="form-control" type="text" name="end-date" id="finish_date" required placeholder="YYYY-MM-DD">
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col">
                      <label class="mb-0" for="students-data">Students data</label>
                    </div>
                    <div class="col-md-8">
                      <textarea class="form-control" name="students-data" id="students" rows="3" required placeholder="paste students emails here"></textarea>
                    </div>
                  </div>
                  <div class="row justify-content-around mt-4">
                    <input type="reset" name="reset-btn" class="btn btn-danger w-25" value="Clear all">
                    <input type="submit" name="submit-btn" class="btn btn-success w-25" value="Create">
                  </div>
                </form>
                <div class="errors"></div>
              </div>
            </div>
          </div>
        `;

        this.startGroupForm = document.querySelector('form[name=start-group]');
        this.startGroupForm.addEventListener('submit', this.handleCreateGroup);
        this.errorsContainer = document.querySelector('.errors');
    };

    clearErrors = () => {
        this.errorsContainer.innerHTML = '';
    };

    renderErrors = (errors) => {
        this.clearErrors();
        errors.forEach((error) => {
            this.errorsContainer.innerHTML += `<div class="alert alert-danger" role="alert">${error}</div>`;
        });
    };
}
