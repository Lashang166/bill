import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/th";
import { Redirect } from 'react-router-dom';
import BillItems from "../components/BillItemsEdit";
import BillVendor from "../components/BillVendor";
import BillHeader from "../components/BillHeader";
import BillShippingAddress from "../components/BillShippingAddress";
import PostalCharge from "../components/PostalChargeEdit";
import BillTotal from "../components/BillTotalEdit";
// import BillSteps from "../components/BillSteps";
import BillActions from "../components/BillActions";
import BillPaymentDetail from "../components/BillPaymentDetail";
import StopsOnTopMobile from "../components/StepsOnTopMobile";
import StepComponent from "../components/StepComponent";
import BillStatus from "../components/BillStatus";
import axios from "axios";
import { getLocalState } from '../helper/localStorage';
import QuickView from './QuickView';
import {updateStatus1} from '../API';
 

import pageConfig from "../config.json";
import NotifButton from "./NotifButton/NotifButton";

//const apiServer = "https://bill.i-sabuy.xyz/Bill";

export default function BillDisplay({setBillData, billData, updateBillData, onClickSaveFavorite, COD, setCOD, replaceEmoji }) {
  /*
  if (actionType) {
    console.log("action = " + actionType);
  } else {
    console.log("no ActionType");
  }*/

  // const [TotalValue, SetTotalValue] = useState(0);
  //console.log("BillDisplay:billData", billData);
  // const billData = billData ? billData : null;
  const BillDateStamp = new Date(billData.BillDate);
  const BillDueStamp = new Date(billData.BillDue);
  moment.locale("th");
  const billDataData = billData.Data;

  const [isRedirectBillEdit, setIsRedirectBillEdit] = useState(false);
  const [redirectPage, setRedirectPage] = useState();

  // console.log("BillDisplay:Data", billDataData);
  const [scrollTopPosition, setScrollTopPosition] = useState(
    window.pageYOffset
  );
  const user = getLocalState('user');
  const setScroll = e => {
    const scrollPos = window.scrollY;
    // console.log("setScroll", scrollPos);
    setScrollTopPosition(scrollPos);
  };
  useEffect(() => {
    window.addEventListener("scroll", setScroll);
    return () => {
      window.removeEventListener("scroll", setScroll);
    };
  });

  const updateCODAndDiscount = (input, cod) => {
    setCOD(cod);
    updateBillData({
      ...billData,
      DiscountValue: input,
      Data: { ...billData.Data, COD: cod }
    })
  }

  const updateCODAndItem = (input, cod) => {
    setCOD(cod);
    updateBillData({
      ...billData,
      Data: { ...billData.Data, COD: cod, items: input },
    })
  }

  const updateCODAndQty = (input, cod) => {
    setCOD(cod);
    updateBillData({
      ...billData,
      DiscountValue: input,
      Data: { ...billData.Data, COD: cod }
    })
  }

  const [SelectedShipType, setSelectedShipType] = useState(
    billDataData && billDataData.SelectedShipType && billDataData.ShipTypes
    ? billDataData.SelectedShipType
    : null
    );
    
      
      const [SelectedShipCOD, setSelectedShipCOD] = useState(
        billDataData && billDataData.SelectedShipCOD
          ? billDataData.SelectedShipCOD
          : false
      );
      const [SelectShipId, setSelectShipId] = useState(
        billDataData && billDataData.selectShipId && billDataData.ShipTypes
        ? billDataData.selectShipId
        : null
        );
        
    if(SelectShipId === null){
      let Ship = billDataData.ShipTypes[0]
      
      let newBank = billDataData.BankAccounts;
      setSelectShipId(Ship.id);
      setSelectedShipType(Ship.expid);
      let hadCOD = false;

      if (Ship.cod_status == 1){
        newBank.push({ type: "COD" });
        hadCOD = true;
      }

      updateBillData({
        ...billData,
        Data: { ...billData.Data, SelectedShipType: Ship.expid, selectShipId : Ship.id , BankAccounts: newBank, SelectedShipCOD: hadCOD, COD : 0 }
      })
    }

    const [SelectedShipName, setSelectedShipName] = useState(
      SelectShipId ? billDataData.ShipTypes.filter(ship => ship.id === SelectShipId)[0].description : null
    );
      
  const [isCODChecked, setIsCODChecked] = useState(SelectedShipCOD);
      /*const [COD, setCOD] = useState(
        billDataData && billDataData.COD
          ? billDataData.COD
          : 0
      );*/
  
  let Amount;

  let total = billDataData.items.reduce((totalValue, item) => {

    Amount = parseFloat(item.Amount);

    if(isNaN(Amount)){
      Amount = 0;
    }
    console.log("totolvalue",totalValue);

    return  + Amount * parseFloat(item.PricePerUnit);
  }, 0);
  let postalCharge = billDataData.ShipTypes.reduce(
    (Value, ShipType) =>
      Value +
      (ShipType.id === SelectShipId ? parseFloat(ShipType.rate) : 0),
    0
  );
  const onClickConfirm = () => {

    const params = {
        id : parseInt(billData.id),
        status : "NEW"
    }

    //axios.post(`${apiServer}/ci-api/Bills/updateStatus`, params)
    updateStatus1(params)
      .then(result => {
        
        if (result.data.result === "OK") {
        }
      })
      .catch(e => {
      });
  
  }

  //console.log(SelectedShipType);

  const goToHomePage = () => {

    setRedirectPage("/");
    setIsRedirectBillEdit(true);
  }

  const onClickBillButton = async (e, status, page, statusId) => {
    
    //e.preventDefault();

    //return false;
    //errorMessage={SelectShipId ? (billDataData.items.length === 0 ? "กรุณาเพิ่มสินค้า" : "") : "กรุณาเลือกคนส่ง"}
    //message="เปิดบิลสำเร็จ"

    //alert(statusId);
    window.scrollTo(0, 0);

    if(statusId !== 0.2){
      if(!SelectedShipType){
        return {message : "กรุณาเลือกขนส่ง", isSuccess : false}
      }
      else if(billDataData.items.length === 0){
        return {message : "กรุณาเพิ่มสินค้า", isSuccess : false}
      }
    }
    /*if((!SelectedShipType || billDataData.items.length === 0) && statusId !== 0.2){
      //alert("Please select Ship Type");
      return false;
    }*/

    const params = {
      id : parseInt(billData.id),
      status : status
    }

    let result = {};

    //result = axios.post(`${apiServer}/ci-api/Bills/updateStatus`, params)
    result = updateStatus1(params)
    .then(result => {
      
      if (result.data.result === "OK") {
        setBillData({...billData, BillStatus : statusId});
        return {message : "เปิดบิลสำเร็จ", isSuccess : true}
      }
    });
    return {};
  }
  
  
  if (isRedirectBillEdit) {
    return <Redirect to={`${redirectPage}`} />
  }

  return (
    <div>
      <section className="hero">
        <div 
          className="hero-head border-bottom my-padding"
        >
          <div className="container">
              <nav className="level is-mobile">
              <div className="level-left"
                onClick={user && user.vid === billData.VID ?  ()=>{goToHomePage()} : null}
              >
                <div className="hero-content my-padding">
                  <div className="container">
                    <h1 className="title">
                      {billData.VName}
                    </h1>
                    <h2 className="subtitle">
                      {pageConfig.billSubtitle}
                    </h2>
                  </div>
                </div>
              </div>
                {user && user.vid === billData.VID ?
                <div className="level-right my-padding">
                  {/*<p className="level-item"><i className="fas fa-list-ul fa-lg"></i></p>*/}
                  <QuickView type={2}/>
                </div>
                : null
                }
              </nav>
          </div>
        </div>
        {/* <div
        className="is-hidden-tablet"
        style={{ position: "absolute", top: `${window.pageYOffset}px` }}
      >
        {window.pageYOffset}
      </div> */}
        <div className="hero-body has-background-white-bis my-fix-hero-padding-top">
          <StopsOnTopMobile
            step={billData.BillStatus}
            position={scrollTopPosition}
            link={billData.TrackingNo}
          />
          <div className="container">
            <div className="columns">
              <div className="column is-half">
                {/* <BillSteps
                step={billData.BillStatus}
                addclassName="is-hidden-tablet my-padding"
              /> */}

                
                <BillStatus
                  status={billData.BillStatus}
                  statustext={billData.BillErrorStatus}
                  link={billData.TrackingNo}
                />
                <BillVendor
                  VendorLogo={billData.VLogo}
                  VendorName={billData.AgentName}
                  VendorAddress={billData.VAddr}
                  AgentMobile={billData.AgentMobile}
                  // BillStatusText={billData.BillErrorText}
                />

                {/* Mobile */
                /*}
                <div className="column">
                  <div className="field has-addons is-hidden-mobile">
                    <a className="button is-warning has-text-white is-small-mobile is-fullwidth-mobile">
                      {" "}
                      <i className="fas fa-pencil-ruler" /> &nbsp; ปรับเป็นร่าง
                    </a>

                    <p className="control is-expanded">
                      <input
                        className="input"
                        type="text"
                        value={`http://i-sabuy.com/bill/${billData.BillNo}`}
                      />
                    </p>
                    <p className="control">
                      <a className="button is-link">ส่งบิลออนไลน์</a>
                    </p>
                  </div>
                </div>

                {/* PC */
                /*}
                <div className="is-hidden-fullhd">
                  <div className="is-fullwidth">
                    <a className="button is-warning has-text-white">
                      {" "}
                      <i className="fas fa-pencil-ruler" /> &nbsp; ปรับเป็นร่าง
                    </a>
                  </div>
                  <div className="field has-addons">
                    <p className="control is-expanded">
                      <input
                        className="input"
                        type="text"
                        value={`http://i-sabuy.com/bill/${billData.BillNo}`}
                      />
                    </p>
                    <p className="control">
                      <a className="button is-link">ส่งบิลออนไลน์</a>
                    </p>
                  </div>
             </div>{*/}

                {/* <div className="my-padding has-round-border my-margin-top has-background-white">
                  <div className="columns is-desktop">
                    <div className="column is-one-fifth-desktop">
                      <a className="button is-warning has-text-white is-fullwidth">
                        {" "}
                        <i className="fas fa-pencil-ruler" /> &nbsp;
                        ปรับเป็นร่าง
                      </a>
                    </div>
                    <div className="column field is-grouped">
                      <p className="control is-expanded">
                        <input
                          className="input"
                          type="text"
                          placeholder="Find a repository"
                        />
                      </p>
                      <p className="control">
                        <a className="button is-info">Search</a>
                      </p>
                    </div>
                  </div>
                </div> */}

                <div className="my-padding has-round-border my-margin-top has-background-white">
                  <BillHeader
                    BillNumber={billData.BillNo}
                    BillDate={BillDateStamp}
                    BillDueDate={BillDueStamp}
                    BillStatus={billData.BillStatus}
                    ShippingAddress={billDataData.ShippingAddress}
                    BillNote={billDataData.note}
                    BillId={billData.id}
                    setBillNote={note => {
                      updateBillData({
                        ...billData,
                        Data: { ...billData.Data, note: note }
                      })
                      }
                    }
                    onClickSaveFavorite={onClickSaveFavorite}
                    updateCustomerName={name =>{

                      //alert(name);
                      if(name === ""){
                        return false;
                      }

                      updateBillData({
                        ...billData,
                        Data: { ...billData.Data, ShippingAddress: {...billData.Data.ShippingAddress, Name : name} }
                      })
                      return true;
                      }
                    }
                    replaceEmoji={replaceEmoji}
                  />
                  <hr />
                  <BillItems
                    items={billData ? billDataData.items : []}
                    setBillItems={item =>
                      updateBillData({
                        ...billData,
                        Data: { ...billData.Data, items: item }
                      })
                    }
                    COD={COD}
                    setCOD={setCOD}
                    updateCODAndItem={updateCODAndItem}
                    UpdateCOD = {cod =>{
                      setCOD(cod);
                      updateBillData({
                        ...billData,
                        Data: { ...billData.Data, COD: cod }
                      })
                    }}
                  />
                  <hr />
                  {billData.BillStatus <= 1 ? (
                    <div>
                      <PostalCharge
                        ShipTypes={billDataData.ShipTypes}
                        SelectedShipType={SelectedShipType}
                        SelectedShipCOD={SelectedShipCOD}
                        selectShipId={SelectShipId}
                        COD={COD}
                        setIsCODChecked={setIsCODChecked}
                        BillStatus={billData.BillStatus}
                        BankAccounts={billDataData.BankAccounts}
                        UpdateState={(Ship, Banks, cod, codValue) => {
                          //console.log(Ship);
                          billDataData.SelectedShipType = Ship.expid;
                          setSelectedShipType(Ship.expid);
                          setSelectShipId(Ship.id);
                          setSelectedShipName(Ship.description);
                          setSelectedShipCOD(cod);
                          setCOD(codValue);
                          updateBillData({
                            ...billData,
                            Data: { ...billData.Data, SelectedShipType: Ship.expid, selectShipId : Ship.id, BankAccounts: Banks, SelectedShipCOD: cod, COD : codValue }
                          })
                        }}

                        // Ship ใหม่
                        updateShipTypes={(input, cod) => {
                          
                          setCOD(cod);
                          //setSelectShipId(null);
                          //setSelectedShipType(null);
                          //delete billData.Data.selectShipId;
                          //delete billData.Data.SelectedShipType;
                          updateBillData({
                            ...billData,
                            Data: { ...billData.Data, ShipTypes: input, COD : cod }
                          })
                        }
                        }
                      />
                      <hr />
                    </div>
                  ) : null}
                  { console.log("bildata", Amount) }
                  <BillTotal
                    //edit
                    role={user.amrole}
                    commission={billData.AgentCommission}
                    percent={billData.AgentPercent}
                    Amount={Amount}
                    //edit
                    TotalValue={total}
                    PostalCharge={postalCharge}
                    PostalName={SelectedShipName}
                    Discount={billData.DiscountValue}
                    DiscountType={billData.DiscountType}
                    SelectedShipCOD={SelectedShipCOD}
                    COD={COD}
                    setCOD={setCOD}
                    isCODChecked={isCODChecked}
                    setIsCODChecked={setIsCODChecked}
                    UpdateCOD = {cod =>{
                      setCOD(cod);
                      updateBillData({
                        ...billData,
                        Data: { ...billData.Data, COD: cod }
                      })
                    }}

                    updateCODAndDiscount={updateCODAndDiscount}

                    setBillDiscount={input => {
                      updateBillData({
                        ...billData,
                        DiscountValue: input
                      })
                    }}
                    setDiscountType={input =>
                      updateBillData({
                        ...billData,
                        DiscountType: input
                      })
                    }
                  />
                </div>
                {/*}
                {billData.BillStatus !== "1.0" ? (
                  <button
                    className="button is-success is-outlined is-small-mobile is-fullwidth"
                    onClick={() =>
                      updateBillData({
                        ...billData,
                        BillStatus: "1.0"
                      })
                    }
                    style={{ marginTop: "10px" }}
                  >
                    <i className="fas fa-check"> </i> &nbsp; เปิดบิล
                  </button>
                ) : (
                  <button
                    className="button is-warning is-outlined is-small-mobile is-fullwidth"
                    onClick={() =>
                      updateBillData({
                        ...billData,
                        BillStatus: "0.0"
                      })
                    }
                    style={{ marginTop: "10px" }}
                  >
                    <i className="fas fa-check"> </i> &nbsp; ปรับเป็นร่าง
                  </button>
                )}
                  {*/}
              </div>
              <div className="column is-half">
                <StepComponent
                  active={parseInt(billData.BillStatus, 10)}
                  className="content is-hidden-mobile"
                />
                {/* <BillSteps
                step={billData.BillStatus}
                addclassName="is-hidden-mobile"
              /> */}
                {billDataData.Payment &&
                parseInt(billData.BillStatus, 10) > 1 ? (
                  <BillPaymentDetail
                    Payment={billDataData.Payment}
                    BillStatus={billData.BillStatus}
                    setBillStatus={status => {
                      let nextPayment = billDataData.Payment;
                      if (parseInt(status, 10) === 1) {
                        nextPayment = {};
                      }
                      updateBillData({
                        ...billData,
                        BillStatus: status,
                        Data: { ...billDataData, Payment: nextPayment }
                      });
                    }}
                  />
                ) : null}
                {billDataData.ShippingAddress &&
                parseInt(billData.BillStatus, 10) > 2 ? (
                  <BillShippingAddress
                    BillStatus={billData.BillStatus}
                    ShippingAddress={billDataData.ShippingAddress}
                    setBillStatus={status => {
                      updateBillData({
                        ...billData,
                        BillStatus: status
                      });
                    }}
                  />
                ) : null}
                {/* <BillSteps step={4} /> */}
                <BillActions
                  BillNo={billData.BillNo}
                  BankAccounts={billDataData.BankAccounts}
                  ShippingAddress={billDataData.ShippingAddress}
                  Payment={billDataData.Payment}
                  Step={billData.BillStatus}
                  setBillStatus={status => {
                    updateBillData({
                      ...billData,
                      BillStatus: status
                    });
                  }}
                  setPayment={Payment => {
                    updateBillData({
                      ...billData,
                      Data: { ...billData.Data, Payment },
                      BillStatus: "2.0"
                    });
                  }}
                  setShippingAddress={ShippingAddress => {
                    updateBillData({
                      ...billData,
                      Data: { ...billData.Data, ShippingAddress },
                      BillStatus: "3.0"
                    });
                  }}
                />
                
              </div>
            </div>
              {parseFloat(billData.BillStatus) === 0.0 ? 
              <>
              <NotifButton
                buttonStyle="button is-primary is-small-mobile is-fullwidth"
                isSuccess={e => {
                  //alert(onClickBillButton(e, "NEW", `bill/${billData.BillNo}`, 1.0))
                  //console.log("billData----");
                  //console.log(billData);
                  return onClickBillButton(e, "NEW", `bill/${billData.BillNo}`, 1.0)
                }}
                billStatus={1.0}
                errorMessage={SelectShipId ? (billDataData.items.length === 0 ? "กรุณาเพิ่มสินค้า" : "") : "กรุณาเลือกคนส่ง"}
                message="เปิดบิลสำเร็จ"
                //message="Confirm Bill Succesfully"
              >
                <span class="icon is-small">
                  <i class="fas fa-check"></i>
                </span>
                <span>ยืนยันบิล</span>
              </NotifButton> 
              <button
                className="button is-danger is-small-mobile is-fullwidth my-margin-top"
                onClick={e => onClickBillButton(e, "CANCELLED", ``, 0.2)}
              >
                <span class="icon is-small">
                  <i class="fas fa-times"></i>
                </span>
                <span>ยกเลิกบิล</span>      
              </button>
              </>
              : null
              }
              
          </div>
        </div>
      </section>
    </div>
  );
}
