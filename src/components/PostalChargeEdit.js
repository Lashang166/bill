import React, { useState } from "react";
import formatMoney from "../lib/FormatMoney";
import {Switch}  from "../components/Switch/Switch";
//import axios from "axios";
import store from "store";
import NotifButton from "./NotifButton/NotifButton";
import {getbill2} from "../API";

//const apiServer2 = "https://i-sabuy.com/warehouse/api";
/*
axios.defaults.headers.common["Content-Type"] = "application/json";
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
);*/
export default function PostalCharge({
  ShipTypes,
  UpdateState,
  BankAccounts,
  SelectedShipType,
  updateShipTypes,
  SelectedShipCOD,
  updateCODAndOther,
  COD,
  setCOD,
  setIsCODChecked,
  BillStatus,
  selectShipId
}) {
  const [shiptypes, setshiptypes] = useState(ShipTypes);
  //const [bankaccounts, setbankaccounts] = useState(BankAccounts);

  SelectedShipType = SelectedShipType ? SelectedShipType : null;
  selectShipId = selectShipId ? selectShipId : null;

  const editItem = (id, inputz) => {
    const newShip = shiptypes.map((s, _idx) => {
      if (s.id !== id) return s;
      // this is gonna create a new object, that has the fields from
      // `s`, and `name` set to `newName`
      //const newInput = !isNaN(inputz) ? parseFloat(inputz) : inputz;
      //return { ...s, rate: newInput };
      return { ...s, rate: inputz };
    });

    setshiptypes(newShip);
    //updateShipTypes(newShip);
    
    if(COD != 0){

      let index = shiptypes.findIndex(shiptype => shiptype.id === id);

      updateShipTypes(newShip, (COD + parseFloat(inputz) - parseFloat(shiptypes[index].rate)) );
    }else{

      updateShipTypes(newShip, 0 );
    } 
    //setBillShipType(shiptypes);
  };

  const changeExpress = Ship => {
    //let newBank = bankaccounts;
    let newBank = BankAccounts;
    let hadCOD = false;

    const CODIndex = BankAccounts.findIndex(bank => bank.type === "COD");

    if (Ship.cod_status == 1 && CODIndex === -1) {
      newBank.push({ type: "COD" });
      hadCOD = true;
      //console.log("has COD");
      
    } else if (Ship.cod_status == 0 && CODIndex !== -1 ){
      newBank.forEach(bank => {
        for (var i = 0; i < newBank.length; i++) {
          if (newBank[i].type == "COD") {
            //console.log("i =" + i);
            newBank.splice(i);
          }
        }
      });
      hadCOD = false;
    }

    
    
    UpdateState(Ship, newBank, hadCOD, 0);
    //setIsCODChecked(false);
  };

  const resetShipTypes = () =>{

    //setshiptypes();
    //alert("AAA");
    const params = {};
    //axios.post(`${apiServer2}/bill/getbill`, params)
    
    getbill2(params)
      .then(result => {
        //console.log(result);
        //console.log(result.data.data.data.ShipTypes);
        setshiptypes(result.data.data.data.ShipTypes);
        updateShipTypes(result.data.data.data.ShipTypes, COD );
      }
    );
  }

  const focusItem = e => {
    e.currentTarget.select();
  };

  const delteItem = async (ship, index) => {

    if(ship.id !== selectShipId){
      shiptypes.splice(index, 1);
      updateShipTypes(shiptypes, COD );
      
      return {isSuccess : true}
    }
    else{
      //alert("การจัดส่งถูกเลือกอยู่ ไม่สามารถลบได้");
      return {message : "การจัดส่งถูกเลือกอยู่ ไม่สามารถลบได้", isSuccess : false}
    }
    
    
  }

  return (
    <div className="my-padding">
      เลือกวิธีจัดส่งสินค้า
      {parseFloat(BillStatus) === 0.0 ? <a
        href=""
        onClick={e => {
        e.preventDefault();
        resetShipTypes();
        }}
      >
        <i className="fas fa-redo-alt" style={{marginLeft:'6px'}} />
      </a>  : null }
      {shiptypes.map((ShipType, idx) => {
        //console.log(ShipType.id+"-"+idx);
        return (
          <div
            key={idx}
            style={{ cursor: "pointer", marginTop: "10px" }}
            
          >
            <p
              className="is-inline"
              onClick={e => {
                changeExpress(ShipType);
              }}
            >
            <i
              
            
              className={`my-padding-right far ${
                ShipType.id === selectShipId
                  ? "fa-check-square has-text-success"
                  : "fa-check-square has-text-grey-light"
              }`}
            />
            {ShipType.description}
            </p>
            {parseFloat(BillStatus) === 0.0 ? 
            <span className="is-pulled-right">
              <input type="number"
                className="input is-small has-text-right"
                value={ShipType.rate}
                onChange={e => {
                  editItem(ShipType.id, e.target.value);
                }}
                onFocus={e => {
                  focusItem(e);
                }}
                style={{ width: "80px" }}
              />{" "}
              บาท 
                <NotifButton
                  style={{"margin": "5px"}}
                  isSuccess={(e) => {return delteItem(ShipType, idx)}}
                  billStatus={1.0}
                  buttonStyle="delete is-small"
                />
            </span>
            : 
            <span
              className={`is-pulled-right ${
                ShipType.id === selectShipId ? "" : "is-strike"
              }`}
            >
              {parseFloat(ShipType.rate) === 0.0
                ? "ฟรี"
                : formatMoney(ShipType.rate)}{" "}
              บาท
            </span>
            }
            {/*</Switch> */}
          </div>
        );
      })}
      {/* <select
        className="is-pulled-right"
        value={SelectedShipType}
        onChange={e => {
          UpdateState(e.target.value);
        }}
      >
        {ShipTypes.map((ShipType, idx) => {
          // console.log(ShipType);
          return (
            <option key={idx} value={ShipType.id}>
              {ShipType.description}
            </option>
          );
        })}
        }
      </select> */}
    </div>
  );
}
