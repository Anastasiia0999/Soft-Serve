export class EditLessonView {
    root = document.querySelector('main');

    constructor(handleEditLesson, handleCancel) {
        this.handleEditLesson = handleEditLesson;
        this.handleCancel = handleCancel;
    }

    renderForm = () => {
        this.root.innerHTML = `   
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-md-5 mt-4 border border-dark rounded">
                <form class="pt-2 py-2 hiring-form" name="mentor-hiring">
                <div class="error" ></div>
                  <h2 >Edit Lesson</h2>
                  <hr>
                  <div class="row mb-4">
                    <div class="col d-flex align-items-center">
                      <label class="mr-3 w-25" for="login">Theme</label>
                      <input class="form-control input-group-sm input" type="text" name="theme_name" id="theme" placeholder="Change theme">
                    </div>
                  </div>
                  <div class="row mb-4">
                    <div class="col d-flex align-items-center">
                      <label class="mr-3 w-25" for="password">Date/Time</label>
                      <input class="form-control input-group-sm input datepicker" type="datetime-local" name="lesson_date" id="date" placeholder="Change date">
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
        const inputs = document.querySelectorAll('.input');
        this.addEvent(inputs);

        const hiringForm = document.querySelector('.hiring-form');
        hiringForm.addEventListener('submit', this.handleEditLesson);

        const cancelBtn = document.querySelector('.cancel');
        cancelBtn.addEventListener('click', this.handleCancel);

        this.errorsField = document.querySelector('.error');
    }

    addEvent = (nodes) => {
        nodes.forEach((el) => {
            el.addEventListener('input', () => {
                el.classList.add('changed');
            });
        });
    }

    addError = (error) => {
        this.errorsField.innerHTML += `<div class="alert alert-danger" role="alert">${error}</div>`;
    }

    deleteErrors = () => {
        this.errorsField.innerHTML = '';
    }
}
