import React from "react";
import API from "../adapters/API";

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
        API.postCycleJournal(this.state.journal_id).then(data =>
            this.props.updateCycleJournals(data)
        );
    };

    render() {
        return (
            <div>
                <form className="add-journal-form">
                    <select id="journals" onChange={this.handleChange}>
                        {this.props.journalOptions.map(journal => (
                            <option key={journal.id} value={journal.id}>
                                {" "}
                                {journal.category}
                            </option>
                        ))}
                    </select>
                    <button type="submit" onClick={this.handleSubmit}>
                        Add
                    </button>
                </form>
            </div>
        );
    }
}

export default AddJournalForm;
