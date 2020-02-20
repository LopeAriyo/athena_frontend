import React from "react";
import { Link } from "react-router-dom/";

import SignInForm from "../components/SignInForm";

//TODO - STRETCH
//+ Add sign in with socials functionality

const SignIn = ({ signIn, history }) => (
    <div className="SignIn">
        <div className="top-nav">
            <Link to="/">
                <button>Back</button>
            </Link>
            <Link to="/signup">Sign Up</Link>
        </div>
        <h5>Welcome back </h5>
        <SignInForm signIn={signIn} history={history} />
        {/* <p>-OR-</p>
                <SignInWithSocials /> */}
        <p className="grey-text">
            Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
    </div>
);

export default SignIn;
