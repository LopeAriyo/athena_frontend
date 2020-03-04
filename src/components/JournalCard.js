import React from "react";
import { ReactComponent as Cross } from "../assets/icons/Cross.svg";
// import Icon from './Icons.jsx'
// import Period from "../assets/icons/Period";
// import OffPeriod from "assets/icons/OffPeriod";
// import Diet from "../assets/icons/Diet";
// import Vitality from "../assets/icons/Vitality";
// import Activity from "../assets/icons/Activity";
// import Medical from "..assets/icons/Medical";
// import BodyMeasurements from "../assets/icons/BodyMeasurements";
// import BodyConditions from "../assets/icons/BodyConditions";

class JournalCard extends React.Component {
    render() {
        return (
            <div className="journal-card">
                <div className="close-button">
                    <Cross
                        onClick={() =>
                            this.props.handleDelete(this.props.journal)
                        }
                    />
                </div>
                <div
                    className="journal-body"
                    onClick={this.props.onClick}
                ></div>
            </div>
        );
    }
}

export default JournalCard;
