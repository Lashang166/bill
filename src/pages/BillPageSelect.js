import React, { useState, useEffect, Fragment, useContext } from "react";
// import { Redirect } from "react-router-dom";

import { Helmet } from "react-helmet";
import BillDisplay from "../components/BillDisplay";
import BillDisplayEdit from "../components/BillDisplayEdit";
import { BillInfoContext } from '../contexts/billInfo/billInfo.context';
import { getbill1, update1, apiServerImg, lineNotifConfirmPayment} from '../API';

import { getLocalState } from '../helper/localStorage';
import {NotificationContainer} from 'react-notifications';
// const apiServer = "http://localhost:8080"; // "."
//const apiServer = '.'




export default function BillPageSelect(props) {
  const [hasData, setHasData] = useState(false);
  const [billData, setBillData] = useState({});
  const { billId } = props.match.params;
  const { billType } = props.match.params;
  
  const user = getLocalState('user');

  const [COD, setCOD] = useState(-1);
  
  const { addNewBillInfo } = useContext(BillInfoContext);



  useEffect(() => {

    //axios.get(`${apiServer}/ci-api/bills/getBill/${billId}`)
    getbill1(billId)
      .then(result => {
        //console.log("axios get", JSON.stringify(result.data[0]));
        
        if (result.data.length > 0) {
          //console.log(result);
          result.data[0].Data = JSON.parse(result.data[0].Data);
        }
        setBillData(result.data[0]);
        setHasData(true);
      })
      
      
  }, []);

  const SaveBillData = billData => {

    

    const postData = { ...billData, Data: JSON.stringify(billData.Data) };
  
    //axios.post(`${apiServer}/ci-api/bills/update`, postData)
    update1(postData)
      .then(result => {
        //console.log("Saved");
      })
      .catch(e => {
        //console.log("Error updating", e);
        alert("Save error please try again");
        // window.location.reload();
      });
    
  };

  const lineNotif = (custName, totalAmount) => {

    const itemList = billData.Data.items.map(item => item.SKU + " x " + item.Amount).join(", ");


    const bankName = billData.Data.Payment.BankAccount.abbr ? billData.Data.Payment.BankAccount.abbr.toUpperCase() : billData.Data.Payment.BankAccount.type;
    //const bankName = billData.Data.Payment.BankAccount.abbr;
    const SlipImage = billData.Data.Payment.image ? "https://bill.i-sabuy.com/Bill/ci-api/" + billData.Data.Payment.image : null;

    //console.log(billData.Data);
    const lineToken = billData.Data.LineToken;
    let params = {
            
      "Token": lineToken,
      "MsgTextOrder": "ยินดีด้วย!! ลูกค้าแจ้งชำระเงินแล้ว",
      "MsgBillno": "บิล: " + props.match.params.billId,
      "MsgCust": "ลูกค้า: " + custName,
      "MsgItems": "สินค้า: " + itemList,
      "MsgTotal": "ยอดเงิน: " + totalAmount,
      "MsgPayment": "การชำระ: " + bankName,
      "MsgBillUrl": window.location.origin+window.location.pathname+"/#/bill/" + props.match.params.billId,
      "SlipImage": SlipImage,
  
    };
    
    lineNotifConfirmPayment(params)
    
    
  }

  const replaceEmoji = (txt) =>{
    var emoji =/([#0-9]\u20E3)|[\xA9\xAE\u203C\u2047-\u2049\u2122\u2139\u3030\u303D\u3297\u3299][\uFE00-\uFEFF]?|[\u2190-\u21FF][\uFE00-\uFEFF]?|[\u2300-\u23FF][\uFE00-\uFEFF]?|[\u2460-\u24FF][\uFE00-\uFEFF]?|[\u25A0-\u25FF][\uFE00-\uFEFF]?|[\u2600-\u27BF][\uFE00-\uFEFF]?|[\u2900-\u297F][\uFE00-\uFEFF]?|[\u2B00-\u2BF0][\uFE00-\uFEFF]?|(?:\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDEFF])[\uFE00-\uFEFF]?|[\u20E3]|[\u26A0-\u3000]|\uD83E[\udd00-\uddff]|[\u00A0-\u269F]/g;

    //return txt.replace(emoji, '');
    return txt;
  }


  const onClickSave = (inputName) => {

    //setBillData({...billData, billName});

    //console.log();
    if(inputName == ''){
      //alert("Please Input Name");
      return false;
    }
    else{
      addNewBillInfo({billName : inputName, billData});
      return true;
    }
    //addNewBillInfo(billData);
  }

  return(
    <Fragment>
      <Helmet title={`Bill #${billId}`} />
    
      {(() => {
        //Status is Draft
        if(parseFloat(billData.BillStatus) === 0.0){  
        //if(billType !== "billedit"){
          //if(window.location.hash.split("/")[1] !== "billedit") {window.location.hash = `/billedit/${billData.BillNo}`;}
          if(window.location.hash.split("/")[window.location.hash.split("/").length-2] !== "billedit") {window.location.replace(`#/billedit/${billData.BillNo}`);}
          /*alert(billType)
          alert(billData.BillStatus)
          alert(billType !== "billedit")*/
          //if(billType !== "billedit") {window.location.href = `/#/billedit/${billData.BillNo}`;}
          return (
            <BillDisplayEdit
              COD={COD}
              setCOD={setCOD}
              billData={billData}
              updateBillData={b => {
    
                setBillData({ ...b });
                SaveBillData(b);
              }}
              actionType="edit"
              setBillData={setBillData}
              onClickSaveFavorite={onClickSave}
              replaceEmoji={replaceEmoji}
            />
          )
        }
        else if(parseFloat(billData.BillStatus) > 0.0){
        //else if(billType !== "bill"){
          //if(window.location.hash.split("/")[1] !== "bill") {window.location.hash = `/bill/${billData.BillNo}`;}
          if(window.location.hash.split("/")[window.location.hash.split("/").length-2] !== "bill") {window.location.replace(`#/bill/${billData.BillNo}`);}
          /*alert(billType)
          alert(billData.BillStatus)
          alert(billType !== "bill")*/
          //if(billType !== "bill") {window.location.href = `/#/bill/${billData.BillNo}`;}
          return (
            <BillDisplay
              COD={COD}
              setCOD={setCOD}
              billData={billData}
              updateBillData={b => {
              // console.log("updateBillData", b);
                
                setBillData({ ...b });
                SaveBillData(b);
              }}
              setBillData={setBillData}
              lineNotif={lineNotif}
              replaceEmoji={replaceEmoji}
            />
          )
        }else {
          return (
            <div>Loading...</div>
          )
        }
      })()}
      
    
    
      
    <NotificationContainer/>
    </Fragment>
  )
  
}
