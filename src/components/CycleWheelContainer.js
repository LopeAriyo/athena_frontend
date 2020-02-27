import React from "react";
import CycleSlider from "../components/CycleSlider";

class CycleWheelContainer extends React.Component {
    state = {
        cycleStartDate: new Date(this.props.currentCycle.start_date),
        estimatedCycleLength: this.props.currentCycle.estimated_cycle_length,
        estimatedPeriodLength: this.props.currentCycle.estimated_period_length,
        today: new Date(),
        cycleArray: [],
        periodArray: [],
        dateMatch: true,
        cycleDay: 27,
        isToday: true
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
        this.setState({ cycleArray: cycle });
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

    isToday = date => {
        const day = this.state.today.getDate();
        const formattedMonth = this.state.today.toLocaleString("default", {
            month: "short"
        });
        const formattedTodayDate = formattedMonth + " " + day;

        this.setState({ isToday: date.displayDate === formattedTodayDate });
        //returns a boolean to compare if date is equal to today
    };

    findCycleDay = () => {
        this.setState({
            cycleDay: this.state.cycleArray.findIndex(this.isToday)
        });
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

        const { isOnPeriod } = this;

        return (
            <div>
                {
                    <CycleSlider
                        value1={cycleDay}
                        setValue1={this.setCycleDay}
                        today={this.state.today}
                        cycle={this.state.cycleArray}
                        cycleLength={this.state.estimatedCycleLength}
                    />
                }
                <button
                    className="CycleInfoCircle"
                    disabled={!this.state.dateMatch}
                >
                    <p className="white-text">Day</p>
                    <h1 className="dark-text">{Math.round(cycleDay)}</h1>
                    {isOnPeriod(cycleDay, periodArray, cycleArray) === true ? (
                        <div>
                            {estimatedPeriodLength - Math.round(cycleDay) <=
                            1 ? (
                                <div>
                                    {estimatedPeriodLength -
                                        Math.round(cycleDay) ===
                                    0 ? (
                                        <p className="small-text dark-text">
                                            {" "}
                                            Period ends today!{" "}
                                        </p>
                                    ) : (
                                        <p className="small-text dark-text">
                                            {" "}
                                            Period ends tomorrow!{" "}
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <p className="small-text dark-text">
                                    Period ends in
                                    {" " +
                                        (estimatedPeriodLength -
                                            Math.round(cycleDay)) +
                                        " "}
                                    days
                                </p>
                            )}
                        </div>
                    ) : (
                        <div>
                            {estimatedCycleLength + 1 - Math.round(cycleDay) !==
                            1 ? (
                                <p className="small-text dark-text">
                                    {" "}
                                    Period starts in{" "}
                                    {estimatedCycleLength +
                                        1 -
                                        Math.round(cycleDay)}{" "}
                                    days
                                </p>
                            ) : (
                                <p className="small-text dark-text">
                                    Period starts tomorrow
                                </p>
                            )}
                        </div>
                    )}
                </button>
            </div>
        );
    }
}

export default CycleWheelContainer;
