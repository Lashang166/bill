import React, { useState, useContext } from "react";
import moment from "moment";
import star from "../image/star-outline.svg";
import { BillInfoContext } from '../contexts/billInfo/billInfo.context';
import NotifButton from './NotifButton/NotifButton';

export default function BillHeader({
  BillNumber,
  BillDate,
  BillDueDate,
  ShippingAddress,
  BillNote,
  setBillNote,
  onClickSaveFavorite,
  BillId,
  BillStatus,
  SORefer,
  updateCustomerName,
  replaceEmoji
}) {
  const [editMode, setEditMode] = useState(false);
  const [isSaveMode, setIsSaveMode] = useState(false);
  const [isSaveCustomerName, setIsSaveCustomerName] = useState(false);
  const [billnote, setbillnote] = useState(BillNote);
  const [billName, setBillName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const { billInfo } = useContext(BillInfoContext);
  const [index, setIndex] = useState(billInfo.findIndex(bill => bill.billData.id === BillId));

  const onChangeBillNote = (note) => {
    var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;

    //return string.replace(regex, '')
  }


  return (
    <div className="my-padding">
      <div>
        <strong>เลขที่บิล {BillNumber} {SORefer ? "| "+SORefer : null}</strong>
      </div>
      {ShippingAddress && ShippingAddress.Name ? (
        <div>
          ชื่อลูกค้า
          <span className="is-pulled-right">
            <strong>{ShippingAddress.Name}</strong>
          </span>
        </div>
      ) : null}
      <div>
        วันที่เปิดบิล
        <span className="is-pulled-right">{moment(BillDate).format("LL")}</span>
      </div>
      <div>
        วันที่ครบกำหนด
        <span className="is-pulled-right">
          {moment(BillDueDate).format("LL")}
        </span>
      </div>
      <div>
      {parseFloat(BillStatus) < 4 ?
      <>
      {editMode ? (
          <>
            <div className="field is-horizontal">
            <div
                className="field-label is-normal has-text-left"
                style={{ flexGrow: 2 }}
              >
                <label className="label" style={{ fontWeight: 300 }}>
                  ข้อความถึงผู้ขาย
                </label>
              </div>
              <div className="field-body">
                <div className="field has-addons">
                  <div className="control" style={{ flexGrow: 2 }}>
                    <input
                      className="input"
                      type="text"
                      placeholder=""
                      value={billnote}
                      onChange={e => {
                        var emoji =/([#0-9]\u20E3)|[\xA9\xAE\u203C\u2047-\u2049\u2122\u2139\u3030\u303D\u3297\u3299][\uFE00-\uFEFF]?|[\u2190-\u21FF][\uFE00-\uFEFF]?|[\u2300-\u23FF][\uFE00-\uFEFF]?|[\u2460-\u24FF][\uFE00-\uFEFF]?|[\u25A0-\u25FF][\uFE00-\uFEFF]?|[\u2600-\u27BF][\uFE00-\uFEFF]?|[\u2900-\u297F][\uFE00-\uFEFF]?|[\u2B00-\u2BF0][\uFE00-\uFEFF]?|(?:\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDEFF])[\uFE00-\uFEFF]?/g;
                        var THandEN = "[^\u0E00-\u0E7Fa-zA-Z' ]|^'|'$|''"
                        //setbillnote(replaceEmoji(e.target.value))
                        setbillnote(e.target.value.replace(emoji, ''));
                        //setbillnote(e.target.value);
                        
                      }}
                    />
                  </div>
                  <div className="control">
                    <button
                      className="button is-info"
                      onClick={e => {
                        setEditMode(false);
                        setBillNote(billnote);
                      }}
                    >
                      บันทึก
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            ข้อความถึงผู้ขาย {BillNote}
            <a
              href="#t"
              onClick={e => {
                e.preventDefault();
                setEditMode(true);
              }}
            >
              <i className="far fa-edit is-primary" style={{marginLeft:'6px'}} />
              {BillNote && BillNote !== "" ? "แก้ไข" : "เพิ่มโน๊ต"}
            </a>  
          </>
        )}
      </>: null
      }
        </div>
        <div>
      {parseFloat(BillStatus) < 1 ?
      <>
      {isSaveMode ? (
          <>
            <div className="field is-horizontal">
            <div
                className="field-label is-normal has-text-left"
                style={{ flexGrow: 2 }}
              >
                <label className="label" style={{ fontWeight: 300 }}>
                  รายการโปรด {index >= 0 ? billInfo[index].billName : ""}
                </label>
              </div>
              <div className="field-body">
                <div className="field has-addons">
                  <div className="control" style={{ flexGrow: 2 }}>
                    <input
                      className="input"
                      type="text"
                      placeholder="กรุณาตั้งขื่อ"
                      value={billName}
                      onChange={e => {
                        //setBillName(e.target.value);
                        setBillName(replaceEmoji(e.target.value));
                      }}
                      
                    />
                  </div>
                  <div className="control">
                    
                    {/*<button
                      className="button is-info"
                      onClick={() => {
                                  onClickSaveFavorite(billName);   
                                  setIsSaveMode(false); 
                                  setIndex(billInfo.findIndex(bill => bill.billData.id === BillId));
                              }}
                    >
                      บันทึก
                    </button>*/}
                    <NotifButton
                      buttonStyle="button is-info"
                      isSuccess={async () => {
                        return onClickSaveFavorite(billName) ? 
                        {message : "บันทึกรายการเรียบร้อยแล้ว", isSuccess : true} :
                        {message : "กรุณากรอกข้อความ", isSucess : false};
                      }}
                      afterSuccess={() => {
                        setIndex(billInfo.findIndex(bill => bill.billData.id === BillId));
                      }}
                      beforeCheck={() => {
                        setIsSaveMode(false);
                      }}
                      billStatus={1.0}
                      name="บันทึก"
                      message="บันทึกรายการเรียบร้อยแล้ว"
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            รายการโปรด {index >= 0 ? billInfo[index].billName : ""}
            <a
              href="#t"
              onClick={e => {
                e.preventDefault();
                setIsSaveMode(true);
              }}
            >
              <i className="far fa-star is-primary" style={{marginLeft:'6px'}} />
              {billInfo && billName !== "" ? " แก้ไข" : " บันทึกรายการ"}
            </a>  
          </>
        )}
      <div>
        {isSaveCustomerName ? (
          <>
            <div className="field is-horizontal">
            <div
                className="field-label is-normal has-text-left"
                style={{ flexGrow: 2 }}
              >
                <label className="label" style={{ fontWeight: 300 }}>
                  ชื่อลูกค้า
                </label>
              </div>
              <div className="field-body">
                <div className="field has-addons">
                  <div className="control" style={{ flexGrow: 2 }}>
                    <input
                      className="input"
                      type="text"
                      placeholder="กรุณาตั้งขื่อ"
                      value={customerName}
                      onChange={e => {
                        //setCustomerName(e.target.value);
                        
                        setCustomerName(replaceEmoji(e.target.value));
                      }}
                      
                    />
                  </div>
                  <div className="control">
                    
                    {/*<button
                      className="button is-info"
                      onClick={() => {
                                  onClickSaveFavorite(billName);   
                                  setIsSaveMode(false); 
                                  setIndex(billInfo.findIndex(bill => bill.billData.id === BillId));
                              }}
                    >
                      บันทึก
                    </button>*/}
                    <NotifButton
                      buttonStyle="button is-info"
                      isSuccess={async () => {
                        return updateCustomerName(customerName) ? 
                        {message : "บันทึกรายการเรียบร้อยแล้ว", isSuccess : true} :
                        {message : "กรุณากรอกข้อความ", isSucess : false};
                      }}
                      /*afterSuccess={() => {
                        setIndex(billInfo.findIndex(bill => bill.billData.id === BillId));
                      }}*/
                      beforeCheck={() => {
                        setIsSaveCustomerName(false);
                      }}
                      billStatus={1.0}
                      name="บันทึก"
                      message="บันทึกรายการเรียบร้อยแล้ว"
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            ชื่อลูกค้า 
            <a
              href="#t"
              onClick={e => {
                e.preventDefault();
                setIsSaveCustomerName(true);
              }}
            >
              {ShippingAddress && ShippingAddress.Name !== "" 
              ?
                <><i className="fas fa-edit" style={{marginLeft:'6px'}} /> แก้ไข </>
               : 
                <><i className="fas fa-user" style={{marginLeft:'6px'}} /> เพิ่ม</>}
            </a>  
          </>
        )}
      </div>
      </> : null
      }
      
      <NotifButton/>  
        </div>
    </div>
  );
}
