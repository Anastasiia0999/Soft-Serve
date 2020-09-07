export class StartALessonView {
    main = document.querySelector('main');

    constructor(handles) {
        this.handleGroupSelect = handles.handleGroupSelect;
        this.handleCreateLesson = handles.handleCreateLesson;
        this.onMarkChange = handles.onMarkChange;
    }

    getLessonVisits = () => this.lessonVisits;

    renderGroups = (groups) => groups.map(({ id, group_name }) => (`<option value="${id}">${group_name}</option>`)).join('');

    render = (groups) => {
        this.main.innerHTML = `
          <div class="container mt-5">
            <div class="row justify-content-center">
              <div class="col-md-6 col-sm-8 card">
                <form class="px-2 py-4 start-lesson-form">
                  <h3>Start lesson</h3>
                  <hr>

                  <div class="row mb-3">
                    <div class="col d-flex align-items-center">
                      <label class="mb-0">Lesson theme</label>
                    </div>

                    <div class="col-md-8">
                      <input class="form-control" type="text" name="theme_name" required placeholder="Lesson theme">
                    </div>
                  </div>

                  <div class="row mb-3">
                    <div class="col d-flex align-items-center">
                      <label class="mb-0">Date</label>
                    </div>
                    <div class="col-md-8">
                      <input class="form-control" type="datetime-local" name="lesson_date" required placeholder="YYYY-MM-DD">
                    </div>
                  </div>

                  <div class="row mb-3">
                    <div class="col d-flex align-items-center">
                      <label class="mb-0">Group</label>
                    </div>
                    <div class="col-md-8">
                      <select class="custom-select choose-group" name="group_id" required>
                        <option selected="selected" disabled hidden value="">--Choose group--</option>
                        ${this.renderGroups(groups)}
                      </select>
                    </div>
                  </div>

                  <div class='list-of-students'></div>

                  <div class="row justify-content-around mt-4">
                    <input type="reset" name="reset-btn" class="btn btn-danger w-25" value="Clear all">
                    <input type="submit" name="submit-btn" class="create-lesson btn btn-success w-25" value="Start">
                  </div>
                </form>
                <div class="errors"></div>
              </div>
            </div>
          </div>
        `;

        document.querySelector('select').addEventListener('change', this.handleGroupSelect);
    }

    renderStudent = (students) => students.map(({ id, first_name, last_name }) => (`
          <div class='lesson-visits'>
            <div class="row mb-8">
              <h6 class="col-md-4">
                ${first_name} ${last_name}
              </h6>
            </div>
            <div class="row mb-2">
              <div class="col-md-4">
                <select class="custom-select choose-group" id="${id}" name="mark">
                  <option selected="selected" disabled hidden value="">--Mark--</option>
                  <option id='1'>1</option>
                  <option id='2'>2</option>
                  <option id='3'>3</option>
                  <option id='4'>4</option>
                  <option id='5'>5</option>
                </select>
              </div>
              <div class="form-check">
                  <input type="checkbox" id="${id}" name="presence" class="form-check-input">
                  <label class="form-check-label">Presence</label>
              </div>
            </div> 
            <div class="row mb-4">
              <div class="col-md-8">
                <textarea class="form-control" id="${id}" name="comment" placeholder="Comment"></textarea>
              </div>
            </div>
          </div>
    `)).join('');

    renderStudents = (students) => {
        const studentsList = this.renderStudent(students);
        document.querySelector('.list-of-students').innerHTML = `
            <h4>Students</h4>
            <hr>
            ${studentsList}
        `;

        document.querySelector('.start-lesson-form').addEventListener('submit', this.handleCreateLesson);
    }
}
