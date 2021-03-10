import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/th";
//import axios from "axios";
import store from "store";
import { useClipboard } from 'use-clipboard-copy';
import { Redirect } from 'react-router-dom';
import BillItems from "../components/BillItems";
import BillVendor from "../components/BillVendor";
import BillHeader from "../components/BillHeader";
import BillShippingAddress from "../components/BillShippingAddress";
//import PostalCharge from "../components/PostalCharge";
import PostalCharge from "../components/PostalChargeEdit";
import BillTotal from "../components/BillTotal";
// import BillSteps from "../components/BillSteps";
import BillActions from "../components/BillActions";
import BillPaymentDetail from "../components/BillPaymentDetail";
import StopsOnTopMobile from "../components/StepsOnTopMobile";
import StepComponent from "../components/StepComponent";
import BillStatus from "../components/BillStatus";
import QuickView from "./QuickView";
import {getbill1, createbill2, cancelbill2, updateStatus1} from "../API";

import { getLocalState } from '../helper/localStorage';
import pageConfig from "../config.json";
import NotifButton from "../components/NotifButton/NotifButton"
/*
const apiServer = "https://bill.i-sabuy.xyz/Bill";
const apiServer2 = "https://i-sabuy.com/warehouse/api";

axios.defaults.headers.common["Content-Type"] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
//axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
//axios.defaults.headers.post['Access-Control-Allow-credemtials'] = 'false';

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
//axios.defaults.headers["Access-Control-Allow-Headers"] = "X-Requested-With";

//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// Add a request interceptor
axios.interceptors.request.use(
  function(config) {
    const token = store.get("user");
    config.headers = { "x-access-token": "" }
    if (token && token.amtk != null) {
      config.headers = { "x-access-token": token.amtk };
    }

    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

*/

