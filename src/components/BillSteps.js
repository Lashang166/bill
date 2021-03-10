import React from "react";

// const steps = [
//   "ชำระเงิน",
//   "ที่อยู่จัดส่ง",
//   "ดำเนินการส่งสินค้า",
//   "ส่งสินค้าเรียบร้อย"
// ];

// function RenderStep({ stepIndex, step }) {
//   console.log(stepIndex, step);
//   return (
//     <li
//       className={`steps-segment ${
//         stepIndex + 1 <= parseInt(step, 10) ? "is-active" : ""
//       }`}
//     >
//       <span className="steps-marker" />
//       <div className="steps-content">{steps[stepIndex]}</div>
//     </li>
//   );
// }

export default function BillSteps({ step, addClass, errortext }) {
  const stepInt = parseInt(step);
  // const stepFloat = parseFloat(step);
  // console.log("BillSteps", ![-1, 1, 2, 3, 4].includes(stepInt), stepInt);
  return (
    <ul
      className={`steps has-content-centered is-small is-horizontal ${addClass}`}
    >
      <li
        className={`steps-segment ${
          stepInt === 1 || stepInt === -1 ? "is-active" : ""
        }`}
        onClick={e => {
          const elm = document.querySelector("#step1");
          if (elm) {
            elm.scrollIntoView({
              behavior: "smooth",
              inline: "start",
              block: "start"
            });
          }
        }}
      >
        <span
          className={`steps-marker has-text-white  ${
            stepInt <= 1 ? "has-background-info" : ""
          }`}
        >
          {stepInt <= 1 ? "1" : <i className="fas fa-check" />}
        </span>
        <div className="steps-content">ชำระเงิน</div>
      </li>

      <li
        className={`steps-segment ${stepInt === 2 ? "is-active" : ""}`}
        onClick={e => {
          const elm = document.querySelector("#step2");
          if (elm) {
            elm.scrollIntoView({
              behavior: "smooth",
              inline: "start",
              block: "start"
            });
          }
        }}
      >
        <span
          className={`steps-marker has-text-white  ${
            stepInt === 2 ? "has-background-info" : ""
          }`}
        >
          {stepInt <= 2 ? "2" : <i className="fas fa-check" />}
        </span>
        <div className="steps-content">ที่อยู่จัดส่ง</div>
      </li>

      <li
        className={`steps-segment ${stepInt === 3 ? "is-active" : ""}`}
        onClick={e => {
          // const elm = document.querySelector("#step3");
          const elm = document.body;
          if (elm) {
            elm.scrollIntoView({
              behavior: "smooth",
              inline: "start",
              block: "start"
            });
          }
        }}
      >
        <span
          className={`steps-marker has-text-white  ${
            stepInt === 3 ? "has-background-info" : ""
          }`}
        >
          {stepInt <= 3 ? "3" : <i className="fas fa-check" />}
        </span>
        <div className="steps-content">เตรียมส่งสินค้า</div>
      </li>

      <li
        className={`steps-segment ${stepInt === 4 ? "is-active" : ""}`}
        onClick={e => {
          // const elm = document.querySelector("#step4");
          const elm = document.body;
          if (elm) {
            elm.scrollIntoView({
              behavior: "smooth",
              inline: "start",
              block: "start"
            });
          }
        }}
      >
        <span
          className={`steps-marker has-text-white ${
            stepInt === 4 ? "has-background-info" : ""
          }`}
        >
          {stepInt <= 4 ? "4" : <i className="fas fa-check" />}
        </span>
        <div className="steps-content">ส่งสินค้าแล้ว</div>
      </li>
    </ul>
  );
}
