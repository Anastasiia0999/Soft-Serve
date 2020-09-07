export class DeleteStudentView {

    modalWindow = document.getElementById('modal-window');

    constructor(handleDeleteStudent) {
        this.handleDeleteStudent = handleDeleteStudent;
    }

    renderModal = (studentName, studentSurname) => {

        this.modalWindow.style.display = 'block';

        this.modalWindow.innerHTML = `
            <div class="container mt-4">
              <div class="row align-items-center justify-content-center ">
                <form class="card col-md-5 py-1">
                 <div class="error pt-2"></div>
                  <h2 class="text-center bg-secondary pt-2 pb-2 rounded">Confirm</h2>
                  <p class="text-center">Are you sure you want to delete student <i><b>${studentName} ${studentSurname}</b></i>?</p>
                  <div class="d-flex mt-2 mb-2 justify-content-around ">
                    <button class="btn w-25 btn-dark  cancel" type="button">Cancel</button>
                    <button class="btn w-25 btn-dark submit" type="submit">Confirm</button>
                  </div> 
                </form>
              </div>
            </div>
        `;
        const submit = this.modalWindow.querySelector('.submit');
        submit.addEventListener('click', this.handleDeleteStudent);

        const cancel = this.modalWindow.querySelector('.cancel');
        cancel.addEventListener('click', this.deleteModal);

        this.error = this.modalWindow.querySelector('.error');
    };

    deleteModal = () => {
        this.modalWindow.style.display = 'none';
    };

    addError = (error) => {
        this.error.innerHTML = `<div class="alert alert-danger" role="alert">
                                      ${error}
                                    </div>`;
    };

}
