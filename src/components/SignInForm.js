import React from "react";

//TODO
//+ Add forgot password functionality

class SignInForm extends React.Component {
    state = {
        email: "",
        password: ""
    };

    handleFormChange = event =>
        this.setState({ [event.target.name]: event.target.value });

    handleFormSubmit = event => {
        // event.target.preventDeafult()
        if (this.state.email.length > 0) {
            alert(`Signed In`);
        } else {
            alert("Please enter a valid email");
        }
    };

    render() {
        const { email, password } = this.state;
        const { handleFormChange, handleFormSubmit } = this;

        return (
            <div>
                <form onSubmit={handleFormSubmit}>
                    <input
                        id="emailInput"
                        name="email"
                        placeholder="E-Mail Address"
                        type="text"
                        value={email}
                        onChange={handleFormChange}
                    />
                    <br />
                    <input
                        id="passwordInput"
                        name="password"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={handleFormChange}
                    />
                    {/* <p> Forgot Password? </p> */}
                    <button className="dark-btn">
                        <p className="light-text">Sign In</p>
                    </button>
                </form>
            </div>
        );
    }
}

export default SignInForm;
