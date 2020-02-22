import React from "react";

class TrackForm extends React.Component {
    render() {
        return (
            <div>
                <form>
                    <h5 className="white-text">How was your flow today?</h5>
                    <select id="intensity">
                        <option value="1">Light</option>
                        <option value="2">Light Medium</option>
                        <option value="3">Medium</option>
                        <option value="4">Medium Heavy</option>
                        <option value="5">Heavy</option>
                    </select>
                    <h5 className="white-text">
                        What collection method did you use?{" "}
                    </h5>
                    <select id="collection">
                        <option value="1">Tampon (Applicator)</option>
                        <option value="2">Tampon (Non-Applicator)</option>
                        <option value="3">Pad (No Wings)</option>
                        <option value="4">Pad (Wings)</option>
                        <option value="5">Menstrual Discs</option>
                        <option value="6">Menstrual Cup</option>
                        <option value="7"> Other</option>
                    </select>
                    <br></br>
                    <br></br>
                    <button
                        className="light-btn normal-btn"
                        // disabled={isDisabled}
                        // onClick={handleSubmit}
                    >
                        <p className="dark-text">Track</p>
                    </button>
                </form>
            </div>
        );
    }
}

export default TrackForm;
