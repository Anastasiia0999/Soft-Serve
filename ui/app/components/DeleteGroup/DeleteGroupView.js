export class DeleteGroupView {
    constructor(handleDelete) {
        this.handleDelete = handleDelete;
    }

    modal = document.getElementById('modal-window');

    renderWindow = () => {
        this.modal.style.display = 'block';
        this.modal.innerHTML += `
            <div class="container mt-5">
              <div class="row justify-content-center align-items-center">
                <form class="card col-md-5 col-sm-7 py-2">
                  <h3 class="text-center">Confirm deleting</h3>
                  <hr>
                  <p class="text-center">Are you sure you want to delete <b class="group-name"></b>?</p>
                  <div class="d-flex justify-content-around my-3">
                    <button id="cancelBtn" class="btn btn-secondary w-25" type="button">Cancel</button>
                    <button id="submitBtn" class="btn btn-danger w-25" type="submit">Delete</button>
                  </div>
                  <div class="modal-window__error alert alert-danger">An error has occurred. Try again later.</div>
                </form>
              </div>
            </div>
        `;

        this.cancelBtn = this.modal.querySelector('#cancelBtn');
        this.cancelBtn.addEventListener('click', this.removeWindow);

        this.submitBtn = this.modal.querySelector('#submitBtn');
        this.submitBtn.addEventListener('click', this.handleDelete);

        this.errorMessage = this.modal.querySelector('.modal-window__error');
    };

    displayError = () => {
        this.errorMessage.style.display = 'block';
    };

    hideError = () => {
        this.errorMessage.style.display = 'none';
    };

    removeWindow = () => {
        this.submitBtn.removeEventListener('click', this.handleDelete);
        this.cancelBtn.removeEventListener('click', this.removeWindow);
        this.modal.removeChild(this.modal.children[0]);
        this.modal.style.display = 'none';
    };

    updateGroupName = (name) => {
        document.querySelector('.group-name').innerText = name;
    };
}
