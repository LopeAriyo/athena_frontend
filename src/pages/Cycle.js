import React, { useState } from "react";
import TopNavigation from "../navigation/TopNavigation";

import CircularSlider from "react-circular-slider-svg";

import TrackForm from "../components/TrackForm";

//TODO
//+ get the cycle start date
//+ get the cycle length
//+ calculate the cycle length = (sd - ed)
//+ create an array to represent the cycle
//+ each element is equal to a day, the total number of days in the cycle is equal to the cycle length
//+ for each element in the cycle array render a div to represent the cycle days
//+ each circle should display the cycle day number
//+ each circle also needs a degree so that it appears as a border around the main circle

const Cycle = () => {
    const [value1, setValue1] = useState(1);
    const cycleLength = 28;
    const cycleStartDate = "02/01/2020";

    return (
        <div className="Page">
            <TopNavigation pageName="Cycle" />
            <div className="Component">
                <CircularSlider
                    size={245}
                    startAngle={350 / cycleLength} //this needs to be decided by the current date
                    endAngle={350}
                    minValue={0}
                    maxValue={cycleLength - 1}
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
                    <p>
                        Period starts in {cycleLength - Math.round(value1)} days
                    </p>
                </div>
                <br></br>
                <button className="light-btn normal-btn">
                    {/* onClick={showForm} */}
                    <p className="dark-text"> Enter today's data </p>
                </button>
            </div>
            <TrackForm />
        </div>
    );
};

export default Cycle;
