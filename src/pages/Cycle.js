import React from "react";

//TODO
//+ get the cycle start date
//+ get the cycle End Date
//+ calculate the cycle length = (sd - ed)
//+ create an array to represent the cycle
//+ each element is equal to a day, the total number of days in the cycle is equal to the cycle length
//+ for each element in the cycle array render a div to represent the cycle days
//+ each circle should display the cycle day number
//+ each circle also needs a degree so that it appears as a border around the main circle

class Cycle extends React.Component {
    state = {
        cycleStartDate: "02/01/2020",
        cycleEndDate: "03/02/2020",
        cycle: []
    };

    //Reminder
    //& cycleStartDate and cycleEndDate will come from props

    getCycleLength = () => {
        let startDate = new Date(this.state.cycleStartDate);
        let endDate = new Date(this.state.cycleEndDate);

        let cycleLength =
            (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);

        return cycleLength;
    };

    createCycle = () => {
        let cycleLength = this.getCycleLength();
        let cycle = [];

        for (let i = 0; i <= cycleLength; i++) {
            cycle.push((i + 1).toString());
        }

        this.setState({ cycle: cycle });
    };

    componentDidMount() {
        this.createCycle();
    }

    // (() => {
    //     console.log(
    //         `rotate(${index * cycleDaysDegree}deg)`
    //     );
    //     return {
    //         "transform-origin": `rotate(${index *
    //             cycleDaysDegree}deg)`,
    //         color: "pink"
    //     };
    // })()

    render() {
        const cycleDaysDegree =
            (360 - this.getCycleLength() / 2) / this.getCycleLength();

        return (
            <div className="Page">
                <h3>Your Cycle</h3>
                <div>
                    {/* <div className="InfoCircle"></div> */}
                    {/* "translate(210px, -50vh)" */}
                </div>
                <div className="CycleCircle">
                    {this.state.cycle.map((day, index) => (
                        <div
                            className="CycleDay"
                            key={index}
                            style={{
                                position: "absolute",
                                transformOrigin: "100% 27vh",
                                transform: `rotate(${index *
                                    cycleDaysDegree}deg)`
                            }}
                        >
                            {" "}
                            Day {day}{" "}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Cycle;
