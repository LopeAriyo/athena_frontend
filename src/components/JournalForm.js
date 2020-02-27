import React from "react";
import "./modal.scss";
import API from "../adapters/API";
class JournalForm extends React.Component {
    state = {
        formData: {}
    };

    componentDidMount() {
        if (this.props.journal.latest_entry) {
            this.setState({
                patch: true,
                entryId: this.props.journal.latest_entry.id,
                formData: {
                    ...this.props.journal.latest_entry.entry_details
                }
            });
        }
    }

    handleChange = event => {
        this.setState({
            formData: {
                ...this.state.formData,
                [event.target.name]: event.target.value
            }
        });
    };
    question = question => {
        return (
            <>
                <h5 className="white-text">{question.prompt}</h5>
                <select
                    name={question.id}
                    value={this.state.formData[question.id]}
                >
                    <option value="">Please choose an option</option>
                    {question.options.map(op => (
                        <option value={op.id}>{op.answer}</option>
                    ))}
                </select>
            </>
        );
    };

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.patch) {
            API.patchEntry(this.state.entryId, this.state.formData).then(() => {
                this.props.closeJournalForm();
            });
        } else {
            API.postEntry(this.props.journal.id, this.state.formData).then(
                () => {
                    this.props.closeJournalForm();
                }
            );
        }
        this.setState({ formData: {} });
    };

    render() {
        return (
            <div className="modal">
                <form onChange={this.handleChange}>
                    {this.props.journal.questions.map(this.question)}

                    <button
                        className="light-btn normal-btn"
                        // disabled={isDisabled}
                        onClick={this.handleSubmit}
                    >
                        <p className="normal-text dark-text">Submit</p>
                    </button>
                </form>
                <button onClick={event => this.props.closeJournalForm()}>
                    Close Form
                </button>
            </div>
        );
    }
}

export default JournalForm;
