import React from 'react';
//import InputIncDecWrapper from './InputIncDec.style';
import {NotificationContainer, NotificationManager} from 'react-notifications';
//import './NotifButton.style.css';
import 'react-notifications/lib/notifications.css';
import { useState } from "react";

const config = require('../../config.json');

const NotifButton = ({children, style, name, message, billStatus, errorMessage, onClick, buttonStyle, isSuccess, beforeCheck, afterSuccess }) => {

  const [isClickBtn, setIsClickBtn] = useState(true);
  //let isDisplayNotif = false;
  let timeout = 2500;

  const onClickNotif = async () => {


    //const index = config.billStatus.findIndex(status => status.id === billStatus);

    //console.log(isClickBtn);  
    if(isClickBtn){
    setIsClickBtn(false);
    
    if(beforeCheck) beforeCheck();

    //let isSuccessChk = isSuccess();
    // alert(errorMessage);
    console.log("isSuccess----------");
    console.log(isSuccess);
    await isSuccess().then( async result => {
      console.log(result);
      /*if(result){
        if(afterSuccess) afterSuccess();
        if(message) NotificationManager.info("", result, 3000, ()=>{});
      }else{
        if(errorMessage) NotificationManager.warning("", result, 3000, ()=>{});
      }*/
      if(result.isSuccess){
        if(afterSuccess) afterSuccess();
        if(result.type === "success"){
          if(result.message) NotificationManager.success("", result.message, timeout);
        }
        else if(result.type === "error"){
          if(result.message) NotificationManager.error("", result.message, timeout);
        }
        else {
          if(result.message) NotificationManager.info("", result.message, timeout);
        }

      }
      else{
        if(result.type === "error"){
          if(result.message) NotificationManager.error("", result.message, 5000);
        }
        else {
          if(result.message) NotificationManager.warning("", result.message, timeout);
        }
        
        
      }
      //isDisplayNotif = true;
      setIsClickBtn(true);

    });
    
    }
    /*

    if(isSuccessChk){
      if(afterSuccess) afterSuccess();
      if(message) NotificationManager.info("", message, 3000, ()=>{});
    }
    else{
      NotificationManager.warning("", errorMessage, 3000, ()=>{});
    }*/
    
  }

  return (
  <>
  <div className={buttonStyle} onClick={onClickNotif} style={style}>
      {name}
      {children}
      
  </div>
  <div>
    {//isDisplayNotif ? <NotificationContainer/> : null
    }
  </div>
  </>
  );
};
export default NotifButton;