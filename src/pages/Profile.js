import React from "react";
// import { Link } from "react-router-dom";

class Profile extends React.Component {

    render() {
        const {first_name, last_name, email} = this.props.user
        const { signOut } = this.props;

        return (
            <div>
                <h5>
                    {first_name} {last_name}
                </h5>
                <p>{email}</p>
                <p>Goal</p>
                <p>Track Cycle</p>
                <button>Edit</button>
                <button onClick={signOut}>Sign Out</button>
            </div>
        );
    }
}

export default Profile;
