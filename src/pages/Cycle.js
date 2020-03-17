import React from "react";
import Moment from "react-moment";

import "../css/Cycle.css";
import "../css/Journal.css";

import CycleWheelContainer from "../components/CycleWheelContainer";
import EntryForm from "../components/EntryForm";
import JournalsContainer from "../components/JournalsContainer";
import API from "../adapters/API";
import AddJournalForm from "../components/AddJournalForm";
class Cycle extends React.Component {
    state = {
        entryFormVisible: false,
        cycleJournals: this.props.currentCycle.cycle_journals,
        addJournalFormVisible: false,
        journalsVisible: false,
        journalOptions: [],
        journal_id: null
    };

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.journal_id === "" || this.state.journal_id === null) {
            alert("Please Choose An Option");
            return;
        } else {
            API.postCycleJournal(this.state.journal_id)
                .then(data => {
                    this.updateCycleJournals(data);
                })
                .then(() =>
                    this.setState({
                        journalOptions: [...this.state.journalOptions].filter(
                            journal => journal.id !== this.state.journal_id
                        )
                    })
                );

            alert("Journal Added!");
        }
    };

    handleChange = event => {
        this.setState({
            journal_id: event.target.value
        });
    };

    getTimeOfDay(currentDateTime) {
        const currentTime = currentDateTime.getHours();

        if (currentTime >= 6 && currentTime < 12) {
            return "morning";
        }

        if (currentTime >= 12 && currentTime < 15) {
            return "afternoon";
        }

        if (currentTime >= 15 && currentTime < 18) {
            return "evening";
        }

        if (
            (currentTime >= 18 && currentTime <= 23) ||
            (currentTime >= 0 && currentTime < 6)
        ) {
            return "night";
        }
    }

    getCycleJournalDetails = id => {
        API.getCycleJournal(id).then(cycleJournal => {
            this.setState({
                entryFormVisible: true,
                cycleJournal
            });
        });
    };

    updateCycleJournals = journal => {
        this.setState({
            cycleJournals: [...this.state.cycleJournals, journal],
            journal_id: null
        });
    };

    deleteCycleJournal = journal => {
        let deleteJournal = window.confirm(
            `Are you sure you want to delete your ${journal.category} journal?`
        );

        if (deleteJournal !== true) {
            return;
        } else {
            API.destroyCycleJournal(journal.id)
                .then(() =>
                    this.setState({
                        cycleJournal: {},
                        cycleJournals: [...this.state.cycleJournals].filter(
                            oldJournal => oldJournal.id !== journal.id
                        )
                    })
                )
                .then(() => this.displayJournalOptions());
        }
    };

    displayJournalOptions = () => {
        if (this.state.cycleJournals) {
            const currentJournalsCategories = this.state.cycleJournals.map(
                journal => journal.category
            );

            const filteredJournals = this.props.journals.filter(
                journal => !currentJournalsCategories.includes(journal.category)
            );

            this.setState({ journalOptions: filteredJournals });
        }
    };

    toggleDisplayJournals = () => {
        this.setState({
            journalsVisible: !this.state.journalsVisible
        });
    };

    toggleAddJournalForm = () => {
        this.displayJournalOptions();
        this.setState({
            addJournalFormVisible: !this.state.addJournalFormVisible
        });
    };

    showEntryForm = () => {
        this.setState({ entryFormVisible: !this.state.entryFormVisible });
    };

    closeEntryForm = () => {
        this.setState({ entryFormVisible: false });
    };

    componentDidUpdate(prevProps, prevState) {}

    render() {
        const { first_name } = this.props.user;
        const currentDateTime = new Date();
        const timeOfDay = this.getTimeOfDay(currentDateTime);

        return (
            <main>
                <h5 className="white-text"> Cycle</h5>
                <h4 className="light-text"> Good {timeOfDay}, </h4>
                <h4 className="white-text"> {first_name}</h4>
                <p className="large-text white-text">
                    {" "}
                    <div>
                        <Moment format="dddd, DD MMMM" />
                        <br></br>
                    </div>
                </p>

                <CycleWheelContainer
                    createNewCycle={this.props.createNewCycle}
                    patchPeriod={this.props.patchPeriod}
                    deletePeriod={this.props.deletePeriod}
                    patchCurrentCycle={this.props.patchCurrentCycleThenCreate}
                    currentCycle={this.props.currentCycle}
                    deleteCycle={this.props.deleteCurrentCycleThenPatchLast}
                />
                <br></br>
                {this.state.journalsVisible ? (
                    <div>
                        <button
                            className="light-btn normal-btn"
                            onClick={this.toggleDisplayJournals}
                        >
                            <p className="small-text dark-text">
                                Hide Journals
                            </p>
                        </button>
                    </div>
                ) : (
                    <div>
                        <button
                            className="light-btn normal-btn"
                            onClick={this.toggleDisplayJournals}
                        >
                            <p className="small-text dark-text">
                                Show Journals
                            </p>
                        </button>
                    </div>
                )}
                {this.state.journalsVisible && (
                    <div>
                        <button
                            className="light-btn normal-btn"
                            onClick={this.toggleAddJournalForm}
                        >
                            {this.state.addJournalFormVisible !== true ? (
                                <p className="small-text dark-text">
                                    {" "}
                                    Add a New Journal
                                </p>
                            ) : (
                                <p className="small-text dark-text">
                                    {" "}
                                    Close Form
                                </p>
                            )}
                        </button>
                        {this.state.addJournalFormVisible && (
                            <AddJournalForm
                                getCurrentCycle={this.props.getCurrentCycle}
                                journalOptions={this.state.journalOptions}
                                handleChange={this.handleChange}
                                handleSubmit={this.handleSubmit}
                            />
                        )}

                        <JournalsContainer
                            onJournalCardClick={this.getCycleJournalDetails}
                            deleteCycleJournal={this.deleteCycleJournal}
                            cycle_journals={this.state.cycleJournals}
                        />
                        {this.state.entryFormVisible && (
                            <EntryForm
                                journal={this.state.cycleJournal}
                                closeEntryForm={this.closeEntryForm}
                            />
                        )}
                    </div>
                )}
            </main>
        );
    }
}
export default Cycle;
