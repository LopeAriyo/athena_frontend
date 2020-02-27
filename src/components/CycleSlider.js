import React from "react";
import CircularSlider from "react-circular-slider-svg";

const CycleSlider = props => {
    return (
        <div>
            <CircularSlider
                size={300}
                startAngle={350 / props.cycleLength}
                endAngle={350}
                minValue={1}
                maxValue={props.cycleLength}
                angleType={{
                    direction: "cw",
                    axis: "+y"
                }}
                handle1={{
                    value: props.value1,
                    onChange: v => props.setValue1(v)
                }}
                arcColor="#233750"
                arcBackgroundColor="#233750"
            />
        </div>
    );
};

export default CycleSlider;
