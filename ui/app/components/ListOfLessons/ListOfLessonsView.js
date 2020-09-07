export default class ListOfLessonsView {
    main = document.querySelector('main');
    constructor(onHandleClickOpen) {
        this.onHandleClickOpen = onHandleClickOpen;
    }

    renderSingle = ({ id, theme_name, lesson_date }) => (
        `
          <div class="lesson_item_wrap col-6" data-id="${id}">
            <div class="lesson_item_wrap__lesson_item card">
              <h3 class="lesson_item__title">Theme: <span>${theme_name}</span></h3>
              <h6 class="lesson_item__date">${new Date(lesson_date).toLocaleDateString()}</h6>
              <a href="" class="lesson_item__button btn btn-secondary">Edit</a>
            </div>
          </div>
        `
    )

    initEvents = () => {
        const lessonNodes = document.querySelectorAll('div.lesson_item_wrap');
        lessonNodes.forEach((elem) => {
            const id = Number(elem.dataset.id);
            elem.querySelector('.lesson_item__button').addEventListener('click', (e) => this.onHandleClickOpen(e, id));
        });
    }

    render = (data) => {
        this.main.innerHTML = `
            <div class="list_of_lesson_main container">
            <div class="list_of_lesson_title"><h1 class="title_lessons text-md-center my-4">Lessons</h1></div>
                <div class="list_of_lesson_main__row row mw-100 d-flex justify-content-around align-items-center m-0">
                ${data.map((elem) => this.renderSingle(elem)).join('')}
                </div>
            </div>
            
        `;
        this.initEvents();
    }
}
