import React from "react";
import "./modal.scss";
import { ReactComponent as Cross } from "../assets/icons/Cross.svg";
import API from "../adapters/API";
class EntryForm extends React.Component {
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

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.patch) {
            API.patchEntry(this.state.entryId, this.state.formData).then(() => {
                this.props.closeEntryForm();
            });
        } else {
            API.postEntry(this.props.journal.id, this.state.formData).then(
                () => {
                    this.props.closeEntryForm();
                }
            );
        }
        this.setState({ formData: {} });
    };

    question = question => {
        return (
            <>
                <p className="white-text large-text">{question.prompt}</p>
                {/* {question.question_type === "range" && ( */}
                {/* <div className="range-input">
                        <input
                            type="range"
                            min="1"
                            max={question.options.length}
                            value={this.state.formData[question.id]}
                            className="slider"
                        />
                    </div> */}
                {/* )} */}
                {/* {question.question_type === "select" && ( */}
                <select
                    name={question.id}
                    value={this.state.formData[question.id]}
                    key={question.id}
                >
                    <option value="">Please choose an option</option>
                    {question.options.map(op => (
                        <option value={op.id} key={op.id}>
                            {op.answer}
                        </option>
                    ))}
                </select>
                {/* )} */}
            </>
        );
    };

    render() {
        return (
            <div className="modal">
                <div className="close-button">
                    <Cross onClick={event => this.props.closeEntryForm()} />
                </div>
                <form onChange={this.handleChange}>
                    {this.props.journal.questions.map(this.question)}

                    <button
                        className="light-btn normal-btn"
                        onClick={this.handleSubmit}
                    >
                        <p className="normal-text dark-text">Submit</p>
                    </button>
                </form>
            </div>
        );
    }
}

export default EntryForm;
