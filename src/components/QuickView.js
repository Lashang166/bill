import React, { useState, useEffect, useContext, useRef } from "react";
import "bulma-extensions/bulma-quickview/dist/css/bulma-quickview.min.css";
import "bulma-extensions/bulma-switch/dist/css/bulma-switch.min.css";
import bulmaQuickview from "bulma-extensions/bulma-quickview/dist/js/bulma-quickview.min.js";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import styled from 'styled-components';
import moment from "moment";
import store from "store";
import { getLocalState, setLocalState } from '../helper/localStorage';
import FavoriteBill from './FavoriteBill/FavoriteBill.js';
import { BillInfoContext } from '../contexts/billInfo/billInfo.context';


const SwitchStyled = styled.div`
.switch[type=checkbox]:checked+label::after {
  left: 1.625rem;
}

.switch[type=checkbox]+label::after, .switch[type=checkbox]+label:after {
  display: block;
  position: absolute;
  top: .25rem;
  left: .25rem;
  width: 1rem;
  height: 1rem;
  -webkit-transform: translate3d(0,0,0);
  transform: translate3d(0,0,0);
  border-radius: 4px;
  background: #fff;
  -webkit-transition: all .25s ease-out;
  transition: all .25s ease-out;
  content: '';

`;

export default function QuickView({ 
    handleKeyword,
    itemPerPage,
    onDateSearch,
    onClickSwitchChannel,
    onSearchBill,
    searchParam,
    type
 }) {
  //const [modal, setmodal] = useState(false);
  const [startDate, setstartDate] = useState(null);
  const { billInfo, updateBillInfo, setBillInfo } = useContext(BillInfoContext);
  
  const user = store.get("user");
  const myRef = useRef();


  const [clickedOutside, setClickedOutside] = useState(false);


  const handleClickOutside = e => {
    if (!myRef.current.contains(e.target)) {
        setClickedOutside(false);
    }

};
  
  const updateBillInfo1 = (item, index) => {

    //setTestText('CHANGED');

    updateBillInfo(item, index);
  }

  useEffect(() => {
    var quickviews = bulmaQuickview.attach();

    if(searchParam && searchParam.params.startDate){
      setstartDate([searchParam.params.startDate, searchParam.params.endDate]);
    }


  });

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
});

  const onChangeDate = inputDate => {
    setstartDate(inputDate);

    onDateSearch(inputDate);
  };


  const isChannelChecked = (channelName) => {

    if(searchParam && searchParam.params.channel){
      const index = searchParam.params.channel.findIndex(channel => channel === channelName); 
      
      if(index > -1){
        return true;
      }
    }
    
    return false;
  }
  
  const handleClickInside = () => {setClickedOutside(false)};


  return (
    <div
      ref={myRef} 
    >
      <button
        className="button is-white is-fullwidth"
        data-show="quickview"
        data-target="quickviewDefault"
        onClick={() => {setClickedOutside(true)}}
      >
          <i className="fas fa-list-ul fa-lg"></i>{" "}{" "}
      </button>

      <div id="quickviewDefault" className={clickedOutside ? "quickview is-active" : "quickview"}>
        
      {/*<div id="quickviewDefault" className="quickview">*/}
        <header className="quickview-header">
          <p className="title">{type === 1 ? "ค้นหาเพิ่มเติม/บิลที่บันทึกไว้": null }</p> 
          <span className="delete" data-dismiss="quickview"></span>
        </header>
        <button 
          class="button is-primary is-fullwidth"
          onClick={() => {
            window.location.replace(`#/productList/${user.amcode}`);
          }}
        >
          E-Commerce
        </button>
        <div className="quickview-body">
          <div className="quickview-block my-padding">
            {type === 1 ? 
            <>
              <div className="control">
                 <label className="label">ค้นหาจากวันที่</label>
                 <DateRangePicker
                  clearAriaLabel="Clear value"
                  onChange={onChangeDate}
                  value={startDate}
                  format="dd/MM/yy"
                  locale="th-TH"
                />
              </div>
               <hr />
               
                  
              <div className="buttons my-margin-top">
                <hr />  
                  {/*
                  <button className="button is-danger is-rounded is-fullwidth" onClick={() => {onClickChannel("SHOPEE")}}>Shopee Order</button>
                  <button className="button is-info is-rounded is-fullwidth" onClick={() => {onClickChannel("LAZADA")}}>Lazada Order</button>
                  <button className="button is-primary is-rounded is-fullwidth" onClick={() => {onClickChannel("ONLINE")}}>BillOnline</button>
                   */}
                   
                <SwitchStyled>
                <label className="label">เลือกจัดการออเดอร์</label>  
                <div class="field">
                  <input id="shopee" className="switch is-rounded is-success" type="checkbox" value="SHOPEE" onClick={(e) => onClickSwitchChannel(e.target)}  checked={isChannelChecked("SHOPEE")}/>
                  <label for="shopee">SHOPEE</label>
                </div>
                <div class="field">
                  <input id="lazada" className="switch is-rounded is-success" type="checkbox" value="LAZADA" onClick={(e) => onClickSwitchChannel(e.target)}  checked={isChannelChecked("LAZADA")}/>
                  <label for="lazada">LAZADA</label>
                </div>
                <div class="field">
                  <input id="online" className="switch is-rounded is-success" type="checkbox" value="ONLINE" onClick={(e) => onClickSwitchChannel(e.target)}  checked={isChannelChecked("ONLINE")}/>
                  <label for="online">ONLINE</label>
                </div>
                </SwitchStyled>
              </div>

              </>
              : null}
                <hr />
                <label className="label">รายการที่บันทึกไว้</label>  
                {billInfo.map((item) => (
                      <>
                        <FavoriteBill 
                          billInfo={item}
                          onClickDelete={updateBillInfo1}
                          searchBill={onSearchBill}
                        />
                        <hr />
                      </>
                      ))
                }
              
            <hr />
              
          </div>
        </div>

         <footer className="quickview-footer"></footer>
      </div>
    </div>
  );
}
