import React from "react";
// import { Link } from "react-router-dom";

class Profile extends React.Component {
    render() {
        return <div>
        <h1>{this.props.user.first_name}</h1>
        <h1>{this.props.user.email}</h1>
        <button onClick={this.props.signOut}>Sign Out</button>
        </div>;
    }
}

export default Profile;
