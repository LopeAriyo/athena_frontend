import React from "react";
import JournalCard from "./JournalCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const JournalsContainer = ({
    onJournalCardClick,
    deleteCycleJournal,
    cycle_journals = []
}) => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 414, min: 0 },
            items: 2
        }
    };

    return (
        <div className="journal-container">
            <Carousel
                responsive={responsive}
                showDots={true}
                arrows={true}
                removeArrowOnDeviceType={["tablet", "mobile"]}
            >
                {cycle_journals.map(journal => (
                    <div key={journal.id}>
                        <p className="normal-text white-text">
                            {journal.category}
                        </p>
                        <JournalCard
                            key={journal.id}
                            onClick={() => onJournalCardClick(journal.id)}
                            journal={journal}
                            handleDelete={deleteCycleJournal}
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default JournalsContainer;
