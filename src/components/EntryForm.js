import React from "react";
import "../css/modal.scss";
import { ReactComponent as Cross } from "../assets/icons/Cross.svg";
import API from "../adapters/API";

class EntryForm extends React.Component {
    state = {
        formData: {},
        index: 0
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
        const isCheckbox = event.target.type === "checkbox";
        const value = isCheckbox
            ? parseInt(event.target.value)
            : event.target.value;
        if (isCheckbox) {
            this.setState({
                formData: {
                    ...this.state.formData,
                    [event.target.name]: this.state.formData[event.target.name]
                        ? [...this.state.formData[event.target.name], value]
                        : [value]
                }
            });
            return;
        }
        this.setState({
            formData: {
                ...this.state.formData,
                [event.target.name]: value
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

    handleButtonClickForward = () => {
        this.setState({ index: this.state.index + 2 });
    };

    handleButtonClickBackward = () => {
        this.setState({ index: this.state.index - 2 });
    };

    stepUp = qid => {
        this.setState({
            formData: {
                ...this.state.formData,
                [qid]: this.state.formData[qid] + 1 || 1
            }
        });
    };

    stepDown = qid => {
        this.setState({
            formData: {
                ...this.state.formData,
                [qid]: this.state.formData[qid] - 1 || 1
            }
        });
    };

    question = question => {
        return (
            <>
                {console.log(question)}
                <p className="white-text large-text">{question.prompt}</p>

                {question.question_type === "checkbox" && (
                    <div className="checkbox-input">
                        {question.options.map(op => (
                            <label>
                                <input
                                    name={question.id}
                                    key={question.id}
                                    type="checkbox"
                                    value={op.id}
                                    checked={
                                        this.state.formData[question.id]
                                            ? this.state.formData[
                                                  question.id
                                              ].includes(op.id)
                                            : false
                                    }
                                    className="option-input"
                                />
                                <p key={op.id}>{op.answer}</p>
                            </label>
                        ))}
                    </div>
                )}
                {question.question_type === "radio" && (
                    <div className="radio-input">
                        {question.options.map(op => (
                            <label>
                                <input
                                    name={question.id}
                                    key={question.id}
                                    type="radio"
                                    value={this.state.formData[question.id]}
                                    className="option-input radio"
                                />
                                <p key={op.id}>{op.answer}</p>
                            </label>
                        ))}
                    </div>
                )}
                {question.question_type === "number" && (
                    <div className="number-input">
                        <div>
                            <button
                                type="button"
                                onClick={() => this.stepDown(question.id)}
                            ></button>
                        </div>
                        <div>
                            <input
                                name={question.id}
                                className="quantity"
                                key={question.id}
                                type="number"
                                min="0"
                                value={this.state.formData[question.id]}
                            />
                        </div>
                        <div>
                            <button
                                type="button"
                                onClick={() => this.stepUp(question.id)}
                                className="plus"
                            ></button>
                        </div>
                    </div>
                )}
                {question.question_type === "range" && (
                    <div className="slider-container">
                        <input
                            name={question.id}
                            key={question.id}
                            type="range"
                            min="1"
                            max={question.options.length}
                            value={this.state.formData[question.id]}
                            className="slider"
                        />
                        <div className="slider-options">
                            {question.options.map(op => (
                                <p key={op.id}>{op.answer}</p>
                            ))}
                        </div>
                    </div>
                )}
                {question.question_type === "select" && (
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
                )}
            </>
        );
    };

    render() {
        const questionList = this.props.journal.questions.slice(
            this.state.index,
            this.state.index + 2
        );
        return (
            <div className="athena-modal">
                <div className="close-button">
                    <Cross onClick={event => this.props.closeEntryForm()} />
                </div>
                <form onChange={this.handleChange}>
                    {questionList.map(this.question)}
                    <br></br>
                    {this.props.journal.questions.length > 2 && (
                        <div>
                            <button
                                onClick={this.handleButtonClickBackward}
                                type="button"
                                className="light-btn small-btn"
                            >
                                <p className="small-text dark-text">Previous</p>
                            </button>
                            <button
                                onClick={this.handleButtonClickForward}
                                type="button"
                                className="light-btn small-btn"
                            >
                                <p className="small-text dark-text">Next</p>
                            </button>
                            <br></br>
                        </div>
                    )}
                    <button
                        className="light-btn normal-btn"
                        onClick={this.handleSubmit}
                    >
                        <p className="small-text dark-text">Submit</p>
                    </button>
                </form>
            </div>
        );
    }
}

export default EntryForm;
