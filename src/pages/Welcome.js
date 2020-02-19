import React from "react";

class Welcome extends React.Component {
    render() {
        return (
            <div className="Welcome">
                <h2> athena. </h2>
                <p>Your menstural cycle personal assistant</p>
                <button className="dark-btn"> <p className="light-text">Sign Up</p></button>
                <button className="light-btn"><p className="dark-text">Sign In</p></button>
                Not ready? Take a tour
                <br />
            </div>
        );
    }
}

export default Welcome;
