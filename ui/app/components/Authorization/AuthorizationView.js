export class AuthorizationView {
    main = document.querySelector('main');
    errorsMsg;

    constructor(handleSignIn) {
        this.handleSignIn = handleSignIn;
    }

    submitFormListener = () => {
        const form = document.querySelector('.signin-form');
        form.addEventListener('submit', this.handleSignIn);
    }

    renderAuthorization = () => {
        this.main.innerHTML = `
            <div class="container mt-5">
                <div class="d-flex justify-content-center mb-4">
                <div class="col-lg-6 col-md-10 col-sm-12 mb-4 bg-light card">
                    <form class="signin-form p-3">
                    <h2 class="text-left mb-4">Authorization</h2>       
                    <hr class="my-4">
                    <div class="row mb-3">
                        <div class="col-md-8">
                        <div class="row mb-3">
                            <div class="col-4 text-right my-auto">
                            Email
                            </div>
                            <div class="col">
                            <input type="text" name="signin-form__email" class="form-control" placeholder="Email" required="required">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-4 text-right my-auto">
                            Password
                            </div>
                            <div class="col">
                            <div class="form-group my-auto">
                                <input type="password" name="signin-form__password" class="form-control" placeholder="Password" required="required">
                            </div>
                            </div>
                        </div>
                        </div>
                        <div class="col-md-4 my-auto">
                        <input type="submit" value="Sign in" name="signin-form__btn" class="btn btn-success btn-block">
                        </div>
                    </div>

                    <div class="row">
                        <div class="col">
                        <div class="signin-form__err text-center text-danger text-capitalize">
                            <!-- Errors here -->
                        </div>
                        </div>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        `;

        this.submitFormListener();
        this.errorsMsg = document.querySelector('.signin-form__err');
    }

    clearErrors = () => {
        this.errorsMsg.innerText = '';
    }

    showServerError = (error) => {
        this.errorsMsg.innerText = error;
    }

    showErrorMessage = (errors) => {
        const msg = errors.join(', ');
        this.errorsMsg.innerText = msg;
    }
}
