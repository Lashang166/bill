import React, { useState } from "react";
import StepComponent from "../components/StepComponent";

export default function TestPage() {
  const [step, setStep] = useState(1);
  console.log('Test',step);
  return (
    <div>
      <StepComponent active={step} />
      <hr />
      <button
        onClick={() => setStep(step > 4 ? 1 : step + 1)}
        className="button"
      >
        Step
      </button>
    </div>
  );
}
