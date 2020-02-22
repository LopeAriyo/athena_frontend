import React, { useState } from "react";
import TopNavigation from "../navigation/TopNavigation";

// import Moment from "react-moment";
import CircularSlider from "react-circular-slider-svg";

import TrackForm from "../components/TrackForm";

const Cycle = () => {
    const [value1, setValue1] = useState(1);

    let cycleStartDate = new Date("01/31/2020");
    const cycleLength = 28;
    const periodLength = 4;
    const today = new Date();

    const createCycle = () => {
        let cycle = [];

        for (let i = 0; i <= cycleLength; i++) {
            cycleStartDate.setDate(cycleStartDate.getDate() + i);
            var day = cycleStartDate.getDate(); //numerical day
            var month = cycleStartDate.getMonth() + 1;
            var year = cycleStartDate.getFullYear();

            const date = new Date(year, month - 1, day); // 2009-11-10
            const formattedMonth = date.toLocaleString("default", {
                month: "short"
            });
            var formattedCycleDate = {
                displayDate: formattedMonth + " " + day,
                referenceDate: { day: day, month: month, year: year }
            };
            cycle.push(formattedCycleDate);
            cycleStartDate = new Date("01/31/2020");
        }
        return cycle;
    };

    const cycle = createCycle();

    const createPeriod = () => {
        let period = [];

        for (let i = 0; i <= periodLength; i++) {
            cycleStartDate.setDate(cycleStartDate.getDate() + i);
            var day = cycleStartDate.getDate(); //numerical day
            var month = cycleStartDate.getMonth() + 1; // Jan = 0 hence the plus 1
            var year = cycleStartDate.getFullYear(); // e.g. 2020

            const date = new Date(year, month - 1, day); // 2009-11-10
            const formattedMonth = date.toLocaleString("default", {
                month: "short"
            });
            var formattedPeriodDate = {
                displayDate: formattedMonth + " " + day,
                referenceDate: { day: day, month: month, year: year }
            };
            period.push(formattedPeriodDate);
            cycleStartDate = new Date("01/31/2020");
        }
        return period;
    };

    const period = createPeriod();

    const doesDateMatch = () => {
        let date1 = today;
        let date2 = new Date(
            cycle[Math.round(value1) - 1].referenceDate.year,
            cycle[Math.round(value1) - 1].referenceDate.month - 1,
            cycle[Math.round(value1) - 1].referenceDate.day
        );
        if (date1.toDateString() === date2.toDateString()) {
            return true;
        } else {
            return false;
        }
    };

    const isDateInFuture = () => {
        let date1 = today;
        let date2 = new Date(
            cycle[Math.round(value1) - 1].referenceDate.year,
            cycle[Math.round(value1) - 1].referenceDate.month - 1,
            cycle[Math.round(value1) - 1].referenceDate.day
        );
        if (date2 > date1) {
            return true;
        } else {
            return false;
        }
    };

    isDateInFuture();

    const isOnPeriod = () => {
        if (period[Math.round(value1) - 1]) {
            let date1 = new Date(
                period[Math.round(value1) - 1].referenceDate.year,
                period[Math.round(value1) - 1].referenceDate.month - 1,
                period[Math.round(value1) - 1].referenceDate.day
            );
            let date2 = new Date(
                cycle[Math.round(value1) - 1].referenceDate.year,
                cycle[Math.round(value1) - 1].referenceDate.month - 1,
                cycle[Math.round(value1) - 1].referenceDate.day
            );

            if (date1.toDateString() === date2.toDateString()) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    };

    // const getStartAngle = todaysDate => {
    //     // if todays date matches an element in the array return the index
    //     // for each element in array
    // };

    return (
        <div className="Page">
            <TopNavigation pageName="Cycle" />
            <div className="Component">
                <CircularSlider
                    size={300}
                    startAngle={350 / cycleLength} //this needs to be decided by the current date
                    endAngle={350}
                    minValue={1}
                    maxValue={cycleLength}
                    angleType={{
                        direction: "cw",
                        axis: "+y"
                    }}
                    handle1={{
                        value: value1,
                        onChange: v => setValue1(v)
                    }}
                    arcColor="#233750"
                    arcBackgroundColor="#233750"
                />
                <div className="CycleInfoCircle">
                    <p className="white-text">Day</p>
                    <h1 className="dark-text">{Math.round(value1)}</h1>
                    {isOnPeriod() === true ? (
                        <div>
                            {periodLength + 1 - Math.round(value1) === 0 ? (
                                <p className="small-text dark-text">
                                    {" "}
                                    Period ends today!{" "}
                                </p>
                            ) : (
                                <p className="small-text dark-text">
                                    Period ends in
                                    {" " +
                                        (periodLength +
                                            1 -
                                            Math.round(value1)) +
                                        " "}
                                    days
                                </p>
                            )}
                        </div>
                    ) : (
                        <div>
                            {cycleLength + 1 - Math.round(value1) !== 1 ? (
                                <p className="small-text dark-text">
                                    {" "}
                                    Period starts in{" "}
                                    {cycleLength + 1 - Math.round(value1)} days
                                </p>
                            ) : (
                                <p className="small-text dark-text">
                                    Period starts tomorrow
                                </p>
                            )}
                        </div>
                    )}
                </div>
                <br></br>
                <button className="light-btn normal-btn">
                    {/* is date in future or today , if yes button  say Enter data for today else  */}
                    {isDateInFuture() === true || doesDateMatch() === true ? (
                        <p className="regular-text dark-text">
                            {" "}
                            Enter data for today
                        </p>
                    ) : (
                        <p className="regular-text dark-text">
                            {" "}
                            Enter data for{" "}
                            {cycle[Math.round(value1) - 1].displayDate}
                        </p>
                    )}
                </button>
            </div>
            <TrackForm />
        </div>
    );
};

export default Cycle;
