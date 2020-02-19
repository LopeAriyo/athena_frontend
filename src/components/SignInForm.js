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

    canSubmit() {
        const { email, password } = this.state;
        //email must also be valid format
        return email.length > 0 && password.length > 0;
    }

    handleSubmit = event => {
        if (!this.canSubmit()){
            event.preventDefault();
            return;
        }
    
        alert(`Signed In`);
        
    };

    render() {
        const { email, password } = this.state;
        const { handleChange, handleSubmit } = this;

        const isEnabled = this.canSubmit();

        return (
            <div>
                <form>
                    <input
                        id="emailInput"
                        name="email"
                        className="full-length-input"
                        placeholder="E-Mail Address"
                        type="text"
                        value={email}
                        onChange={handleChange}
                    />
                    <br />
                    <input
                        id="passwordInput"
                        name="password"
                        className="full-length-input"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={handleChange}
                    />
                    {/* <p> Forgot Password? </p> */}
                    <button
                        className="dark-btn"
                        disabled={!isEnabled}
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
