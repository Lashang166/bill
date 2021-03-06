import React, { useState, useEffect } from "react";
import formatMoney from "../lib/FormatMoney";
import "bulma-extensions/bulma-switch/dist/css/bulma-switch.min.css";

import styled from 'styled-components';

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
}
`;


export default function BillTotal({
  TotalValue,
  PostalCharge,
  PostalName,
  Discount,
  DiscountType,
  setBillDiscount,
  setDiscountType,
  SelectedShipCOD,
  UpdateCOD,
  COD,
  setIsCODChecked,
  isCODChecked,
  setCOD,
  updateCODAndDiscount,

  role,
  commission,
  percent,
  Amount,
  saleDis,
  setSaleDis
}) {
  const [discount, setdiscount] = useState(Discount);
  const [discounttype, setdiscounttype] = useState(DiscountType);
  const [discountvalue, setdiscountvalue] = useState(0);
  const [discountpercent, setdiscountpercent] = useState(0);
  //const [saleDis, setSaleDis] = useState(0)
  const [codstatus, setcodstatus] = useState(SelectedShipCOD == true ? 1 : 0);


  async function updateCOD() {

    
    let PostalChargeTemp = parseFloat(PostalCharge);

    if(isNaN(PostalChargeTemp)){
      PostalChargeTemp = 0;
    }
    
    let discountTemp = parseFloat(discount);

    if(isNaN(discountTemp)){
      discountTemp = 0;
    }

    if(codstatus == 1){
      await setCOD((TotalValue + PostalChargeTemp) - discountTemp);
      //COD = (TotalValue + PostalCharge) - discount;
    }
  };
  //edit

  
  useEffect(() => {

    if(role === "Seller"){
      let total = (TotalValue + PostalCharge) - saleDis;
      updateCODAndDiscount(saleDis, total);
    }
  
  },[saleDis])


  //updateCOD();

  useEffect(() => {

    setCOD(TotalValue + PostalCharge - discount);
    if(role === "Seller"){
     
      // (??????????????? * agentcommission) + ((??????????????? * ????????????) * agentpercent%)
       let dis = (Amount * commission) + TotalValue * (percent / 100)
      // setSaleDis(dis)
      let total = (TotalValue + PostalCharge) - saleDis;
     

    }else{
      if (discounttype === "VALUE") {
        setdiscount(discount);
        setdiscountvalue(discount);
        //setdiscountpercent(0);
      } else {
        //Percent
        const newValue = TotalValue * (parseFloat(discount) / 100);
        setdiscount(newValue);
        setdiscountvalue(discount);
        //setdiscountpercent(0);
      }

    }


    updateCOD();
  }, []);

  const changeDiscountPercent = event => {
    setdiscountpercent(event.target.value);
    const newValue = TotalValue * (parseFloat(event.target.value) / 100);
    setdiscount(newValue);
    setBillDiscount(newValue);

    //clear
    setdiscounttype("PERCENTAGE");
    setDiscountType("PERCENTAGE");
    setdiscountvalue(0);
  };

  const changeDiscountValue = event => {
    setdiscountvalue(event.target.value); //set input
    let newValue = event.target.value;

    if (discounttype === "PERCENTAGE") {
      newValue = TotalValue * (parseFloat(event.target.value) / 100);
      //setdiscount(newValue);
    } /*else {
      setdiscount(event.target.value);
    }*/
    setdiscount(newValue);
    //Update bill to API
    //setCOD(COD - event.target.value);
    if(codstatus == 1){
      let total = (TotalValue + PostalCharge) - event.target.value;
      updateCODAndDiscount(newValue, total)
    }
    else{
      setBillDiscount(newValue);
    }
    
    //setDiscountType(discounttype);
  };

  const changeDiscountType = event => {
    const input = event.currentTarget.value;

    if (input === "PERCENTAGE") {
      const newValue = TotalValue * (parseFloat(discountvalue) / 100);
      setdiscount(newValue);
    } else {
      setdiscount(discountvalue);
    }

    setdiscounttype(input); //state

    //Update bill to API
    setDiscountType(input);
    //setBillDiscount(discountvalue);
  };

  const focusItem = e => {
    e.currentTarget.select();
  };
  const changeCOD = e => {

    if(codstatus == 1){
      setcodstatus(0);
      UpdateCOD(0); 
      setIsCODChecked(false);
    } else {
      setcodstatus(1);
      setIsCODChecked(true);
      let total = (TotalValue + PostalCharge) - discount;
      UpdateCOD(total)

    }
    //console.log("cod = ", e);
    
  };

  /*
  const DiscountValue =
    DiscountType === "VALUE"
      ? discount
      : TotalValue * (parseFloat(discount) / 100)
  */

  //const DiscountText = DiscountType === "VALUE" ? "(?????????)" : "(%)";

  return (
    <div className="my-padding">
      <div>
        ???????????????????????????
        <span className="is-pulled-right">{formatMoney(TotalValue)} ?????????</span>
      </div>
      {/*}
      {parseFloat(Discount) > 0 ? (
        <div>
          ??????????????????
          <span className="is-pulled-right">
            {formatMoney(DiscountValue)} ?????????
          </span>
        </div>
      ) : null}
      {*/}
      {/*
      <div className="box-padding">
        ??????????????????
        <span className="is-pulled-right">
          <input
            className="input is-small"
            value={discount}
            onChange={e => {
              changeDiscount(e);
            }}
            onFocus={e => {
              focusItem(e);
            }}
          />
        </span>{" "}
        {DiscountText}
      </div>
      {*/}
      <div className="field is-horizontal">
        <div className="field-body container">
          <div className="field">
            <span>??????????????????</span>{" "}
            {/* ====== edit ====== */}
            { role === "Seller" ? 
              <div className="select is-small" style={{ display: "none" }}>
                
              </div>
              :
              <span>
                  <div className="select is-small" style={{ marginLeft: "5px" }}>
                    <select
                      value={discounttype}
                      onChange={e => {
                        changeDiscountType(e);
                      }}
                    >
                      <option value="PERCENTAGE">%</option>
                      <option value="VALUE">?????????</option>
                    </select>
                  </div>{" "}
                  <input
                    className="input is-success is-small"
                    type="number"
                    placeholder="??????????????????????????????"
                    style={{ width: "70px", marginLeft: "5px" }}
                    value={discountvalue}
                    onChange={e => {
                      changeDiscountValue(e);
                    }}
                    onFocus={e => {
                      focusItem(e);
                    }}
                  />
            </span>
             
          }
            {/* ========= Edit ======= */}
              {
                role === "Seller" ? 
                <span className="is-pulled-right has-text-danger">
                - {formatMoney(saleDis)} ?????????
                </span>
              :
              <span className="is-pulled-right has-text-danger">
                - {formatMoney(discount)} ?????????
              </span>
              }
          </div>
        </div>
      </div>
      <div>
        ???????????????????????????????????? {PostalName}
        <span className="is-pulled-right">{formatMoney(PostalCharge)} ?????????</span>
      </div>
      <div>
        <strong className="is-size-5">?????????????????????????????????</strong>
        { 
          role === "Seller"? 
          <strong className="is-pulled-right is-size-5 has-text-success">
            {formatMoney(TotalValue + PostalCharge - saleDis)} ?????????
          </strong>
          :
          <strong className="is-pulled-right is-size-5 has-text-success">
            {formatMoney(TotalValue + PostalCharge - discount)} ?????????
          </strong>

        }
      </div>

      {/** 
      { SelectedShipCOD == true ? 
      <div>
        <span>?????????????????????????????????????????????????????????????????????????????? (COD)</span>
        <span className="is-pulled-right has-text-success">
          {/*
          <span
            style={{ cursor: "pointer", marginTop: "10px" }}
            onClick={e => {
              changeCOD(e);
            }}
          >
            <i
              className={`my-padding-right far ${
                codstatus == 1
                  ? "fa-check-square has-text-success"
                  : "fa-check-square has-text-grey-light"
              }`}
            />
            
          </span>     
          <SwitchStyled>
              <div class="field">
              <input id="shopee" className="switch is-rounded is-success" type="checkbox" value="SHOPEE" onClick={(e) => changeCOD(e)}  checked={isCODChecked}/>
              <label for="shopee"></label>
            </div>
            </SwitchStyled>
        </span>
      </div>
      : null }
      */}     
    </div>
  );
}
