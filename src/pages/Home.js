import React from "react";
// import { Link } from "react-router-dom";

class Home extends React.Component {

    // componentDidMount() {
    //     if (this.props.user === null) {
    //         this.props.history.push("/");
    //     }
    // }

    render() {
        const {first_name} = this.props.user
        return (
            <div >
                <h1>Good morning, {first_name}</h1>
                <h3>Thursday, 20 February</h3>

                {/* <button onClick={this.props.signOut}>Sign Out</button> */}
            </div>
        );
    }
}

export default Home;
