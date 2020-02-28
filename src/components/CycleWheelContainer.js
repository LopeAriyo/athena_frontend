import React from "react";
import CycleSlider from "../components/CycleSlider";
import API from "../adapters/API";

class CycleWheelContainer extends React.Component {
    state = {
        cycleStartDate: new Date(this.props.currentCycle.start_date),
        estimatedCycleLength: this.props.currentCycle.estimated_cycle_length,
        estimatedPeriodLength: this.props.currentCycle.estimated_period_length,
        today: new Date(),
        cycleArray: [],
        periodArray: [],
        cycleDay: 1,
        dateMatch: true
    };

    setCycleDay = cycleDay => {
        this.setState({
            cycleDay
        });
    };

    createCycle = () => {
        const cycle = [];

        for (let i = 0; i < this.state.estimatedCycleLength; i++) {
            this.state.cycleStartDate.setDate(
                this.state.cycleStartDate.getDate() + i
                // i represents a number of days and adds that to the original day
            );

            var day = this.state.cycleStartDate.getDate(); //numerical day
            var month = this.state.cycleStartDate.getMonth() + 1;
            var year = this.state.cycleStartDate.getFullYear();

            const date = new Date(year, month - 1, day); // 2009-11-10

            const formattedMonth = date.toLocaleString("default", {
                month: "short"
            });

            var formattedCycleDate = {
                displayDate: formattedMonth + " " + day,
                referenceDate: { day: day, month: month, year: year }
            };

            cycle.push(formattedCycleDate);

            this.state.cycleStartDate.setDate(
                this.state.cycleStartDate.getDate() - i
                // resets the date back to the original day
            );
        }
        this.setState({ cycleArray: cycle }, () => this.findCycleDay());
    };

    createPeriod = () => {
        const period = [];

        for (let i = 0; i < this.state.estimatedPeriodLength; i++) {
            this.state.cycleStartDate.setDate(
                this.state.cycleStartDate.getDate() + i
            );

            var day = this.state.cycleStartDate.getDate(); //numerical day
            var month = this.state.cycleStartDate.getMonth() + 1; // Jan = 0 hence the plus 1
            var year = this.state.cycleStartDate.getFullYear(); // e.g. 2020

            const date = new Date(year, month - 1, day); // 2009-11-10
            const formattedMonth = date.toLocaleString("default", {
                month: "short"
            });
            var formattedPeriodDate = {
                displayDate: formattedMonth + " " + day,
                referenceDate: { day: day, month: month, year: year }
            };

            period.push(formattedPeriodDate);
            this.state.cycleStartDate.setDate(
                this.state.cycleStartDate.getDate() - i
                // resets the date back to the original day
            );
        }
        this.setState({ periodArray: period });
    };

    isOnPeriod = (cycleDay, period, cycle) => {
        const roundedCycleDay = Math.floor(cycleDay);
        if (period[roundedCycleDay]) {
            let date1 = new Date(
                period[roundedCycleDay - 1].referenceDate.year,
                period[roundedCycleDay - 1].referenceDate.month - 1,
                period[roundedCycleDay - 1].referenceDate.day
            );
            let date2 = new Date(
                cycle[roundedCycleDay - 1].referenceDate.year,
                cycle[roundedCycleDay - 1].referenceDate.month - 1,
                cycle[roundedCycleDay - 1].referenceDate.day
            );

            if (date1.toDateString() === date2.toDateString()) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    };

    doesDateMatch = (cycleDay, cycle) => {
        const roundedCycleDay = Math.floor(cycleDay);
        if (cycle[roundedCycleDay]) {
            let date1 = this.state.today;
            let date2 = new Date(
                cycle[roundedCycleDay - 1].referenceDate.year,
                cycle[roundedCycleDay - 1].referenceDate.month - 1,
                cycle[roundedCycleDay - 1].referenceDate.day
            );
            console.log(date1.toDateString());
            console.log(date2.toDateString());

            if (date1.toDateString() === date2.toDateString()) {
                console.log("true");
                return true;
            } else {
                console.log("false");
                return false;
            }
        }
    };

    isToday = date => {
        const day = this.state.today.getDate();
        const formattedMonth = this.state.today.toLocaleString("default", {
            month: "short"
        });
        const formattedTodayDate = formattedMonth + " " + day;

        return date.displayDate === formattedTodayDate;
        //returns a boolean to compare if date is equal to today
    };

    findCycleDay = () => {
        this.setState({
            cycleDay: this.state.cycleArray.findIndex(this.isToday) + 1 //because of array
        });
    };

    componentDidMount() {
        this.createCycle();
        this.createPeriod();
    }

    render() {
        const {
            cycleDay,
            estimatedCycleLength,
            estimatedPeriodLength,
            periodArray,
            cycleArray
        } = this.state;

        const { isOnPeriod, doesDateMatch } = this;

        return (
            <div>
                <CycleSlider
                    value1={cycleDay}
                    setValue1={this.setCycleDay}
                    cycleLength={this.state.estimatedCycleLength}
                />

                <button
                    className="CycleInfoCircle"
                    disabled={!doesDateMatch(cycleDay, cycleArray)}
                >
                    <p className="white-text">Day</p>
                    <h1 className="dark-text">{Math.floor(cycleDay)}</h1>
                    {isOnPeriod(cycleDay, periodArray, cycleArray) === true ? (
                        <div>
                            {estimatedPeriodLength - Math.floor(cycleDay) >
                            1 ? (
                                <p className="small-text dark-text">
                                    Period ends in
                                    {" " +
                                        (estimatedPeriodLength -
                                            Math.floor(cycleDay)) +
                                        " "}
                                    days
                                </p>
                            ) : (
                                <p className="small-text dark-text">
                                    {" "}
                                    Period ends tomorrow!{" "}
                                </p>
                            )}
                        </div>
                    ) : (
                        <div>
                            {estimatedPeriodLength - Math.floor(cycleDay) ===
                            0 ? (
                                <p className="small-text dark-text">
                                    {" "}
                                    Period ends today!{" "}
                                </p>
                            ) : (
                                <div>
                                    {estimatedCycleLength -
                                        Math.floor(cycleDay) >=
                                    2 ? (
                                        <p className="small-text dark-text">
                                            {" "}
                                            Period starts in{" "}
                                            {estimatedCycleLength +
                                                -Math.floor(cycleDay)}{" "}
                                            days
                                        </p>
                                    ) : (
                                        <p className="small-text dark-text">
                                            Period starts tomorrow
                                        </p>
                                    )}{" "}
                                </div>
                            )}
                        </div>
                    )}
                </button>
            </div>
        );
    }
}

export default CycleWheelContainer;
