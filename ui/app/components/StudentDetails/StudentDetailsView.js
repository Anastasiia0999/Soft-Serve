export class StudentDetailsView {
    main = document.querySelector('main');

    constructor(handleEditStudent) {
        this.handleEditStudent = handleEditStudent;
    }

    renderLessons = (lessons) => (
        lessons.map(({ theme, mentor, date }) => `
            <tr>
                <th scope="row">${theme}</th>
                <td>${mentor.firstName} ${mentor.lastName}</td>
                <td>${date.slice(0, 10)}</td>
            </tr>
        `).join('')
    );

    editBtnListener = () => {
        const editBtn = this.main.querySelector('.edit-student-btn');
        editBtn.addEventListener('click', this.handleEditStudent);
    }

    renderComponent = ({ firstName, lastName, groupName, courseName, email, lessons }) => {
        const listOfLessons = this.renderLessons(lessons);
        this.main.innerHTML = `
            <section class="text-center mt-5">
                <div class="container w-50">
                <h1 class="jumbotron-heading mb-5">Student Details</h1>
                <div class="container">
                    <div class="row mb-3">
                    <div class="col">
                        Name:
                    </div>
                    <div class="col text-left">
                        ${firstName} ${lastName}
                    </div>
                    </div>
                    <div class="row mb-3">
                    <div class="col">
                        Group:
                    </div>
                    <div class="col text-left">
                        ${groupName}
                    </div>
                    </div>
                    <div class="row mb-3">
                    <div class="col">
                        Course:
                    </div>
                    <div class="col text-left">
                        ${courseName}
                    </div>
                    </div>
                    <div class="row mb-3">
                    <div class="col">
                        Email:
                    </div>
                    <div class="col text-left">
                        ${email}
                    </div>
                    </div>
                </div>
                <input type='button' value='edit' class='edit-student-btn btn btn-outline-secondary w-25 mb-5'>

                <h3 class='mb-3'>Lessons:</h3>
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">Lesson Theme</th>
                        <th scope="col">Mentor</th>
                        <th scope="col">Date</th>
                    </tr>
                    </thead>
                    <tbody>
                        ${listOfLessons}
                    </tbody>
                </table>
                </div>
            </section>
        `;

        this.editBtnListener();
    }
}
