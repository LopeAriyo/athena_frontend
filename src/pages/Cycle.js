import React from "react";
import TopNavigation from "../navigation/TopNavigation";

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

    patchCurrentCycle = () => {
        // API.patchCycle(this.state.entryId, this.state.formData).then(() => {
        //     this.props.closeJournalForm();
        // })
        console.log("I've patched the current cycle");

        this.createNewCycle();
    };
    createNewCycle = () => {
        // needs to amend currentCycles cycle length
        // needs today's date
        console.log("I've created a new cycle");
    };

    patchPreviousCycle = () => {};
    deleteCurrentCycle = () => {};

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

    componentDidUpdate(prevProps, prevState) {
        console.log("cycle did update");
    }

    render() {
        return (
            <div className="Page">
                <TopNavigation pageName="Cycle" />

                <div className="Component">
                    <CycleWheelContainer
                        createNewCycle={this.createNewCycle}
                        patchCurrentCycle={this.patchCurrentCycle}
                        deleteCurrentCycle={this.deleteCurrentCycle}
                        patchPreviousCycle={this.patchPreviousCycle}
                        currentCycle={this.props.currentCycle}
                    />
                    <br></br>

                    <br></br>
                    {/* <button className="light-btn normal-btn">
                        <p className="small-text dark-text"> Show Journals</p>
                    </button> */}
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
            </div>
        );
    }
}
export default Cycle;
