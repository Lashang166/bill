import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
//import axios from "axios";
import isEmptyObject from "../lib/IsEmptyObject";
import BankLogo from "./BankLogo";
import NotifButton from "./NotifButton/NotifButton";
import {upload1, apiServer} from "../API";

//const apiServer = "https://bill.i-sabuy.xyz/Bill";

export default function BillActionPayment({
  BankAccounts,
  Payment,
  BillNo,
  setBillStatus,
  SetPaymentData,
  setBillCOD,
  COD,
  isAdmin
}) {
  // All states
  const [isUploading, setIsUploading] = useState(false);
  const [isImageChange, setImageChange] = useState(false);
  const [imgDataUrl, setImgDataUrl] = useState(
    Payment && Payment.image ? `${apiServer}/ci-api/${Payment.image}` : ""
  );
  const [file2upload, setFile2Upload] = useState([]);
  const [selectedBankById, setSelectedBankById] = useState();
  const [bankSelected, setBankSelected] = useState(
    Payment && Payment.BankAccount ? Payment.BankAccount : {}
  );

  // Upload function
  const onDrop = useCallback(acceptedFiles => {
    // console.log(acceptedFiles);
    setFile2Upload(acceptedFiles);
    setImageChange(true);

    const reader = new FileReader();
    reader.onload = () => {
      setImgDataUrl(reader.result);
    };

    acceptedFiles.forEach(file => {
      reader.readAsDataURL(file);
    });
  }, []);

  const payOnDeliverySelectd = (bank) => {

    setBankSelected(bank);
  }

  const doUpload = async() => {


    //setBillCOD();

    let codValue = 0;
    if(bankSelected.type && bankSelected.type === "COD"){
      codValue = COD
    }
    
    //return {message : "เพิ่มที่อยู่สำเร็จ", isSuccess : true};

    if (isImageChange) {
      setIsUploading(true);
      // console.log(file2upload);
      file2upload.forEach(file => {
        let formData = new FormData();
        formData.append("img", file);
        formData.append("billNo", BillNo);

        //axios.post(`${apiServer}/ci-api/fileman/upload`, formData)
        upload1(formData)
          .then(result => {
            setIsUploading(false);
            SetPaymentData({
              ...Payment,
              image: result.data.fileurl,
              BankAccount: bankSelected
            }, codValue);
            setImageChange(false);
            return true;
            // console.log(typeof result.data, result.data);
          })
          .catch(e => {
            console.log("Upload error", e);
            setImgDataUrl("");
            setIsUploading(false);
            setImageChange(false);
            return false;
          });
      });
    } else {
      SetPaymentData({
        ...Payment,
        BankAccount: bankSelected
      }, codValue);
      return true;
      // setBillStatus("2");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false
  });

  // Render
  // console.log("imgdataurl", imgDataUrl);
  return (
    <div className="card" id="step1">
      <div className="card-content">
        <div className="content">
          {/* Select payment type */}
          <div>
            <h2 className="subtitle">เลือกบัญชีชำระเงิน</h2>
            {BankAccounts.map((bank, idx) => {
              // console.log(bank, bankSelected);
              let isSelectedStyle = (idx === selectedBankById) ? {"border-color": "hsl(217, 71%, 53%)"} : null;

              const thisStyle = isEmptyObject(bankSelected)
                ? { cursor: "pointer"}
                : bankSelected.id === bank.id
                ? { cursor: "pointer", ...isSelectedStyle}
                //? { cursor: "pointer", isSelectedStyle}
                : { display: "none" };  
              if (bank.type === "COD") {
                return (
                  <div
                    className="has-round-border my-margin-bottom"
                    style={thisStyle}
                    //style={`${idx === selectedBankById ? {"border-color": "hsl(217, 71%, 53%)"} : null}`}
                    key={idx}
                    onClick={() => {
                      console.log(idx);
                      setSelectedBankById(idx);
                      setBankSelected(bank);
                    }}
                  >
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
                  </div>
                );
              }
              return (
                <div
                  className="has-round-border my-margin-bottom"
                  style={thisStyle}
                  key={idx}
                  // style={{ cursor: "pointer" }}
                  onClick={() => {
                    //console.log(bank);
                    setSelectedBankById(idx);
                    setBankSelected(bank);
                    // if (bankSelected.id === bank.id) {
                    //   setBankSelected({});
                    // } else {
                    //   setBankSelected(bank);
                    // }
                  }}
                >
                  <article className="media my-padding-top my-margin-top">
                    <figure className="media-left my-padding-top">
                      <p className="image is-48x48">
                        <BankLogo
                          bankabbr={bank.abbr ? bank.abbr : "kbank"}
                          style={{ backgroundColor: "red" }}
                        />
                      </p>
                    </figure>
                    <div className="media-content">
                      <div className="content my-padding-top">
                        <div>ชื่อบัญชี: {bank.BankOwner}</div>
                        <div>เลขบัญชี: {bank.BankAccNo}</div>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
          {/* Upload image */}
          {!isEmptyObject(bankSelected) &&
          bankSelected.type !== "COD" &&
          !isUploading ? (
            <div
              {...getRootProps()}
              className={`has-text-centered has-round-border`}
              style={{
                height: "240px",
                border: "1px solid black",
                position: "relative"
              }}
            >
              {isDragActive ? (
                <p className="has-text-centered">
                  วางภาพหลักฐานการโอนเงินที่นี่
                </p>
              ) : imgDataUrl === "" ? (
                <table
                  style={{
                    height: "100%",
                    width: "100%",
                    margin: 0,
                    padding: 0,
                    border: 0
                  }}
                >
                  <tr>
                    <td
                      style={{ verticalAlign: "middle", textAlign: "center" }}
                    >
                      <img
                        src="./assets/upload-background.png"
                        style={{
                          opacity: ".2",
                          width: "128px",
                          heght: "128px"
                        }}
                        alt=""
                      />
                      <br />
                      <font style={{ size: "1.5em" }} className="has-text-grey">
                        OR
                      </font>
                      <br />
                      <font
                        style={{ size: "1.5em" }}
                        className="has-text-grey-darker"
                      >
                        แนบสลิปการโอนหรือคลิ๊กที่นี่
                      </font>
                    </td>
                  </tr>
                </table>
              ) : (
                <figure
                  className="has-text-centered"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                  }}
                >
                  <p className="image">
                    <img
                      src={imgDataUrl}
                      style={{
                        maxWidth: "240px",
                        maxHeight: "240px",
                        width: "auto",
                        height: "auto"
                      }}
                      alt={BillNo}
                    />
                  </p>
                </figure>
              )}
              <input {...getInputProps()} />
            </div>
          ) : null}
        </div>
        {isUploading ? (
          <div>
            <a
              href="#top"
              className="button is-success is-loading is-fullwidth"
              disabled
            >
              Uploading please wait
            </a>
          </div>
        ) : null}
      </div>
      {isUploading ? null : (
        <footer className={`card-footer`}>
          <a
            href="#top"
            className={`card-footer-item ${
              isEmptyObject(bankSelected) ? "is-invisible" : ""
            }`}
            onClick={e => {
              e.preventDefault();
              setBankSelected({});
            }}
          >
            ย้อนกลับ
          </a>
          {(!isEmptyObject(bankSelected) &&
          (bankSelected.type === "COD" || isImageChange)) 
          || ( isAdmin && !isEmptyObject(bankSelected))? (
            <NotifButton
              name=""
              isSuccess={async (e) => {
                //let isSuccess = await openBill(e);
                //console.log(isSuccess);
                doUpload();
                return {message : "ส่งข้อมูลการชำระเงินสำเร็จ", isSuccess : true}
                //return true;
              }}
              billStatus={1.0}
              buttonStyle={`card-footer-item element ${
                isUploading ? "is-loading" : ""
              }`}
              message="ส่งข้อมูลการชำระเงินสำเร็จ"
              //errorMessage=""
            >
            <a
              //href=""
              className=""
              /*onClick={e => {
                e.preventDefault();
                doUpload();
              }}*/
            >
              <i class="far fa-save"></i>{' '}
              บันทึก
            </a>
            </NotifButton>
          ) : null}
        </footer>
      )}
    </div>
  );
}
