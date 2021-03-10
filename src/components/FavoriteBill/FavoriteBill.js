import React, {useState} from "react";
import axios from "axios";
import { Redirect } from 'react-router-dom';
import moment from "moment";
import NotifButton from '../NotifButton/NotifButton';
import {createBill1} from '../../API';

const ItemList = ({item}) => (
    <div className="column is-one-quarter" >
          <img src={item.image}/>
        <p className="subtitle is-7" >จำนวน {item.Amount}</p>    
    </div>
);

export default function FavoriteBill({ 
   billInfo,
   onClickDelete,
   searchBill
 }) 
 {
   
  const [isOpenBill, setIsOpenBill] = useState(false);
  const [billNo, setBillNo] = useState();

  const openBill = async (e) => {

    //return false;
    let params = billInfo.billData;

    delete params.id;
    delete params.BillNo;
    delete params.BillStatus;
    delete params.BillErrorStatus;
    delete params.Data.Payment;
    delete params.Data.ShippingAddress;
    delete params.Data.SelectedShipType;
    delete params.Data.shop_id;
    
    params = {
      ...params,
      "data": params.Data,
      BillDate : moment().format("YYYY-MM-DD"),
      BillDue : moment().add(7, 'd').format("YYYY-MM-DD")
      }
    delete params.Data;

    let result = {}

    //result = await axios.post(`${apiServer}/ci-api/Bills/createBill`, params).then( async result => {
    result = await createBill1(params).then( async result => {
      if(result.data.result === "OK"){

        //alert("เปิดบิลสำเร็จ");
        //props.history.push('/billedit/'+result.data.data.BillNo);

        //console.log(result.data.data);
        setBillNo(result.data.data.BillNo);
        setIsOpenBill(true);
        return {message : "เปิดบิลสำเร็จ", isSuccess : true}
      }
      else{
        
        return {message : result.data.result, isSuccess : true}
      }
    });
    /*
    axios.post(`${apiServer}/ci-api/bills/createBill`, params).then(result => {

    });*/
    return {};
  
  }

  if (isOpenBill) {
    return <Redirect to={`/billedit/${billNo}`} />
  }
 
    return(
    <div className="card">
                  <header className="card-header">
                    <p className="card-header-title">
                      {billInfo.billName}
                    </p>
                  </header>
                  <div className="card-content">
                    <div className="content">
                      <div className="columns is-mobile is-multiline">
                        {billInfo.billData.Data.items.map((item) => (
                        <ItemList 
                            item={item}
                        />
                        ))
                        }
                      </div>
                    </div>
                  </div>
                  <footer className="card-footer">
                  <NotifButton
                      name=""
                      isSuccess={(e) => {
                        //let isSuccess = await openBill(e);
                        //console.log(isSuccess);
                        return openBill(e)
                      }}
                      billStatus={1.0}
                      buttonStyle="card-footer-item"
                      message="เปิดบิลสำเร็จ"
                      errorMessage="Product - Not found! []"
                    >
                    <a
                      href="#" 
                      className=""
                    >
                      เปิดบิล{" "}
                    </a>
                    </NotifButton>
                    {/*<a href="#" className="card-footer-item" onClick={openBill}>เปิดบิล</a>*/}
                    <a href="#" className="card-footer-item" onClick={() => onClickDelete(billInfo.billData.id, 0)}>ลบรายการ</a>
                  </footer>
                </div>
  );
 }