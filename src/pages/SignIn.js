import React from "react";
import { Link } from "react-router-dom/";

// import SignInForm from "../../../components/secondary/SignInForm";

//TODO
//+ Add sign in with socials functionality

const SignIn = ({ signIn, history }) => (
    <div className="SignIn">
        <Link to="/">
            <button>Back</button>
        </Link>
        <h3>Welcome back </h3>
        {/* <SignInForm signIn={signIn} history={history} /> */}
        {/* <Link to="/changepassword">Forgot Password?</Link> </p> */
        /* <p>-OR-</p>
                <SignInWithSocials /> */}
        <p>
            {" "}
            Don't have an account? <Link to="/signup">Sign Up</Link>{" "}
        </p>
    </div>
);

export default SignIn;
