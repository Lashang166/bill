import React from "react";
// import BillSteps from "./BillSteps";
import StepComponent from "./StepComponent";

export default function StepsOnTopMobile({ step, position }) {
  // console.log("position", position);
  let startScrollAt = 95;
  return (
    <div
    className={`is-hidden-tablet has-background-white-bis`}
    style={
        position > startScrollAt
          ? {
              position: "fixed",
              top: 0,
              left:0,
              paddingBottom: '10px',
              paddingTop: '10px',
              // position: "absolute",
              // top: `${position-startScrollAt-7}px`,
              width: "100%",
              zIndex: 999999
            }
          : {}
      }
    >
      <StepComponent active={parseInt(step, 10)} />
    </div>
  );
}
