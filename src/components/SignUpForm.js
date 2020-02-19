import React from "react";

class SignUpForm extends React.Component {
    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    };

    handleSubmit = () => {
        //     API.signIn(this.state.email, this.state.password)
        //       .then(data => {
        //         if (data.error) throw Error(data.error)
        //         this.props.signIn(data)
        //         this.props.history.push('/inventory')
        //       })
        //       .catch(error => alert(error))
    };

    handleChange = event =>
        this.setState({ [event.target.name]: event.target.value });

    render() {
        const {
            firstName,
            lastName,
            email,
            password,
            passwordConfirmation
        } = this.state;
        const { handleChange, handleSubmit } = this;

        return (
            <div>
                <form>
                    <input
                        id="firstNameInput"
                        name="firstname"
                        className="half-length-input"
                        placeholder="Enter First Name"
                        value={firstName}
                        onChange={handleChange}
                    />
                    <input
                        id="lastNameInput"
                        name="lastname"
                        className="half-length-input"
                        placeholder="Enter Last Name"
                        value={lastName}
                        onChange={handleChange}
                    />
                    <br />
                    <input
                        id="emailInput"
                        name="email"
                        className="full-length-input"
                        placeholder="Enter E-Mail Address"
                        value={email}
                        onChange={handleChange}
                    />
                    <br />
                    <input
                        id="passwordInput"
                        name="password"
                        className="full-length-input"
                        placeholder="Create Password"
                        type="password"
                        value={password}
                        onChange={handleChange}
                    />
                    <input
                        id="passwordConfirmationInput"
                        name="confirmPassword"
                        className="full-length-input"
                        placeholder="Confirm Password"
                        type="password"
                        value={password}
                        onChange={handleChange}
                    />
                    <br />
                    <button className="dark-btn" onClick={handleSubmit}>
                        <p className="light-text">Sign Up</p>
                    </button>
                </form>
            </div>
        );
    }
}

export default SignUpForm;