export default function BillDisplay({ billData, updateBillData, actionType , COD, setCOD, setBillData, lineNotif, replaceEmoji }) {






  if (actionType) {
    //console.log("action = " + actionType);
  } else {
    //console.log("no ActionType");
  }
  

  // const [TotalValue, SetTotalValue] = useState(0);
  //console.log("BillDisplay:billData", billData);
  // const billData = billData ? billData : null;
  const BillDateStamp = new Date(billData.BillDate);
  const BillDueStamp = new Date(billData.BillDue);
  moment.locale("th");
  const billDataData = billData.Data;


  // console.log("BillDisplay:Data", billDataData);
  const [isRedirectBillEdit, setIsRedirectBillEdit] = useState(false);
  const [redirectPage, setRedirectPage] = useState();

  const [scrollTopPosition, setScrollTopPosition] = useState(
    window.pageYOffset
  );

  const [SelectedShipCOD, setSelectedShipCOD] = useState(
    billDataData && billDataData.SelectedShipCOD
      ? billDataData.SelectedShipCOD
      : false
  );
  const setScroll = e => {
    const scrollPos = window.scrollY;
    // console.log("setScroll", scrollPos);
    setScrollTopPosition(scrollPos);
  };

  const getBillDetail = async billId => {

    let result = {};

    //result = await axios.get(`${apiServer}/ci-api/bills/getBill/${billId}`)
    result = await getbill1(billId)
      .then( async result => {
        let Data = result.data[0];
        let DataBill = JSON.parse(Data.Data);
        let Items = [];

        //console.log(result);
        //console.log(DataBill);
        DataBill.items.forEach(item => {
          Items.push({
            sku: item.SKU,
            amount: item.Amount
          });
        });

        let params = {
          BillNo: Data.BillNo,
          Name: DataBill.ShippingAddress.Name,
          Mobile: DataBill.ShippingAddress.Mobile,
          Address: DataBill.ShippingAddress.Address,
          Province: DataBill.ShippingAddress.Province,
          District: DataBill.ShippingAddress.District,
          SubDistrict: DataBill.ShippingAddress.SubDistrict,
          PostalCode: DataBill.ShippingAddress.Postcode,
          Shiptype: DataBill.SelectedShipType,
          COD: DataBill.COD+"",
          Sms: "0",
          Warp: "0",
          bill_source: Data.Datachannel,
          shopeeid: DataBill.shop_id,
          note: DataBill.note ? DataBill.note : "",
          Items: Items
        };

        //console.log(params);
        //return await axios.post(`${apiServer2}/bill/createbill2`, params).then(async result2 => {
        return await createbill2(params).then(async result2 => {
          if (result2.data.message == "success") {
            updateBillData({
              ...billData,
              BillStatus : 5.0,
              Data: { ...billData.Data, 
                      SORefer : result2.data.msg[0]
                    }
              
            })
            
            return {message : "ไอ-สบาย ได้รับข้อมูลเรียบร้อย", isSuccess : true, type : "success"  }
          } else {
            //alert(result2.data.message);
            return {message : result2.data.message, isSuccess : false}
          }
        }).catch(e => {
          //console.log("error", e.toString());
          return {message : "Server problem please try again", isSuccess : false, type : "error"}
        });
      })
      .catch(e => {
        //console.log("error", e.toString());
        return {message : "Server problem please try again", isSuccess : false, type : "error"}
      });
      //console.log(result);
      return result;
  };

  useEffect(() => {
    window.addEventListener("scroll", setScroll);
    return () => {
      window.removeEventListener("scroll", setScroll);
    };
  });

  const [SelectedShipType, setSelectedShipType] = useState(
    billDataData && billDataData.SelectedShipType && billDataData.ShipTypes
      ? billDataData.SelectedShipType
      : null
  );
  const [SelectShipId, setSelectShipId] = useState(
    billDataData && billDataData.selectShipId && billDataData.ShipTypes
    ? billDataData.selectShipId
    : null
    );


    const [SelectedShipName, setSelectedShipName] = useState(
      SelectShipId ? billDataData.ShipTypes.filter(ship => ship.id === SelectShipId)[0].description : null
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

  const user = getLocalState('user');



  let total = billDataData.items.reduce((totalValue, item) => {
    // console.log(item.Amount, item.PricePerUnit);
    return totalValue + parseFloat(item.Amount) * parseFloat(item.PricePerUnit);
  }, 0);
  let postalCharge = billDataData.ShipTypes.reduce(
    (Value, ShipType) =>
      Value +
      (ShipType.id === SelectShipId ? parseFloat(ShipType.rate) : 0),
    0
  );
  // console.log(total, postalCharge);
  // SetTotalValue(total + postalCharge);

  const goToHomePage = () => {

    setRedirectPage("/");
    setIsRedirectBillEdit(true);
  }
  const onClickCancel = async (e, page) => {
    //e.preventDefault();
    

    const params = {
      BillNo : billData.BillNo,
      Status : "CANCEL"
    }

    let result = {message : "Error", isSuccess : false};

    //result = await axios.post(`${apiServer2}/bill/cancelbill`, params)
    result = await cancelbill2(params)
    .then(async result => {
      console.log(result);
      
      if (result.data.status === "success") {
        let tempBillData = billData;
        delete tempBillData.Data.SORefer;
        updateBillData({...tempBillData, BillStatus : 0.2});
        
        return {message : result.data.message, isSuccess : true, type : "error"};
        
      }else{
        return {message : result.data.message, isSuccess : false};
      }
      

    });
    console.log(result);
    return result;
  }

  const clipboard = useClipboard({ copiedTimeout: 750 });

  const onClickBillButton = (e, status, page, statusId) => {
    
    e.preventDefault();
    window.scrollTo(0, 0);

    const params = {
      id : parseInt(billData.id),
      status : status
    }

    //axios.post(`${apiServer}/ci-api/Bills/updateStatus`, params)
    updateStatus1(params)
    .then(result => {
      
      if (result.data.result === "OK") {
        setBillData({...billData, BillStatus : statusId});
      }
    });
  }


  if ((billData.BillStatus === "0.0") | (billData.BillStatus === 0.0)) {
    return (
      <div>
        <section className="hero">
          <div className="hero-head border-bottom">
            <div className="container">
              <nav className="level is-mobile">
                <div className="level-left">
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
        </section>
        <section class="hero">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">ยังไม่พร้อมยังงาน...</h1>
              <h2 className="subtitle" />
            </div>
          </div>
        </section>
      </div>
    );
  }
  if (isRedirectBillEdit) {
    return <Redirect to={`${redirectPage}`} />
  }

  if (billData.BillStatus != "0.0") {
    return (
      <div>
        <section className="hero">
          <div className="hero-head border-bottom"
            className="hero-head border-bottom my-padding" 
          >
            <div className="container">
              <nav className="level is-mobile">
                <div className="level-left">
              <div className="hero-content my-padding" onClick={user && user.vid === billData.VID ?  ()=>{goToHomePage()} : null}>
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
                addClass="is-hidden-tablet my-padding"
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
                  <div className="my-padding has-round-border my-margin-top has-background-white">
                    <BillHeader
                      replaceEmoji={replaceEmoji}
                      BillNumber={billData.BillNo}
                      BillDate={BillDateStamp}
                      BillDueDate={BillDueStamp}
                      BillStatus={billData.BillStatus}
                      ShippingAddress={billDataData.ShippingAddress}
                      BillNote={billDataData.note}
                      SORefer={billDataData.SORefer}
                      setBillNote={aaa =>
                        updateBillData({
                          ...billData,
                          Data: { ...billData.Data, note: aaa }
                        })
                      }
                    />
                    <hr />
                    <BillItems
                      items={billData ? billDataData.items : []}
                      setBillItem={itemz =>
                        updateBillData({
                          ...billData,
                          Data: { ...billData.Data, items: itemz }
                        })
                      }
                    />
                    <hr />
                        {parseFloat(billData.BillStatus) > 1.0
                        ? null :
                      <div>
                        {/*<PostalCharge
                          ShipTypes={billDataData.ShipTypes}
                          SelectedShipType={SelectedShipType}
                          UpdateState={ShipType => {
                            billDataData.SelectedShipType = ShipType;
                            setSelectedShipType(ShipType);
                            setSelectedShipName(
                              billDataData.ShipTypes.filter(
                                ship => ship.id === ShipType
                              )[0].description
                            );
                          }}
                        />*/}
                        <PostalCharge
                        ShipTypes={billDataData.ShipTypes}
                        billStatus={billDataData.BillStatus}
                        SelectedShipType={SelectedShipType}
                        SelectedShipCOD={SelectedShipCOD}
                        selectShipId={SelectShipId}
                        COD={COD}
                        setCOD={setCOD}
                        //setIsCODChecked={setIsCODChecked}
                        BankAccounts={billDataData.BankAccounts}
                        UpdateState={(Ship, Banks, cod, codValue) => {
                          billDataData.SelectedShipType = Ship.expid;
                          setSelectedShipType(Ship.expid);
                          setSelectShipId(Ship.id);
                          setSelectedShipName(Ship.description);
                          setSelectedShipCOD(cod);
                          //setCOD(codValue);
                          updateBillData({
                            ...billData,
                            Data: { ...billData.Data, SelectedShipType: Ship.expid, selectShipId : Ship.id , BankAccounts: Banks, SelectedShipCOD: cod, COD : codValue }
                          })
                        }}

                        // Ship ใหม่
                        updateShipTypes={(input, cod) => {
                          
                          setCOD(cod);
                          updateBillData({
                            ...billData,
                            Data: { ...billData.Data, ShipTypes: input, COD : cod }
                          })
                        } }
                        />
                        <hr />
                      </div>
                      }
                    <BillTotal
                      TotalValue={total}
                      PostalCharge={postalCharge}
                      PostalName={SelectedShipName}
                      Discount={billData.DiscountValue}
                      DiscountType={billData.DiscountType}
                      COD={COD}
                      setCOD={setCOD}
                    />
                  </div>
                </div>
                <div className="column is-half">
                  <StepComponent
                    active={parseInt(billData.BillStatus, 10)}
                    className="content is-hidden-mobile"
                  />
                  {/* <BillSteps
                step={billData.BillStatus}
                addClass="is-hidden-mobile"
              /> */}
                  {billDataData.Payment &&
                  parseInt(billData.BillStatus, 10) > 1 ? (
                    <BillPaymentDetail
                      Datachannel={billData.Datachannel}
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
                          Data: { ...billDataData, Payment: nextPayment, COD : 0 }
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
                    Datachannel={billData.Datachannel}
                    BankAccounts={billDataData.BankAccounts}
                    ShippingAddress={billDataData.ShippingAddress}
                    Payment={billDataData.Payment}
                    SelectedShipType={billDataData.SelectedShipType}
                    Step={billData.BillStatus}
                    lineNotif={lineNotif}
                    COD={COD}
                    totalAmount={(total + postalCharge) - billData.DiscountValue}
                    isAdmin={user && user.vid === billData.VID }
                    setBillCOD={() => {
                      updateBillData({
                        ...billData,
                        Data: { ...billData.Data, COD: COD }
                      })
                    }}
                    
                    setBillStatus={status => {
                      updateBillData({
                        ...billData,
                        BillStatus: status
                      });
                    }}
                    setPayment={(Payment, cod) => {
                      updateBillData({
                        ...billData,
                        Data: { ...billData.Data, Payment, COD: cod},
                        BillStatus: "2.0"
                      });
                    }}
                    replaceEmoji={replaceEmoji}
                    setShippingAddress={(ShippingAddress, status) => {
                    
                      /*let totalAmount = billData.Data.items.reduce((result, item)=>{
                        return { total : (parseFloat(result.total) * parseFloat(result.Amount))
                                         + (parseFloat(item.total) * parseFloat(item.Amount)),
                                 Amount : item.Amount,
                               }
                      }
                      ).total;*/

                      let totalAmount=(total + postalCharge) - billData.DiscountValue


                      let nextPayment = billDataData.Payment;
                      if (parseInt(status, 10) === 1) {
                          nextPayment = {};
                        }
                      updateBillData({
                        ...billData,
                        Data: { ...billData.Data, ShippingAddress, GrandTotal : totalAmount, Payment: nextPayment  },
                        BillStatus: status
                      });
                    }}
                  />
                  
                </div>
              </div>
              {parseFloat(billData.BillStatus) === 3.0
               && user && user.vid === billData.VID 
               && user.amrole !== 'Staff'
               ? 
               <NotifButton
               name=""
               isSuccess={ (e)  => {
                  window.scrollTo(0, 0);
                  return getBillDetail(billData.BillNo);
               }}
               billStatus={1.0}
               buttonStyle="button is-success is-small-mobile is-fullwidth"
               message="เปิดบิลสำเร็จ"
               errorMessage="Product - Not found!"
             >
              <span class="icon is-small">
                  <i class="fas fa-shipping-fast"></i>
              </span>
              <span>เปิดออเดอร์ แพ็ค-ส่ง by ไอ-สบาย</span>
             </NotifButton>
              /*<button
                className="button is-primary is-small-mobile is-fullwidth"
                onClick={e => getBillDetail(billData.BillNo)}
              >
                <span class="icon is-small">
                  <i class="fas fa-edit"></i>
                </span>
                <span>เช็คยอดสำเร็จ เปิดออเดอร์</span>      
              </button> */: null
              }
              {(parseFloat(billData.BillStatus) === 4.0 ||
                parseFloat(billData.BillStatus) === 5.0)
               && user && user.vid === billData.VID 
               && user.amrole !== 'Staff'
               ? 
               <NotifButton
              name=""
              isSuccess={(e) => {
                window.scrollTo(0, 0);
                return onClickCancel();
              }}
              billStatus={1.0}
              buttonStyle="button is-danger is-small-mobile is-fullwidth"
              message={"SS"}
              errorMessage={"AA"}
              //errorMessage=""
            >
               {/**<button
               className="button is-danger is-small-mobile is-fullwidth"
               onClick={e => onClickCancel(e, ``)}
              >*/}
               <span class="icon is-small">
                 <i class="fas fa-times"></i>
               </span>
               <span>ยกเลิกออเดอร์ แพ็ค-ส่ง by ไอ-สบาย</span>
              
            </NotifButton>
              : null
              }
              {(parseFloat(billData.BillStatus) === 1.0 ||
                parseFloat(billData.BillStatus) === 2.0)
                && user && user.vid === billData.VID
                ?
                <div>
                  <button 
                    className="button is-outlined is-small-mobile is-fullwidth my-margin-top"
                    onClick={() => clipboard.copy(window.location.href)}
                  >
                    <span class="icon is-small">
                      <i class="fas fa-link"></i>
                    </span>
                    <span>{ clipboard.copied ? 'คัดลอกสำเร็จ' : 'คัดลอก Url เพื่อส่งให้ลูกค้า'}</span>
                  </button>
                </div>
                :
                null
              }
              {(parseFloat(billData.BillStatus) === 0.1 ||
               parseFloat(billData.BillStatus) === 0.2 ||
               parseFloat(billData.BillStatus) === 1.0 ||
               parseFloat(billData.BillStatus) === 2.0 ||
               parseFloat(billData.BillStatus) === 3.0) 
               && user && user.vid === billData.VID 
               ? 
                
              <button
                className="button is-info is-small-mobile is-fullwidth my-margin-top"
                onClick={e => onClickBillButton(e, "DRAFT", `billedit/${billData.BillNo}`, 0.0)}
              >
                <span class="icon is-small">
                  <i class="fas fa-edit"></i>
                </span>
                <span>แก้ไขบิล</span>      
              </button> : null
              }
            </div>
          </div>
        </section>
      </div>
    );
  }
}
