export class ListOfStudentsView {
    main = document.querySelector('main');
    constructor(handleStudentEdit, handleStudentDetails, handleStudentDelete) {
        this.handleStudentEdit = handleStudentEdit;
        this.handleStudentDetails = handleStudentDetails;
        this.handleStudentDelete = handleStudentDelete;
    }

    renderSingle = ({ id, first_name, last_name }) => {
        const singleNode = document.createElement('div');
        singleNode.classList.add('row__student_content_block_wrap', 'col-4');
        singleNode.setAttribute('data-id', id);
        singleNode.innerHTML = `
            <div class="student_content_block_wrap__student_content_block card">
                <div class="student_content_block__student_info">
                    <h2 class="student_info__name">${last_name} ${first_name}</h2>
                </div>
                <a href="#" class="student_content_block__edit_btn"><i class="fa fa-pencil"></i></a>
                <a href="#" class="student_content_block__delete_btn"><i class="fa fa-times"></i></a>
                <a href="" class="student_details__button btn btn-secondary">Student Details</a>
            </div>
        `;

        return singleNode;
    }

    createEvents = () => {
        this.main.querySelectorAll('.row__student_content_block_wrap').forEach((node) => {
            node.querySelector('a.student_content_block__edit_btn').addEventListener('click', (e) => {
                e.preventDefault();
                this.handleStudentEdit(node.dataset.id);
            });
        });
        this.main.querySelectorAll('.row__student_content_block_wrap').forEach((node) => {
            node.querySelector('a.student_details__button').addEventListener('click', (e) => {
                e.preventDefault();
                this.handleStudentDetails(node.dataset.id);
            });
        });
        this.main.querySelectorAll('.row__student_content_block_wrap').forEach((node) => {
            node.querySelector('a.student_content_block__delete_btn').addEventListener('click', (e) => {
                e.preventDefault();
                this.handleStudentDelete(node.dataset.id);
            });
        });
    }

    render = (data) => {
        const title = `<div class="list_of_students_title text-md-center my-4"><h1 class="title_students">Students</h1></div>`;
        const renderNode = document.createElement('div');
        renderNode.classList.add('row_students', 'row', 'd-flex', 'justify-content-around', 'align-items-center', 'p-4', 'mw-100');
        data.forEach((element) => renderNode.appendChild(this.renderSingle(element)));
        this.main.innerHTML = title;
        this.main.appendChild(renderNode);
        this.createEvents();
    }
}
