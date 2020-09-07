export class ListOfCoursesView {
    main = document.querySelector('main');

    constructor(handleEdit, handleDelete) {
        this.handleEdit = handleEdit;
        this.handleDelete = handleDelete;
    }

    renderItem = ({ id, name }, role) => {
        if (role === 4) {
            return `
                <div class="course-item col-5 card bg-info my-3 shadow" id="${id}">
                    <div class="icons text-right">
                      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square course-item__icon-edit ml-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                       </svg>
                       <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-circle course-item__icon-delete ml-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                          <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
                          <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
                        </svg>
                    </div>
                    <hr>
                      <h3 class="course-item__title">${name}</h3>
                  </div>
            `;
        } 
        return `
            <div class="course-item col-5 card bg-info my-3 shadow" id="${id}">
                <h3 class="course-item__title">${name}</h3>
            </div>
        `;
    }

    addEvents = () => {
        const courseItems = document.querySelectorAll('.course-item');

        courseItems.forEach((el) => {
            const courseId = Number(el.id);

            const edit = el.querySelector('.course-item__icon-edit');
            const del = el.querySelector('.course-item__icon-delete');

            edit.addEventListener('click', (e) => {
                this.handleEdit(e, courseId);
            });
            del.addEventListener('click', (e) => {
                this.handleDelete(e, courseId);
            });
        });
    }

    renderList = (data, userRole) => {
        if (userRole === 4) {
            this.main.innerHTML = `
            <div class="list_courses container ">
                <h1 class = "text-md-center my-4">Courses</h1>
                <hr>
                <div class="list_courses_row row mw-100 d-flex justify-content-around align-items-center m-0">
                ${data.map((elem) => this.renderItem(elem, userRole)).join('')}
                </div>
            </div>
        `;
            this.addEvents();
        } else {
            this.main.innerHTML = `
            <div class="list_courses container ">
                <h2 class = "text-md-center my-4">Courses</h2>
                <hr>
                <div class="list_courses_row row mw-100 d-flex justify-content-around align-items-center m-0">
                ${data.map((elem) => this.renderItem(elem, userRole)).join('')}
                </div>
            </div>
        `;
        }
    }
}
