import React from "react";
import API from "../adapters/API";
import { ReactComponent as Plus } from "../assets/icons/Plus.svg";

class AddJournalForm extends React.Component {
    state = {
        journal_id: null
    };

    handleChange = event => {
        this.setState({
            journal_id: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.journal_id === "" || this.state.journal_id === null) {
            alert("Please Choose An Option");
            return;
        } else {
            API.postCycleJournal(this.state.journal_id).then(data =>
                this.props.updateCycleJournals(data)
            );
        }
    };

    render() {
        return (
            <div>
                <form className="add-journal-form">
                    <select id="journals" onChange={this.handleChange}>
                        <option value="">Please choose an option</option>
                        {this.props.journalOptions.map(journal => (
                            <option key={journal.id} value={journal.id}>
                                {" "}
                                {journal.category}
                            </option>
                        ))}
                    </select>

                    <div>
                        <Plus onClick={this.handleSubmit} />
                    </div>
                </form>
            </div>
        );
    }
}

export default AddJournalForm;
