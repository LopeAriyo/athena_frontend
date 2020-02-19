import React from "react";
import { Link } from "react-router-dom/";

// import SignUpForm from "../../../components/secondary/SignUpForm.js";

class SignUp extends React.Component {
    render() {
        return (
            <div className="SignUp">
                <Link to="/">
                    <button>Back</button>
                </Link>
                <h3>Create your account</h3>
                {/* <SignUpForm /> */}
                {/* <p>-OR-</p>
                <SignUpWithSocials /> */}
                {/* By signing up you accept the Terms of Service and Our Privacy Policy*/}
                <p>
                    {" "}
                    Already have an account? <Link to="/signin">
                        Sign In
                    </Link>{" "}
                </p>
            </div>
        );
    }
}

export default SignUp;
