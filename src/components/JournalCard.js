import React from "react";

class JournalCard extends React.Component {
    render() {
        return (
            <div>
                <div onClick={this.props.onClick} className="Journal">
                    {this.props.journal.category}
                </div>
            </div>
        );
    }
}

export default JournalCard;
