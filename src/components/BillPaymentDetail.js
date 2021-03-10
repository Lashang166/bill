import React from "react";
import BankLogo from "./BankLogo";
import {apiServer} from "../API";

//const apiServer = "https://bill.i-sabuy.xyz/Bill";

export default function BillPaymentDetail({
  BillStatus,
  Payment,
  setBillStatus,
  Datachannel
}) {
  //console.log("BillPaymentDetail", BillStatus);
  //console.log("BillPaymentDetail.Payment", Payment);
  return (
    <div className="my-space-bottom" id="step1">
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">ข้อมูลการชำระเงิน</p>
          {parseFloat(BillStatus) < 3.2 && Datachannel === "ONLINE" ? (
            <a
              href="#top"
              className="card-header-icon"
              aria-label="more options"
              onClick={e => {
                e.preventDefault();
                setBillStatus("1");
              }}
            >
              <span className="icon my-margin-right">
                <i className="far fa-edit" aria-hidden="true" />
              </span>
              แก้ไข
            </a>
          ) : null}
        </header>
        <div className="card-content">
          <div className="content">
            {Payment.BankAccount.type && Payment.BankAccount.type === "COD" ? (
              <article className="media my-padding-top my-margin-top">
                <figure className="media-left my-padding-top">
                  <p className="image is-48x48">
                    <img
                      src="./assets/cod-512.png"
                      alt="เก็บเงินปลายทาง"
                      style={{ filter: "opacity(.6)" }}
                    />
                  </p>
                </figure>
                <div className="media-content">
                  <div className="content my-padding-top">
                    การชำระเงินแบบเก็บเงินปลายทาง
                  </div>
                </div>
              </article>
            ) : (
              <article className="media my-padding-top my-margin-top">
                <figure className="media-left my-padding-top">
                  <p className="image is-48x48">
                    <BankLogo
                      bankabbr={
                        Payment &&
                        Payment.BankAccount &&
                        Payment.BankAccount.abbr
                          ? Payment.BankAccount.abbr
                          : "kbank"
                      }
                      style={{ backgroundColor: "red" }}
                    />
                  </p>
                </figure>
                <div className="media-content">
                  <div className="content my-padding-top">
                    <div>
                      ชื่อบัญชี:{" "}
                      {Payment &&
                      Payment.BankAccount &&
                      Payment.BankAccount.BankOwner
                        ? Payment.BankAccount.BankOwner
                        : ""}
                    </div>
                    <div>
                      เลขบัญชี:{" "}
                      {Payment &&
                      Payment.BankAccount &&
                      Payment.BankAccount.BankAccNo
                        ? Payment.BankAccount.BankAccNo
                        : ""}
                    </div>
                  </div>
                </div>
              </article>
            )}
          </div>
          {!Payment.BankAccount.type || Payment.BankAccount.type !== "COD" ? (
            <div className="content">
              <figure
                className="has-text-centered"
                // style={{
                //   position: "absolute",
                //   top: "50%",
                //   left: "50%",
                //   transform: "translate(-50%, -50%)"
                // }}
              >
                <div className="image">
                  <center>
                    <img
                      src={`${apiServer}/ci-api/${Payment.image}`}
                      style={{
                        maxWidth: "240px",
                        maxHeight: "240px",
                        width: "auto",
                        height: "auto"
                      }}
                      alt={`สำเนาโอนเงิน`}
                    />
                  </center>
                </div>
              </figure>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
