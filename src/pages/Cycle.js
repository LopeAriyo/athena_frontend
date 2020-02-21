import React, { useState } from "react";
import CircularSlider from "react-circular-slider-svg";

//TODO
//+ get the cycle start date
//+ get the cycle End Date
//+ calculate the cycle length = (sd - ed)
//+ create an array to represent the cycle
//+ each element is equal to a day, the total number of days in the cycle is equal to the cycle length
//+ for each element in the cycle array render a div to represent the cycle days
//+ each circle should display the cycle day number
//+ each circle also needs a degree so that it appears as a border around the main circle
const Cycle = () => {
    const [value1, setValue1] = useState(1);

    return (
        <div className="Page">
            <h3>Your Cycle</h3>
            <div>
                <CircularSlider
                    size={300}
                    startAngle={0}
                    endAngle={360}
                    minValue={0}
                    maxValue={28} //cycle length - 1
                    angleType={{
                        direction: "cw",
                        axis: "+y"
                    }}
                    handle1={{
                        value: value1,
                        onChange: v => setValue1(v)
                    }}
                    arcColor="#690"
                />
                {/* <div className="InfoCircle"></div> */}
                {/* "translate(210px, -50vh)" */}
            </div>
            <div className="CycleCircle"></div>
        </div>
    );
};

export default Cycle;
