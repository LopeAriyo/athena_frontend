import React from "react";

import "../css/Cycle.css";

import CycleWheelContainer from "../components/CycleWheelContainer";
import JournalForm from "../components/JournalForm";
import JournalsContainer from "../components/JournalsContainer";
import API from "../adapters/API";
import AddJournalForm from "../components/AddJournalForm";
class Cycle extends React.Component {
    state = {
        journalFormVisible: false,
        cycleJournals: this.props.currentCycle.cycle_journals,
        showAddJournalForm: false,
        journalOptions: []
    };

    getCycleJournalDetails = id => {
        API.getCycleJournal(id).then(cycleJournal => {
            this.setState({
                journalFormVisible: true,
                cycleJournal
            });
        });
    };

    updateCycleJournals = journal => {
        this.setState({
            cycleJournals: [...this.state.cycleJournals, journal]
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

    toggleAddJournalForm = () => {
        this.displayJournalOptions();
        this.setState({
            showAddJournalForm: !this.state.showAddJournalForm
        });
    };

    showJournalForm = () => {
        this.setState({ journalFormVisible: !this.state.journalFormVisible });
    };

    closeJournalForm = () => {
        this.setState({ journalFormVisible: false });
    };

    componentDidUpdate(prevProps, prevState) {}

    render() {
        return (
            <main>
                <h1> Cycle</h1>

                <div>
                    <CycleWheelContainer
                        createNewCycle={this.props.createNewCycle}
                        patchCurrentCycle={
                            this.props.patchCurrentCycleThenCreate
                        }
                        currentCycle={this.props.currentCycle}
                        deleteCycle={this.props.deleteCurrentCycleThenPatchLast}
                    />
                    <br></br>

                    <br></br>
                    <button className="light-btn normal-btn">
                        <p className="small-text dark-text"> Show Journals</p>
                    </button>
                </div>
                <JournalsContainer
                    onJournalCardClick={this.getCycleJournalDetails}
                    deleteCycleJournal={this.deleteCycleJournal}
                    cycle_journals={this.state.cycleJournals}
                />
                {this.state.journalFormVisible && (
                    <JournalForm
                        journal={this.state.cycleJournal}
                        closeJournalForm={this.closeJournalForm}
                    />
                )}
                {this.state.showAddJournalForm && (
                    <AddJournalForm
                        updateCycleJournals={this.updateCycleJournals}
                        getCurrentCycle={this.props.getCurrentCycle}
                        journalOptions={this.state.journalOptions}
                    />
                )}
                <button
                    className="light-btn normal-btn"
                    onClick={this.toggleAddJournalForm}
                >
                    {this.state.showAddJournalForm !== true ? (
                        <p className="small-text dark-text">
                            {" "}
                            Add a New Journal
                        </p>
                    ) : (
                        <p className="small-text dark-text"> Hide</p>
                    )}
                </button>
            </main>
        );
    }
}
export default Cycle;
