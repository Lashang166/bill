/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import Helmet from "react-helmet";
//import axios from "axios";
import isLoggedIn from "./../helpers/is_logged_in";
import store from "store";
import formatMoney from "../lib/FormatMoney";
import isEmptyObject from "../lib/IsEmptyObject";
import ModalImage from "../components/ModalImage";
import QuickView from "../components/QuickView";
import { css } from "@emotion/core";
import SyncLoader from "react-spinners/SyncLoader";
import { loadRecord, getbill1, getbill2, createbill2, update1, createBill1, apiServer } from "../API"

import {NotificationContainer} from 'react-notifications';
import moment from "moment";
import "moment/locale/th";
import isPagination from "./../helpers/is_pagination";
import { getLocalState, setLocalState } from './../helper/localStorage';
import NotifButton from "../components/NotifButton/NotifButton"
import {PullDownContent, ReleaseContent, RefreshContent} from "react-js-pull-to-refresh";
import {PullToRefresh} from "react-js-pull-to-refresh";
//import qs from "qs";


// const apiServer = "http://localhost:8080"; // "."

//const apiServer = ".";
/*const apiServer = "https://bill.i-sabuy.xyz/Bill";
const apiServer2 = "https://i-sabuy.com/warehouse/api";

axios.defaults.headers.common["Content-Type"] = "application/json";
//axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
//axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

// Add a request interceptor
axios.interceptors.request.use(
  function(config) {
    const token = store.get("user");

    if (token.amtk != null) {
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
export default function BillsListPage(props) {
  const [billsList, setBillsList] = useState([]);
  const [pagination, setPagination] = useState({});
  const [islogin, setIslogin] = useState(0);
  const [modalshow, setmodalshow] = useState(false);
  const [modalImage, setmodalImage] = useState("");
  const [totalPrice, setTotalPrice] = useState();
  const [isRedirectBillEdit, setIsRedirectBillEdit] = useState(false);
  const [redirectPage, setRedirectPage] = useState();
  
  const [keyword, setkeyword] = useState("");
  const [currentPage, setcurrentpage] = useState(1);
  //const [startDate, setstartDate] = useState([new Date(), new Date()]);
  const [startDate, setstartDate] = useState(null);
  const [lastsearch, setlastsearch] = useState("staus");
  //const [endDate, setendDate] = useState(new Date(startDate).setDate(date.getDate() + 6));
  const [itemPerPage, setitemPerPage] = useState(isPagination);
  const [loading, setLoading] = useState(false);

  const [searchParam, setSearchParam] = useState(getLocalState('searchParams'));
  const [billStatus, setbillstatus] = useState((searchParam && searchParam.params.status) ? searchParam.params.status : "");
  const [isClickBtnWChecked, setIsClickBtnWChecked] = useState((searchParam && searchParam.params.status) === 3.0 ? true : false);

  const user = store.get("user");
  //console.log(props);

  const myRef = useRef();

  const getParamsByRole = () => {
      let params = {};
      //console.log(user.amrole);
      if(user){
      if(user.amrole === "Staff"){
          /*status = [
          {
            status : "0.2"
          },
          {
            status : "0.0"
          },
          {
            status : "2.0"
          },
          {
            status : "1.0"
          }
          ]*/
          //status = ["0.2", "0.0", "1.0", "2.0"]
          //status = "0.0"
          params = {
            status : "0.0",
            amcode : user.amcode
          }
      }
      }

      return params;

  }

  useEffect(() => {
    //window.addEventListener('scroll', handleScroll, true);
    let params = searchParam;
    
    if(!searchParam){
    params = {
      params: {
        rowperpage: itemPerPage
      }
    };
    }
    else{
      delete params.params.page;
    }

    
    let moreParams = getParamsByRole();
    //console.log(status);
    
    //delete params.params.status;
    delete params.params.amcode;

    params = {
      params : {
        ...params.params,
        ...moreParams
      }
    }
    
    //console.log(params);
    //console.log(moreParams);

    
    setLocalState('searchParams', params)
    setSearchParam(params);
    //console.log(params);
    

    //axios.get(`${apiServer}/ci-api/bills/listAllBills`).then(result => {
    //axios.get(`${apiServer}/ci-api/bills/loadRecord`, params).then(result => {
    loadRecord(params).then(result => {
      //setBillsList(result.data.data);
      //console.log(result);
      if(result.data.data){
      const newData = result.data.data.map(row => {
        try{
          let strData = JSON.parse(row.Data);
          return { ...row, note: strData.note ? strData.note : "-" };
        }
        catch{
          return { ...row };
        }
      });
      setBillsList(newData);


      setPagination(result.data.pagination);
      }
    });
    
  }, []);

  const searchBill = async () => {
    

    //await axios.get(`${apiServer}/ci-api/bills/loadRecord`, searchParam).then(result => {
    loadRecord(searchParam).then(result => {
      //setBillsList(result.data.data);
      const newData = result.data.data.map(row => {
        try{
          let strData = JSON.parse(row.Data);
          return { ...row, note: strData.note ? strData.note : "-" };
        }
        catch{
          return { ...row };
        }
      });
      setBillsList(newData);


      setPagination(result.data.pagination);
    });
  }

  if (!isLoggedIn()) {
    return <Redirect to="/login" />;
  }

  //NewBill
  const openNewBill = async event => {
    //const params = { ssss: 78998465465, txt: "sajdkbhsajdbkajksbdjksa" };
    const params = {};

    let result = {};

    //result = await axios.post(`${apiServer2}/bill/getbill`, params).then(async result => {
    getbill2(params).then(async result => {
      if (result.data.message == "success") {
        //return axios.post(`${apiServer}/ci-api/bills/createBill`, result.data.data)
        return createBill1(result.data.data)
          .then(result2 => {
            if (result2.data.result == "OK") {
              //alert(" เพิ่มบิลสำเร็จ.NO = " + result2.data.data.BillNo);
              let params = {
                params: {
                  keyword: "",
                  rowperpage: itemPerPage
                }
              };
              customSearch(params);
              //console.log(result2.data);
              //window.location.href = `/#/billedit/${result2.data.data.BillNo}`;
              setRedirectPage(`billedit/${result2.data.data.BillNo}`);
              setIsRedirectBillEdit(true);
              //return true;
              return {message : "เปิดบิลสำเร็จ", isSuccess : true}
            }
          });
      } else {
        //alert("Error OpenBill");
        return {message : "Error", isSuccess : true}
      }
    });
    //console.log(result);
    return {};
  };

  //Open Bill to API
  const updateBillStatus = input => {
    return getBillDetail(input.BillNo);
  };

  const updateParamsByType = (inputParam) => {

    let tempParams = {};

    if(inputParam){
      delete searchParam.params.startDate;
      delete searchParam.params.endDate;
    }
    else{
      tempParams = {
        params : {
          ...searchParam.params,
          startDate: moment(inputParam[0]).format('YYYY-MM-DD'),
          endDate: moment(inputParam[1]).format('YYYY-MM-DD'),
        }
      }
    }

  };

  const updateChannelParamsByData = (inputParam) => {

    let tempParams = {};

    // if channel exists
    if(searchParam.params.channel){

      const index = searchParam.params.channel.findIndex(channel => channel === inputParam);

      //if input is exists, delete it
      if(index > -1){
        
        searchParam.params.channel.splice(index, 1);

        //if no data in channel, delete channel object
        if(searchParam.params.channel.length === 0){
          delete searchParam.params.channel;
        }
        tempParams = searchParam;

      }
      //if input not exists, insert new param
      else{
        tempParams = {

          params : {
            ...searchParam.params,
            channel : [...searchParam.params.channel, inputParam],
          }
        };
      }
      
    }
    // No channel Before
    else{
      tempParams = {

        params : {
          ...searchParam.params,
          channel : [inputParam],
        }
      };
    }
    
    setSearchParam(tempParams);

    return(tempParams);
  }

  //search date between bill Date
  const searchDate = (dateInput) => {

    let tempParams = searchParam;

    if(dateInput){
      tempParams = {
        params:{
          ...searchParam.params,
          startDate: moment(dateInput[0]).format('YYYY-MM-DD'),
          endDate: moment(dateInput[1]).format('YYYY-MM-DD'),
        }
      }
    }
    else{
      
      delete tempParams.params.startDate;
      delete tempParams.params.endDate;
    }


    setSearchParam(tempParams);

  
    //axios.get(`${apiServer}/ci-api/bills/listAllBills`).then(result => {
    //axios.get(`${apiServer}/ci-api/bills/loadRecord`, tempParams).then(result => {
    loadRecord(tempParams).then(result => {
      //setBillsList(result.data.data);
      const newData = result.data.data.map(row => {
         
        try{
          let strData = JSON.parse(row.Data);
          return { ...row, note: strData.note ? strData.note : "-" };
        }
        catch{
          return { ...row };
        }
        
      });
      //setBillsList(newData);

    setBillsList(newData);
    setLocalState('searchParams', tempParams);

    setPagination(result.data.pagination);
    });

  }

  const handleScroll = async e => {

    await searchBill();
    /*
      await searchBill().then(e => {
        sleep(2000).then(() => {
          //do stuff
          setLoading(false);
        })
      });
      */
  }

  //console.log(handleScroll);

  const searchBillChannel = (inputChannel) => {


    let tempParam = updateChannelParamsByData(inputChannel.value);


    //axios.get(`${apiServer}/ci-api/bills/loadRecord`, tempParam).then(result => {
    loadRecord(tempParam).then(result => {  
      const newData = result.data.data;

      setBillsList(newData);
      setLocalState('searchParams', tempParam);
      setPagination(result.data.pagination);
    });
  }

  //Get bill Detail
  const getBillDetail = async billId => {
    let result = {}
    //result = await axios.get(`${apiServer}/ci-api/bills/getBill/${billId}`)
    result = await getbill1(billId)
      .then(result => {
        let Data = result.data[0];
        let DataBill = JSON.parse(Data.Data);
        let Items = [];

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

        //return axios.post(`${apiServer2}/bill/createbill2`, params).then(async result2 => {
        return createbill2(params).then(async result2 => {
          //console.log(result2.data);
          if (result2.data.message == "success") {
            //alert("บันทึกข้อมูลสำเร็จ");
            let params3 = {
              params: {
                keyword: "",
                rowperpage: itemPerPage
              }
            };

            const postData = { ...Data, BillStatus : 5.0, Data: JSON.stringify({...DataBill, SORefer : result2.data.msg[0]}) };

            //console.log(postData);
            //await axios.post(`${apiServer}/ci-api/bills/update`, postData)
            await update1(postData)
              .then(result3 => {
              console.log(result3);
            })
            customSearch(params3);
            return {message : "เปิดบิลสำเร็จ", isSuccess : true};
          } else {
            //alert(result2.data.message);
            return {message : result2.data.message, isSuccess : false};
          }
        });
      })
      .catch(e => {
        console.log("error", e.toString());
      });

      return result;
  };

  //Item per Page
  const changeItemPerPage = event => {
    setitemPerPage(event.target.value);
    store.set("itemperpage", event.target.value);

    searchParam.params.rowperpage = event.target.value;

    delete searchParam.params.page;



    //axios.get(`${apiServer}/ci-api/bills/loadRecord`, searchParam).then(result => {
    loadRecord(searchParam).then(result => {
      setBillsList(result.data.data);

      setcurrentpage(result.data.pagination.page_current);
      setLocalState('searchParams', searchParam);
      setPagination(result.data.pagination);
    });
  };

  const handleChange = event => {
    setlastsearch("status");
    setbillstatus(event.target.value);
    let params = {
      params: {
        ...searchParam.params,
        status: event.target.value,
        rowperpage: itemPerPage
      }
    };

    delete params.params.page;

    console.log("event.target.value");
    console.log(event.target.value);
    console.log("params");
    console.log(params);
    if(event.target.value === "true") delete params.params.status;

    console.log("params", event.target.value === "true");
    console.log(params);
    if(event.target.value !== 3.0 )setIsClickBtnWChecked(false);
    else setIsClickBtnWChecked(true);
  
    setSearchParam(params)
    setLocalState('searchParams', params)




    //axios.get(`${apiServer}/ci-api/bills/loadRecord`, params).then(result => {
    loadRecord(params).then(result => {
      const newData = result.data.data.map(row => {
        return { ...row, note: row.Data.note };
      });
      setBillsList(newData);

      setPagination(result.data.pagination);
    });
  };

  const choosePage = evt => {
    //console.log("LastSearch = " + lastsearch);
    //console.log("evt = ", evt);

    let inputPage = Number(evt);

    let tempParams = searchParam;

    if(searchParam.params.page){
      tempParams.params.page = inputPage;
    }
    else{
      
      tempParams = {
        params:{
          ...searchParam.params,
          page: inputPage,
        }
      }
    }


    setSearchParam(tempParams);

    setcurrentpage(inputPage);
    customSearch(tempParams);
  };

  const pagePrevious = () => {
    let nowPage = Number(currentPage);
    nowPage--;
    setcurrentpage(nowPage);

    let params = {
      params: {
        status: billStatus,
        page: nowPage,
        rowperpage: itemPerPage
      }
    };
    customSearch(params);
  };

  const pageNext = () => {
    let nowPage = Number(currentPage);
    nowPage++;
    setcurrentpage(nowPage);

    let params = {
      params: {
        status: billStatus,
        page: nowPage,
        rowperpage: itemPerPage
      }
    };
    customSearch(params);
  };

  const handleLogout = evt => {
    evt.preventDefault();
    store.remove("user");
    setIslogin(islogin + 1);
  };

  const viewSlip = (input, totalPrice) => {
    //evt.preventDefault();
    //console.log(e);
    setTotalPrice(totalPrice);
    setmodalImage(input);
    setmodalshow(true);
  };

  const checklogin = () => {
    if (islogin > 0) {
      return <Redirect to="/login" />;
    }
  };

  const btnWaitCheck = event => {
    //console.log("btnWaitCheck");

    let params = searchParam;
    if(!isClickBtnWChecked){
       params = {
        params: {
          status: 3.0,
          ...searchParam.params,
          //rowperpage: itemPerPage
        }
      }
        
      setbillstatus(3.0);
    }
    else{
      if(params.params.status === 3.0) delete params.params.status;
    }
    setIsClickBtnWChecked(!isClickBtnWChecked);    
  
    setSearchParam(params)
    setLocalState('searchParams', params)

    //axios.get(`${apiServer}/ci-api/bills/loadRecord`, params).then(result => {
    loadRecord(params).then(result => {
      //console.log(result.data);
      //setBillsList(result.data.data);
      const newData = result.data.data.map(row => {
        return { ...row, note: row.Data.note };
      });
      setBillsList(newData);

      setPagination(result.data.pagination);
    });
  };

  const handleKeyword = event => {
    setlastsearch("keyword");
    //if (event.target.value) {
    //console.log("keyword = " + event.target.value);
    setkeyword(event.target.value);
    /*let params = {
      params: {
        keyword: event.target.value,
        page: 1,
        rowperpage: itemPerPage
      }
    };*/

    let tempParams = searchParam;

    if(searchParam.params.keyword){
      tempParams.params.keyword = event.target.value;
    }
    else{
      
      tempParams = {
        params:{
          ...searchParam.params,
          keyword: event.target.value,
        }
      }
    }

    setSearchParam(tempParams);
    customSearch(tempParams);
    //}
  };

  const customSearch = params => {

    //console.log("Search Keyword", params);
    //axios.get(`${apiServer}/ci-api/bills/loadRecord`, params).then(result => {
    loadRecord(params).then(result => {
      //console.log(result.data);
      const newData = result.data.data.map(row => {
        return { ...row, note: row.Data.note };
      });
      setBillsList(newData);

      setPagination(result.data.pagination);
      setcurrentpage(result.data.pagination.page_current);
    });
  };

  let renderPageNumbers = () => {
    let btnPage = [];

    let page_start = 1;
    let page_end = 1;


    if (pagination.page_max <= 5) {
      page_start = 1;
      page_end = Number(pagination.page_max);
    } else {
      //กรณีมากก่า 5 หน้า
      //page_start = 1;
      //page_end = Number(pagination.page_max);

      const nowPage = pagination.page_current;
      const beforeMinPage = Number(pagination.page_min + 2);
      const beforeMaxPage = Number(pagination.page_max - 2);

      page_start = Number(nowPage - 2);
      page_end = Number(nowPage) + Number(2);

      if (nowPage <= 3) {
        page_start = 1;
        page_end = 5;
      }

      if (nowPage >= beforeMaxPage) {
        page_start = Number(pagination.page_max - 4);
        page_end = Number(pagination.page_max);
      }
    }

    for (let i = page_start; i <= page_end; i++) {
      btnPage.push(
        <li>
          {" "}
          <a
            key={i}
            className={
              currentPage == i
                ? "pagination-link is-current"
                : "pagination-link is-danger"
            }
            onClick={() => choosePage(i)}
          >
            {" "}
            {i}{" "}
          </a>{" "}
        </li>
      );
    }
    return btnPage;
  };

  const paneDidMount = (node) => {
    if (node) {
      node.addEventListener('scroll', () => console.log('scroll!'));
    }
  };

  const override = css`
  display: block;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  border-color: red;

  `;
  
  //console.log(billsList);

  if (isRedirectBillEdit) {
    return <Redirect to={`${redirectPage}`} />
  }

  return (
    <PullToRefresh
      pullDownContent={<PullDownContent />}
      releaseContent={<ReleaseContent />}
      refreshContent={<SyncLoader css={override} size={15} color={"#123abc"} />}
      pullDownThreshold={100}
      onRefresh={handleScroll}
      triggerHeight={200}
      backgroundColor='white'
      startInvisible={true}
    >
  <div class="hero-body has-background-white-bis my-fix-hero-padding-top">
    <div className="container" >
      <Helmet title="ระบบบิลออนไลน์ by I-Sabuy" />
      {/* oob edit; */}{" "}
      <div className="my-padding has-round-border my-margin-bottom has-background-white" >
        <div className="columns is-mobile">
          <div className="column is-4 my-margin-top" ref={paneDidMount} onScroll={() => handleScroll()}>
            <div className="buttons">
              {/*<button
                className="button is-primary is-fullwidth"
                onClick={openNewBill}
              >
                {" "}
                เปิดบิล{" "}
              </button>{" "}*/}
              <NotifButton
                name="เปิดบิล"
                message="เปิดบิลสำเร็จ"
                //isSuccess={(e) => {alert(openNewBill(e))}}
                isSuccess={(e) => {return openNewBill(e)}}
                billStatus={1.0}
                errorMessage="Product Not Found"
                buttonStyle="button is-primary is-fullwidth"
              />
            </div>{" "}
          </div>{" "}
          <div className="column my-margin-top">
            <div className="field">
              <div className="control">
                <div className="select is-primary is-fullwidth">
                  <select
                    id="selectStatus"
                    onChange={handleChange}
                    value={billStatus}
                  >{user.amrole === "Staff" ? 
                  <>
                    <option value="0.0"> ร่าง </option>
                    <option value="1.0"> รอชำระเงิน </option>
                    <option value="2.0"> รอที่อยู่จัดส่ง </option>
                    <option value="0.2"> ยกเลิก </option>
                  </>
                  : <>
                    <option value> สถานะทั้งหมด </option>
                    <option value="0.0"> ร่าง </option>
                    <option value="1.0"> รอชำระเงิน </option>
                    <option value="2.0"> รอที่อยู่จัดส่ง </option>
                    <option value="3.0"> แจ้งการชำระแล้ว </option>
                    <option value="4.0"> กำลังแพ็คสินค้า </option>
                    <option value="5.0"> ส่งสินค้าแล้ว </option>
                    <option value="0.2"> ยกเลิก </option>
                    </>
                  }
                  </select>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          {/*<div className="column is-one-third my-margin-top">
            <div className="buttons">
              <button
                className={`button ${
                  isClickBtnWChecked
                    ? "is-link is-outlined"
                    : ""
                } is-fullwidth` }
                onClick={btnWaitCheck}
              >
                รอเช็คยอด{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}*/
		  <div className="navbar-end my-margin-top" >
			<div className="navbar-end" style={{ padding: ".75em" }}>
					<QuickView onDateSearch={searchDate} onClickSwitchChannel={searchBillChannel} onSearchBill={searchBill} searchParam={searchParam} type={1}/>
			</div>
			</div>  
		  }
        </div>
        <div className="columns is-mobile">
          <div className="column">
            <input
              className="input"
              type="text"
              id="search_keyword"
              onKeyUp={handleKeyword}
              placeholder="ค้นหา"
            />
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {/* endoob edit; */}
      <div className="columns is-multiline" >
        {" "}
        {billsList.map((bill, idx) => {

          try{
            
          if(bill.BillNo === '20200601142207') 
          console.log(bill)
          const data = JSON.parse(bill.Data);
          if(bill.BillNo === '20200601142207') 
            console.log(bill)

          const itemList = data.items.map(item => item.SKU + " x " + item.Amount).join(", ");
          //summary
          let total = data.items.reduce((totalValue, item) => {
            // console.log(item.Amount, item.PricePerUnit);
            return (
              totalValue +
              parseFloat(item.Amount) * parseFloat(item.PricePerUnit)
            );
          }, 0);
          let postalCharge = data.ShipTypes.reduce((Value, ShipType) => {
              return Value + (ShipType.id === data.selectShipId ? parseFloat(ShipType.rate) : 0);
              }, 0  
          );
          const DiscountValue =
            bill.DiscountType === "VALUE"
              ? bill.DiscountValue
              : total * (parseFloat(bill.DiscountValue) / 100);

          //console.log(data);
          let customerName = "-";
          let billStatus = "-";
          let statusStyle = "-";
          let imageSlip;

          if (data.ShippingAddress) {
            if (data.ShippingAddress.Name) {
              customerName = data.ShippingAddress.Name;
            }
          }

          if (!isEmptyObject(data.Payment)) {
            if (data.Payment.BankAccount.type == "COD") {
              imageSlip = (
                <img
                  src="/assets/cod.png"
                  alt="cod"
                  onClick={e => {
                    //setmodalshow(true);
                    //viewSlip(true);
                    const imgPath = "/assets/cod.png";
                    viewSlip(imgPath, formatMoney(total + postalCharge - DiscountValue));

                    //setImageSlip(`${apiServer}/ci-api/${data.Payment.image}`);
                    //setModal(true);
                  }}
                />
              );
            } else {
              if (!isEmptyObject(data.Payment.image)) {
                imageSlip = (
                  <img
                    src={`${apiServer}/ci-api/${data.Payment.image}`}
                    alt={data.Payment.image}
                    onClick={e => {
                      //setmodalshow(true);
                      //viewSlip(true);
                      const imgPath = `${apiServer}/ci-api/${data.Payment.image}`;
                      viewSlip(imgPath, formatMoney(total + postalCharge - DiscountValue));

                      //setImageSlip(`${apiServer}/ci-api/${data.Payment.image}`);
                      //setModal(true);
                    }}
                  />
                );
              }
            }
          }

          switch (bill.BillStatus.toString()) {
            case "0.0": {
              billStatus = "ร่าง";
              statusStyle = "tag is-light"
              break;
            }
            case "0.1": {
              billStatus = "IN_CANCEL";
              statusStyle = "tag is-danger"
              break;
            }
            case "0.2": {
              billStatus = "ยกเลิก";
              statusStyle = "tag is-danger"
              break;
            }
            case "0.3": {
              billStatus = "RETURNED";
              statusStyle = "tag is-danger"
              break;
            }
            case "1.0": {
              billStatus = "รอชำระเงิน";
              statusStyle = "tag is-warning"
              break;
            }
            case "1.1": {
              billStatus = "ERROR_PAYMENT";
              statusStyle = "tag is-danger"
              break;
            }
            case "2.0": {
              billStatus = "รอที่อยู่จัดส่ง";
              statusStyle = "tag is-warning"
              // billStatus = "WAIT_FOR_ADDRESS";
              break;
            }
            case "2.1": {
              billStatus = "ERROR_ADDRESS";
              statusStyle = "tag is-danger"
              break;
            }
            case "3.0": {
              billStatus = "แจ้งชำระแล้ว";
              statusStyle = "is-primary"
              break;
            }
            case "4.0": {
              billStatus = "กำลังแพ็คสินค้า";
              statusStyle = "is-success"
              break;
            }
            case "5.0": {
              billStatus = "ส่งสินค้าแล้ว";
              statusStyle = "is-success"
              break;
            }
            default: {
              billStatus = "-";
              statusStyle = "-"
              break;
            }
          }

          /*
                        const customerName = data.ShippingAddress.Name
                          ? data.ShippingAddress.Name
                          : "-";*/
          return (
            <div key={idx} className="column is-one-third">
              <div className="card">
                <div className="card-content">
                  <div className="media">
                    {" "}
                    {/* <div className="media-left">
                                                          <figure className="image is-48x48">
                                                            <img src={bill.VLogo} alt={bill.VName} />
                                                          </figure>
                                                        </div> */}{" "}
                    <div className="media-content">
                      <p className={statusStyle + " title is-5 tag"}>{billStatus} </p>{" "}
                      {/* < p className = "title is-4" > Bill# {
                                    bill.BillNo
                                } < /p> */}{" "}
                      {/* <p className="subtitle is-6">{bill.VName}</p> */}{" "}
                    </div>{" "}
                  </div>
                  <div className="media">
                    <div className="media-content">
                      <div> วันที่: {moment(bill.BillDate).format("ll")} </div>{" "}
                      {/*<div> เลขที่: {bill.BillNo} </div>{" "}*/}
                      <div> รหัส: {bill.AgentCode} </div>{" "}
                      <div> ลูกค้า: {customerName} </div>{" "}
                      <div> สินค้า: {itemList} </div>{" "}
                      <div>
                        ยอดชำระ:{" "}
                        {formatMoney(total + postalCharge - DiscountValue)}
                      </div>{" "}
                      <div> หมายเหตุ: {data.SORefer ? data.SORefer+" |" : null} {bill.note !== "-" ? bill.note : null} </div>{" "}
                    </div>
                    <div className="media-right">
                      <figure className="image is-96x96" style={{ overflow: "hidden" }}>
                        {" "}
                        {imageSlip}{" "}
                      </figure>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>
                <footer className="card-footer">
                  {bill.BillStatus == "3.0" ? (
                    <NotifButton
                      name=""
                      isSuccess={(e) => {
                        return updateBillStatus(bill)
                      }}
                      billStatus={1.0}
                      buttonStyle="card-footer-item"
                      message="เปิดบิลสำเร็จ"
                      errorMessage="Product - Not found! []"
                    >
                    <a
                      href="#/"
                    >
                      <i class="fas fa-shipping-fast"></i> ออเดอร์ แพ็ค-ส่ง{" "}
                    </a>
                    </NotifButton>
                  ) : (
                    ""
                  )}
                  <Link
                    to={`/${bill.BillStatus < 0.1 ? "billedit" : "bill"}/${bill.BillNo}`}
                    className="card-footer-item"
                  >
                    <i class="fas fa-edit"></i> แก้ไข{" "}
                  </Link>{" "}
                </footer>{" "}
              </div>{" "}
            </div>
            
          );
        }catch{
          return (
            <div key={idx} className="column is-one-third">
              <div className="card">
                <div className="card-content">
                  <div className="media">
                    {" "}
                    {/* <div className="media-left">
                                                          <figure className="image is-48x48">
                                                            <img src={bill.VLogo} alt={bill.VName} />
                                                          </figure>
                                                        </div> */}{" "}
                    <div className="media-content">
                      <p className={"is-danger title is-5 tag"}>Error</p>{" "}
                      {/* < p className = "title is-4" > Bill# {
                                    bill.BillNo
                                } < /p> */}{" "}
                      {/* <p className="subtitle is-6">{bill.VName}</p> */}{" "}
                    </div>{" "}
                  </div>
                  <div className="media">
                    <div className="media-content">
                      <div></div>{" "}
                      <div></div>{" "}
                      <div></div>{" "}
                      <div>
                        ID {bill.BillNo}:{" "}
                      </div>{" "}
                      <div> error โปรดติดต่อทีมงานเพื่อตรวจสอบ:</div>{" "}
                    </div>
                    <div className="media-right">
                      <figure className="image is-96x96" style={{ overflow: "hidden" }}>
                        {" "}
                        {" "}
                      </figure>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>
                <footer className="card-footer">
                  {" "}
                </footer>{" "}
              </div>{" "}
            </div>
          )
          }
        })}{" "}
        
      
      </div>
      <div className="columns">
        <div className="column">
          <div className="field has-addons is-grouped-multiline">
            <div className="control">
              <div className="select">
                <select onChange={changeItemPerPage} value={itemPerPage}>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="250">250</option>
                  {/* <option value="500">500</option>
                  <option value="1000">ทั้งหมด</option> */}
                </select>{" "}
              </div>{" "}
            </div>
            <div className="control">
              <button  className="button is-static">{pagination.item_max ? "of " + pagination.item_max + " items" : null}</button>
            </div>
              <div  className="control">
                <button className="button" onClick={ () => {window.scrollTo(0,0); }}>
                  Back to top
                </button>
            </div >
          </div>
        </div>  
        <div className="column">
          <nav
            className="pagination is-right"
            role="navigation"
            aria-label="pagination"
          >
            {" "}
            <ul className="pagination-list"> {renderPageNumbers()} {pagination.page_max ? "of "+pagination.page_max+" pages" : null} </ul>{" "}
          </nav>{" "}
        </div>{" "}
      </div>{" "}
      <div>
        <ModalImage
          showHide={modalshow}
          modalImg={modalImage}
          setmodal={input => {
            setmodalshow(input);
          }}
          totalPrice={totalPrice}
        />{" "}
      </div>{" "}
      <button
        className="button is-block is-danger is-large is-fullwidth"
        onClick={handleLogout}
      >
        {" "}
        Logout{" "}
      </button>{" "}
    </div>
  </div>
  
  <NotificationContainer/>
  </PullToRefresh>
  );
}
