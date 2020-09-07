export class StudyInfoView {
    main = document.querySelector('main');

    renderLessons = (lessons) => lessons.map((lesson) => (
        `
            <div class="card mb-4 ${!lesson.presence ? 'bg-secondary' : ''}">
                <div class="card-header">
                    <div class="row">
                        <span class="col text-left">
                            ${!lesson.presence ? 'Not present' : 'Present'}
                        </span>
                        <h5 class="col">
                            ${lesson.theme}
                        </h5>
                        <span class="col text-right">
                            Mark: ${lesson.mark}
                        </span>
                    </div>
                </div>
                <div class="card-body">
                    ${!lesson.comment ? 'No comment' : lesson.comment}
                </div>
                <small class="card-footer text-right">
                    ${lesson.date.slice(0, 10)}
                </small>
            </div>
        `
    )).join('')

    renderStudyInfo = ({ first_name, last_name, averageMark, rate, lessons }) => {
        const lessonList = this.renderLessons(lessons);
        this.main.innerHTML = `
            <section class="text-center mt-5">
                <div class="container w-50">
                    <h1 class="jumbotron-heading mb-2">My Study info</h1>
                    <h3 class="jumbotron-heading mb-5">${first_name} ${last_name}</h3>
                    <div class="container">
                        <div class="row mb-5">
                            <div class="col">
                                Average mark: ${averageMark.toString()}
                            </div>
                            <div class="col">
                                Rate: ${rate}
                            </div>
                        </div>
                    </div>

                    <h2 class='mb-3'>My lessons:</h2>
                    <div class='lesson-list container'>
                        ${lessonList}
                    </div>
                </div>
            </section>
        `;
    }
}
