import React from "react";
// import { Link } from "react-router-dom";
import Moment from "react-moment";

class Home extends React.Component {
    getTimeOfDay(currentDateTime) {
        const currentTime = currentDateTime.getHours();

        if (currentTime >= 6 && currentTime < 12) {
            return "morning";
        }

        if (currentTime >= 12 && currentTime < 15) {
            return "afternoon";
        }

        if (currentTime >= 15 && currentTime < 18) {
            return "evening";
        }

        if (
            (currentTime >= 18 && currentTime <= 23) ||
            (currentTime >= 0 && currentTime < 6)
        ) {
            return "night";
        }
    }

    render() {
        const { first_name } = this.props.user;
        const currentDateTime = new Date();
        const timeOfDay = this.getTimeOfDay(currentDateTime);

        return (
            <main>
            <caption> Home</caption>
                <h4 className="light-text"> Good {timeOfDay}, </h4>
                <h4 className="white-text"> {first_name}</h4>
                <h5 className="white-text">
                    {" "}
                    <div>
                        <Moment format="dddd," />
                        <br></br>
                        <Moment format="DD MMMM" />
                    </div>
                </h5>
            </main>
        );
    }
}

export default Home;
