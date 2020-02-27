import React from "react";
import { Link } from "react-router-dom/";

import SignUpForm from "../components/SignUpForm.js";

const SignUp = ({ signUp, history }) => (
    <div className="SignUp">
        <div className="top-nav">
            <Link to="/">
                <button>Back</button>
            </Link>
            <Link to="/signin">Sign In</Link>
        </div>
        <h5>Create your account</h5>
        <SignUpForm history={history} />
        {/* <p>-OR-</p>
                <SignUpWithSocials /> */}
        {/* By signing up you accept the Terms of Service and Our Privacy Policy*/}
        <p>
            {" "}
            Already have an account? <Link to="/signin">Sign In</Link>{" "}
        </p>
    </div>
);

export default SignUp;
