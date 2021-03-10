import React from 'react';
//import InputIncDecWrapper from './InputIncDec.style';
//import './NotifButton.style.css';
import 'react-notifications/lib/notifications.css';
import { useState } from "react";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {DelayInput} from 'react-delay-input';

//const config = require('../../config.json');

const NotifTextArea = ({delay, rowsNumber, text, message, placeholder, errorMessage, handelOnChange, buttonStyle, isSuccess, beforeCheck, afterSuccess }) => {

  //console.log(text);
  const [searchText, setSearchText] = useState("");
  
  //let isDisplayNotif = false;
  let timeout = 2500;

  const onClickNotif = async () => {


    //const index = config.billStatus.findIndex(status => status.id === billStatus);

    //console.log(isClickBtn);  
    //if(isClickBtn){
    //setIsClickBtn(false);
    
    if(beforeCheck) beforeCheck();

    //let isSuccessChk = isSuccess();
    //alert(errorMessage);
    await isSuccess().then( async result => {
      //console.log(result);
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
          if(result.message) NotificationManager.error("", result.message, timeout);
        }
        else {
          if(result.message) NotificationManager.warning("", result.message, timeout);
        }
        
        
      }
      //isDisplayNotif = true;
      //setIsClickBtn(true);

    });
    
  }

  const onChangeText = input => {
    console.log(input);
    handelOnChange(input).then(result => {
      /*if(result.isSuccess){
        if(result.message) NotificationManager.success("", result.message, timeout);
      }
      else{
        if(result.message) NotificationManager.warning("", result.message, timeout);
      }*/
      if(result.notifType === "success"){
        if(result.message) NotificationManager.success("", result.message, timeout);
      }
      else if(result.notifType === "info"){
        if(result.message) NotificationManager.info("", result.message, timeout);
      }
      else if(result.notifType === "warning"){
        if(result.message) NotificationManager.warning("", result.message, timeout);
      }
      else if(result.notifType === "error"){
        if(result.message) NotificationManager.error("", result.message, timeout);
      }
    });

  }


  return (
  <>
  
    <DelayInput
      rows={rowsNumber}
      class="textarea"
      element="textarea"
      //type="textbox"
      value={searchText}
      delayTimeout={delay}
      //value={"Test"}
      onChange={e => {
        setSearchText(e.target.value)
        onChangeText(e.target.value)
      }}
      placeholder={placeholder}
    />
  
  </>
  );
};
export default NotifTextArea;