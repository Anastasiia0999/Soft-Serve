export class DetailsOfGroupView {
    main = document.querySelector('main');

    constructor(handleGoToEditGroupView, handleGoToDeleteGroupView) {
        this.handleGoToEditGroupView = handleGoToEditGroupView;
        this.handleGoToDeleteGroupView = handleGoToDeleteGroupView;
    }

    tableInfoRender = (data) => {
        const table = document.createElement('table');
        table.classList.add('details_group_wrap__info__table', 'table');
        const peopleArr = data.map(({ first_name, last_name, email }, index) => (
            `
            <tr>
                <th scope="row">${index + 1}</th>
                <td><a href="#">${first_name} ${last_name}</a></td>
                <td>${email}</td>
            </tr>
            `
        ));
        table.innerHTML = `
          <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Full Name</th>
                <th scope="col">Email</th>
              </tr>
          </thead>
          <table>
              ${peopleArr.join('')}
          </table>
        `;
        return table;
    }

    handleGoToEditGroupPage = ({ id, group_name, start_date, finish_date }) => {
        const editGroupBtn = document.querySelector('.edit-group-btn');
        editGroupBtn.addEventListener('click', () => {
            this.handleGoToEditGroupView(id, group_name, start_date, finish_date);
        });
    }

    handleDeleteGroup = ({ id }) => {
        const deleteGroupBtn = document.querySelector('.delete-group-btn');
        deleteGroupBtn.addEventListener('click', () => {
            this.handleGoToDeleteGroupView(id);
        });
    }

    onMount = (data) => {
        this.handleGoToEditGroupPage(data);
        this.handleDeleteGroup(data);
    }

    render = (data) => {
        const { id, group_name, start_date, finish_date, mentors, students } = data;

        const detailsOfGroupNode = `
            <div class="d-flex align-items-center justify-content-center">
                <h1 class="details_group_title" data-id="${id}">
                    ${group_name}  
                </h1>
                <button class="edit-group-btn button--unstyled p-1 pb-2 pr-2" type="button">
                    <svg width="20px" height="20px" viewBox="0 0 16 16" class="bi bi-pencil-square course-item__icon-edit ml-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg> 
                </button>
                <button class="delete-group-btn button--unstyled p-1 pb-2 pr-2" type="button">
                    <svg width="20px" height="20px" viewBox="0 0 16 16" class="bi bi-x-circle course-item__icon-delete ml-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                        <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"></path>
                        <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"></path>
                    </svg>
                </button>
            </div> 
            <h2 class="details_group_dates"><span class="group_dates__date_start">${start_date}</span> - <span class="group_dates__date_end">${finish_date}</span></h2>
            <div class="details_group_wrap_info container">
                <h3 class="details_group_wrap_info__title">Students</h3>
            </div>
        `;
        this.main.innerHTML = detailsOfGroupNode;
        this.main.appendChild(this.tableInfoRender(students));
        this.main.innerHTML += `
            <div class="details_group_wraps_info container">
                <h3 class="details_group_wrap_info__title">Mentors</h3>
            </div>
        `;
        this.main.appendChild(this.tableInfoRender(mentors));

        this.onMount(data);
    }
}
