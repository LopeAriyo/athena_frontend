import React from "react";

class JournalCard extends React.Component {
    render() {
        return (
            
                <div className="journal-card">
                <div onClick={this.props.onClick} >
                    {this.props.journal.category}
                    </div>
                    {this.props.journal.category !== "Period" && (
                            <button
                                className="dark-btn small-btn"
                                onClick={() => this.props.handleDelete(this.props.journal)}
                            >
                                <p className="small-text light-text"> Delete</p>
                            </button>
                        )}
                </div>
            
        );
    }
}

export default JournalCard;
