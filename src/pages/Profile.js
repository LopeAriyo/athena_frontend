import React from "react";
// import { Link } from "react-router-dom";

class Profile extends React.Component {
    render() {
        const { first_name, last_name, email } = this.props.user;
        const { signOut } = this.props;

        return (
            <div className="Page">
                <h5 className="light-text">
                    {first_name} {last_name}
                </h5>
                <p className="white-text">{email}</p>
                <p className="light-text">Goal</p>
                <p className="white-text">Track Cycle</p>
                <button className="light-btn small-btn">Edit</button>
                <button onClick={signOut} className="light-btn normal-btn">
                    Sign Out
                </button>
            </div>
        );
    }
}

export default Profile;
