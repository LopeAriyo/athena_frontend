import React from "react";
import JournalCard from "./JournalCard";

//TODO
//+ Add Toggle New Journal Select
//+ When New cycle Journal is added, automatically call journal form so it can persist to the back end
//+ If cycle journal already exists then alert the user and return
//+ Add a delete button to each cycle journal and create a delete cycle journal function

const JournalsContainer = ({
    onJournalCardClick,
    deleteCycleJournal,
    cycle_journals = []
}) => {
    return (
        <div>
            <div className="journal-cards">
                {cycle_journals.map(journal => (
                    <div key={journal.id}>
                        <JournalCard
                            onClick={() => onJournalCardClick(journal.id)}
                            journal={journal}
                        />
                        {journal.category !== "Period" && (
                            <button
                                className="dark-btn small-btn"
                                onClick={() => deleteCycleJournal(journal)}
                            >
                                <p className="small-text light-text"> Delete</p>
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JournalsContainer;
