export class ListOfGroupsView {
    constructor(handleInfoLoad) {
        this.rootBlock = document.querySelector('main');
        this.loadInfo = handleInfoLoad;
    }

    render = (data) => {
        this.rootBlock.innerHTML = `
            <div class="list_of_groups_title text-md-center my-4">
                <h1 class="title_groups">Groups</h1>
            </div>
            <table class="table w-75 m-auto">
                <thead>
                    <tr>
                        <th>Group name</th>
                        <th>Start date</th>
                        <th>End date</th>
                        <th>Control Panel</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map((group) => this.parseDataElement(group)).join('')}
                </tbody>
            </table>
        `;
        const btnNodes = this.rootBlock.querySelectorAll('.btn-info');
        btnNodes.forEach((el) => {
            el.addEventListener('click', () => {
                this.loadInfo(el.id);
            });
        });
    }

    parseDataElement = ({ id, group_name, start_date, finish_date }) => `
            <tr>
                <td>${group_name}</td>
                <td>${start_date}</td>
                <td>${finish_date}</td>
                <td><button type="button" class="btn btn-info" id=${id} >Info</button></td>
            </tr>
        `;
}
