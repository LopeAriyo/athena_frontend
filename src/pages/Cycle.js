import React from "react";

import "../css/Cycle.css";
import "../css/Journal.css";

import { ReactComponent as ChevronDown } from "../assets/icons/ChevronDown.svg";
import { ReactComponent as ChevronUp } from "../assets/icons/ChevronUp.svg";

import CycleWheelContainer from "../components/CycleWheelContainer";
import EntryForm from "../components/EntryForm";
import JournalsContainer from "../components/JournalsContainer";
import API from "../adapters/API";
import AddJournalForm from "../components/AddJournalForm";
class Cycle extends React.Component {
    state = {
        entryFormVisible: false,
        cycleJournals: this.props.currentCycle.cycle_journals,
        index: 0,
        addJournalFormVisible: false,
        journalsVisible: false,
        journalOptions: []
    };

    handleButtonClickForward = () => {
        this.setState({ index: this.state.index + 3 });
    };

    handleButtonClickBackward = () => {
        this.setState({ index: this.state.index - 3 });
    };

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
        return (
            <main>
                <header>
                    <caption> Cycle</caption>
                </header>

                <CycleWheelContainer
                    createNewCycle={this.props.createNewCycle}
                    patchCurrentCycle={this.props.patchCurrentCycleThenCreate}
                    currentCycle={this.props.currentCycle}
                    deleteCycle={this.props.deleteCurrentCycleThenPatchLast}
                />
                <br></br>

                {this.state.journalsVisible && (
                    <div>
                        <JournalsContainer
                            onJournalCardClick={this.getCycleJournalDetails}
                            handleButtonClickForward={this.handleButtonClickForward}
                    handleButtonClickBackward={this.handleButtonClickBackward}
                            deleteCycleJournal={this.deleteCycleJournal}
                            cycle_journals={this.state.cycleJournals.slice(
            this.state.index,
            this.state.index + 3
        )}
                        />
                        {this.state.entryFormVisible && (
                            <EntryForm
                                journal={this.state.cycleJournal}
                                closeEntryForm={this.closeEntryForm}
                            />
                        )}
                        {this.state.addJournalFormVisible && (
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
                            {this.state.addJournalFormVisible !== true ? (
                                <p className="small-text dark-text">
                                    {" "}
                                    Add a New Journal
                                </p>
                            ) : (
                                <p className="small-text dark-text"> Hide</p>
                            )}
                        </button>
                    </div>
                )}
                {this.state.journalsVisible ? (
                    <div className="icon">
                        <ChevronUp  onClick={this.toggleDisplayJournals}/>
                        <span className="link-text logo-text">
                            Hide Journals
                        </span>
                        
                    </div>
                ) : (
                    <div className="icon">
                        <span className="link-text logo-text">
                            Show Journals
                        </span>
                        <ChevronDown  onClick={this.toggleDisplayJournals}/>
                    </div>
                )}
            </main>
        );
    }
}
export default Cycle;
