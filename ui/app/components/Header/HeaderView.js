export class HeaderView {
    header = document.querySelector('header');
    // is correct?
    roles = {
        1: 'Student',
        2: 'Mentor',
        4: 'Admin',
    }

    constructor(onHandleLogout) {
        this.onHandleLogout = onHandleLogout;
    }

    render = (user) => {
        const { first_name, last_name, role } = user;
        const navigation = `
        <nav class="navbar navbar-expand-sm navbar-light bg-dark">
            <a class="navbar-brand" href="#">
                <img src="./img/logo.png" width="100px" class="d-inline-block img-fluid align-top" alt="" loading="lazy">
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse justify-content-end navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="nav-link__role">${this.roles[role]}</span> ${first_name} ${last_name}
                        </a>
                        <div class="dropdown-menu bg-dark" aria-labelledby="navbarDropdownMenuLink">
                            <a class="dropdown-item" href="#" id="logout-btn">Log Out <i class="fa fa-sign-out" aria-hidden="true"></i></a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
        `;
        this.header.innerHTML = navigation;
        document.getElementById('logout-btn').addEventListener('click', (event) => {
            event.preventDefault();
            this.onHandleLogout();
        });
    }

    hide = () => { this.header.innerHTML = ''; }
}
