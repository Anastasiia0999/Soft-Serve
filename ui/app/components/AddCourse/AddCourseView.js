export class AddCourseView {
    constructor(handleAddCourse, handleCancel) {
        this.handleAddCourse = handleAddCourse;
        this.handleCancel = handleCancel;
    }

    rootNode = document.querySelector('main');

    showError = (error) => {
        this.errorsContainer.innerHTML = '';
        this.errorsContainer.innerHTML += `<div class="alert alert-danger mx-4">${error}</div>`;
    };

    renderForm = () => {
        this.rootNode.innerHTML = `
            <div class="container mt-5">
              <div class="row justify-content-center">
                <div class="col-md-6 col-sm-8 card">
                  <form class="px-2 py-4" name="add-course">
                    <h3>Course adding</h3>
                    <hr>
                    <div class="row my-4 px-4">
                      <div class="col d-flex align-items-center">
                        <label class="mb-0" for="courseName">Course name</label>
                      </div>
                      <div class="col-md-8">
                        <input class="form-control" type="text" name="course-name" id="courseName" required placeholder="course name">
                      </div>
                    </div>
                    <div class="row justify-content-around px-4">
                      <input type="button" name="cancel-btn" class="btn btn-danger w-25" value="Cancel">
                      <input type="submit" name="submit-btn" class="btn btn-success w-25" value="Submit">
                    </div>
                  </form>
                  <div class="errors"></div>
                </div>
              </div>
            </div>
        `;

        this.addCourseForm = document.querySelector('form[name=add-course]');
        this.addCourseForm.addEventListener('submit', this.handleAddCourse);
        this.addCourseForm['cancel-btn'].addEventListener('click', this.handleCancel);
        this.errorsContainer = document.querySelector('.errors');
    };
}
