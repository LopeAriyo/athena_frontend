import React from "react";
// import { Link } from "react-router-dom";


class Home extends React.Component {
    render() {
        return (
            <div >
                <h1>Good morning, {this.props.user.first_name}</h1>
                <h3>thursday, 20 February</h3>
            </div>
        );
    }
}

export default Home;
