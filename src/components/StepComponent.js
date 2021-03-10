import React from "react";
// import "rc-steps/assets/index.css";
// import "rc-steps/assets/iconfont.css";
// import "../lib/rc-steps.css";
// import Steps, { Step } from "rc-steps";

// const icons = {
//   waitForPayment: <i className="fas fa-comment-dollar" />,
//   waitForAddress: <i className="far fa-address-card" />,
//   waitForDelivery: <i className="fas fa-truck" />,
//   waitForSent: <i className="far fa-smile" />
// };

// export default function StepComponent({ active, className }) {
//   const step = active > 4 ? 4 : active - 1;
//   console.log("step", step);
//   return (
//     <div className={`container ${className}`}>
//       <Steps current={step}  status={"error"} labelPlacement="vertical" >
//         <Step title="ชำระเงิน" icon={icons.waitForPayment} />
//         <Step title="ที่อยู่จัดส่ง" icon={icons.waitForAddress} />
//         <Step title="เตรียมส่ง" icon={icons.waitForDelivery} />
//         <Step title="ส่งแล้ว" icon={icons.waitForSent} />
//       </Steps>
//     </div>
//   );
// }

import BillSteps from './BillSteps';
export default function StepComponent ({ active, className}) {
  return (
    <BillSteps step={active} addClass={className} />
  )
}