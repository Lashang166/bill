import React from "react";
import pageConfig from "../config.json";

export default function BillStatus({ status, statustext, link }) {
  
  const index = pageConfig.billStatus.findIndex(billStatus => billStatus.id === parseFloat(status));
  const thisConfig = pageConfig.billStatus[index];
  //console.log("BillStatus", status, pageConfig.billStatus);
  if (!pageConfig.billStatus[index]) {
    return null;
  }

 return (
/*    <div className="my-padding-bottom my-margin-top has-background-white">
      <div className="my-padding has-round-border">
        <div>
          สถานะ:
          <span
            className="is-pulled-right"
            style={{ color: thisConfig.backgroundColor }}
          >
            {thisConfig.text}
          </span>
        </div>
        <div
          className="my-padding"
          style={{
            backgroundColor: thisConfig.backgroundColor,
            color: thisConfig.textColor
          }}
        >
          {`${thisConfig.description} ${
            [1.1, 2.1].includes(parseFloat(status)) ? statustext : ""
          }`}
          {parseFloat(status) > 4 ? (
            <>
              <a href={link}>สถานะพัสดุ</a>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>*/
      <article className={thisConfig.backgroundColor}>
        <div className="message-header">
          <p>สถานะ: {thisConfig.text}</p>
        </div>
        <div className="message-body" >
        {`${thisConfig.description} ${
            [1.1, 2.1].includes(parseFloat(status)) ? statustext : ""
          }`}
          {parseFloat(status) > 4 ? (
            <>
              <a href={link}>สถานะพัสดุ</a>
            </>
          ) : (
            ""
          )}
        </div>
      </article>
  );
}
