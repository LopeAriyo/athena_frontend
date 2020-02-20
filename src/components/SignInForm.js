import React from "react";

//TODO
//+ Add forgot password functionality

class SignInForm extends React.Component {
    state = {
        email: "",
        password: ""
    };

    handleChange = event =>
        this.setState({ [event.target.name]: event.target.value });

    validate = (email, password) => {
        const emailValidation = email.length === 0;
        const passwordValidation = password.length === 0;

        return {
            email: emailValidation,
            password: passwordValidation
        };
    };

    canSubmit() {
        const { email, password } = this.state;   
     const errors = this.validate(email, password);

        return !(Object.keys(errors).some(x => errors[x]));
    }

    handleSubmit = event => {
        if (!this.canSubmit()) {
            event.preventDefault();
            return;
        }

        alert(`Signed In`);
        //Redirect to Home Page
    };

    render() {
        const { email, password } = this.state;
        const { handleChange, handleSubmit } = this;

        const errors = this.validate(email, password);
        const isDisabled = !this.canSubmit();

        return (
            <div>
                <form>
                    <input
                        id="emailInput"
                        name="email"
                        className={errors.email ? "error full-length-input" : "full-length-input"}
                        placeholder="E-Mail Address"
                        type="text"
                        value={email}
                        onChange={handleChange}
                    />
                    <br />
                    <input
                        id="passwordInput"
                        name="password"
                        className={errors.password ? "error full-length-input" : "full-length-input"}
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={handleChange}
                    />
                    {/* <p> Forgot Password? </p> */}
                    <button
                        className="dark-btn"
                        disabled={isDisabled}
                        onClick={handleSubmit}
                    >
                        <p className="light-text">Sign In</p>
                    </button>
                </form>
            </div>
        );
    }
}

export default SignInForm;
