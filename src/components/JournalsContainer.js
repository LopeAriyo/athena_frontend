import React from "react";
import JournalCard from "./JournalCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const JournalsContainer = ({
    handleButtonClickForward, 
    handleButtonClickBackward,
    onJournalCardClick,
    deleteCycleJournal,
    cycle_journals = []
}) => {

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <div >
             
                {/* <div className="journal-slider"> */}
                <Carousel responsive={responsive}>
                
            
                {cycle_journals.map(journal => (
                    <div key={journal.id} >
                        <JournalCard
                        key={journal.id}
                            onClick={() => onJournalCardClick(journal.id)}
                            journal={journal}
                            icon={journal.category}
                            handleDelete={deleteCycleJournal}
                        />
                    </div>
                ))}
                </Carousel>
                {/* </div> */}
                
        </div>
    );
};

export default JournalsContainer;
