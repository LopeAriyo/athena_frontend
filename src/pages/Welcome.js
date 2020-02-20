import React from "react";
import { Link } from "react-router-dom/";
class Welcome extends React.Component {
    render() {
        return (
            <div className="Welcome">
                <h2> athena. </h2>
                <p>Your menstural cycle personal assistant</p>
                <Link to="/signup">
                    <button className="dark-btn normal-btn">
                        {" "}
                        <p className="light-text">Sign Up</p>
                    </button>
                </Link>
                <Link to="/signin">
                    <button className="white-btn normal-btn">
                        <p className="dark-text">Sign In</p>
                    </button>
                </Link>
                <br />
                <p className="grey-text">Not ready? Take a tour</p>
            </div>
        );
    }
}

export default Welcome;
