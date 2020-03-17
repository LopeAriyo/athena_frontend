import React from "react";
// import API from "../adapters/API";
import { ReactComponent as Plus } from "../assets/icons/Plus.svg";

class AddJournalForm extends React.Component {
    // state = {
    //     journal_id: null
    // };

    // handleChange = event => {
    //     this.setState({
    //         journal_id: event.target.value
    //     });
    // };

    // handleSubmit = event => {
    //     event.preventDefault();
    //     if (this.state.journal_id === "" || this.state.journal_id === null) {
    //         alert("Please Choose An Option");
    //         return;
    //     } else {
    //         API.postCycleJournal(this.state.journal_id).then(data => {
    //             this.props.updateCycleJournals(data);
    //             this.setState({ journal_id: null });
    //         });
    //         // .then(() => );
    //     }
    // };

    render() {
        return (
            <div>
                {this.props.journalOptions.length > 0 ? (
                    <form className="add-journal-form">
                        <select
                            id="journals"
                            onChange={this.props.handleChange}
                        >
                            <option value="" defaultChecked>
                                Please choose an option
                            </option>
                            {this.props.journalOptions.map(journal => (
                                <option key={journal.id} value={journal.id}>
                                    {" "}
                                    {journal.category}
                                </option>
                            ))}
                        </select>

                        <div>
                            <Plus onClick={this.props.handleSubmit} />
                        </div>
                    </form>
                ) : (
                    <p className="white-text normal-text">
                        There are no more journals available to add
                    </p>
                )}
            </div>
        );
    }
}

export default AddJournalForm;
