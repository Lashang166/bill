import React, { useState, useEffect } from "react";
import {
  searchAddressByAmphoe,
  searchAddressByDistrict,
  searchAddressByProvince,
  searchAddressByZipcode,
  splitAddress
} from "thai-address-database";
import SearchBox from "./SearchBox";
import NotifButton from "./NotifButton/NotifButton";
import { searchOldCustomer } from '../API';
import NotifTextArea from './NotifTextArea/NotifTextArea';

export default function BillActionPostalAddress({
  ShippingAddress,
  // setBillStatus,
  updateShippingAddress,
  isAdmin,
  lineNotif,
  SelectedShipType,
  Datachannel,
  totalAmount,
  replaceEmoji
}) {

  const [isSelectHelper, setIsSelectHelper] = useState(false);
  const [searchOldCust, setSearchOldCust] = useState("");
  const [searchAddress, setSearchAddress] = useState("");


  

  const [name, setName] = useState(
    ShippingAddress && ShippingAddress.Name ? ShippingAddress.Name : ""
  );
  const [address, setAddress] = useState(
    ShippingAddress && ShippingAddress.Address ? ShippingAddress.Address : ""
  );
  const [tambon, setTambon] = useState(
    ShippingAddress && ShippingAddress.SubDistrict
      ? ShippingAddress.SubDistrict
      : ""
  );
  const [amphur, setAmphur] = useState(
    ShippingAddress && ShippingAddress.District ? ShippingAddress.District : ""
  );
  const [province, setProvince] = useState(
    ShippingAddress && ShippingAddress.Province ? ShippingAddress.Province : ""
  );
  const [postCode, setPostCode] = useState(
    ShippingAddress && ShippingAddress.Postcode ? ShippingAddress.Postcode : ""
  );
  const [mobile, setMobile] = useState(
    ShippingAddress && ShippingAddress.Mobile ? ShippingAddress.Mobile : ""
  );

  useEffect(() => {
    validateInput();
  }, [name, address, tambon, amphur, province, postCode, mobile]);

  const [validated, setValidated] = useState(
    name !== "" &&
      address !== "" &&
      tambon !== "" &&
      amphur !== "" &&
      province !== "" &&
      postCode !== "" &&
      mobile !== ""
  );

  function validateInput() {
    /*console.log(
      `validateInput before : ${validated}, name : ${name}, mobile: ${mobile}, address: ${address}, tambon: ${tambon}, amphur: ${amphur}, province: ${province}, postCode: ${postCode}`
    );*/
    setValidated(
      (name !== "" &&
        address !== "" &&
        tambon !== "" &&
        amphur !== "" &&
        province !== "" &&
        postCode !== "" &&
        mobile !== "")
      ||
      (
        name !== "" &&
        mobile !== "" &&
        address !== "" &&
        postCode !== "" &&
        amphur !== "" &&
        province !== "" 
      )
    );
    /*console.log(
      `validateInput after : ${validated}, name : ${name}, mobile: ${mobile}, address: ${address}, tambon: ${tambon}, amphur: ${amphur}, province: ${province}, postCode: ${postCode}`
    );*/
  }

  // console.log("ShippingData", shippingData);
  // console.log('validated',validated, name, address, tambon, amphur, province, postCode, mobile);
  /*console.log(
    `validated : ${validated}, name : ${name}, mobile: ${mobile}, address: ${address}, tambon: ${tambon}, amphur: ${amphur}, province: ${province}, postCode: ${postCode}`
  );*/

  const formatSearchResult = data => {
    return (
      <div
        className="container"
        onClick={e => {
          setTambon(data.district);
          setAmphur(data.amphoe);
          setProvince(data.province);
          setPostCode(data.zipcode);
          setValidated(validated);  
        }}
      >
        {data.district}, {data.amphoe}, {data.province} {data.zipcode}
      </div>
    );
  };

  const formatSearchOldCustResult = data => {
    return (
      <div
        className="container"
        onClick={e => {
          setSearchOldCust("");
          setName(data.name);
          setMobile(data.phone);
          setAddress(data.address);
          //setTambon(data.district);
          setTambon("");
          setAmphur(data.amphur);
          setProvince(data.province);
          setPostCode(data.zipcode);
          setValidated(validated);
          setIsSelectHelper(false);
        }}
      >
        {data.name} , {data.phone} , {data.amphur} , {data.province} , {data.zipcode}
      </div>
    );
  }

  const onClickHelper = () =>{
    setIsSelectHelper(!isSelectHelper);
    
  }

  
  const onChangeSearchName = async (name, length) => {
    //setIsSearhing(true);
    
    
    let result = [];
    //setSearchOldCust(name);
    //console.log("SSS");
      
      let params = {
        //OldCustomer: "????????????"
        OldCustomer: name
      }
      if(name.length >= 2){
      await searchOldCustomer(params).then(result1 => {
        console.log(result1);
        if(result1.data.length > 0){
          for(var i = 0; i < length && i < result1.data.length; i++){
            result.push(result1.data[i]);
          }
          //result = result1.data;
        }
        else{
          result = [];
        }
      });
    }
    return result;
  }

  const onChangeAddressHelper = async address => {
    setSearchAddress(address);
    let splitAddressResult = await splitAddress(address);
    //console.log(result);
    let result = {message : "????????????????????????????????????????????????????????? ????????????????????????????????????????????????????????????????????????????????????", notifType : "warning"};
    if(splitAddressResult){
      setAddress(splitAddressResult.address);
      setSearchAddress("");
      setTambon(splitAddressResult.district);
      setAmphur(splitAddressResult.amphoe);
      setProvince(splitAddressResult.province);
      setPostCode(splitAddressResult.zipcode);
      setValidated(validated);
      setIsSelectHelper(false);
      result = {message : "????????????????????????????????????????????????", notifType : "success"};
    }
    return result;
  }

  const checkPostCodeWithSelectedShipType = () => {

    //alert(SelectedShipType);
    if(SelectedShipType === "10" && parseInt(postCode) > 14000 && Datachannel === "ONLINE"){
      return true;
    }


    return false;
  }

  return (
    <div className="my-padding-bottom">
      <div className="card" id="step2">
        <header className="card-header">
          <p className="card-header-title">?????????????????????????????????????????????????????????</p>
          {isAdmin ? <div
            //key={idx}
            style={{ cursor: "pointer", marginTop: "10px" }}
            
          >
            
            <i
              onClick={e => {
                onClickHelper();
              }}
            
              className={`my-padding-right far ${
                isSelectHelper
                  ? "fa-check-square has-text-success"
                  : "fa-check-square has-text-grey-light"
              }`}
            />
            ?????????????????????
          </div>
          : null}
          <a
            href="#top"
            className="card-header-icon"
            aria-label="more options"
            onClick={e => {
              e.preventDefault();
              setName("");
              setAddress("");
              setMobile("");
              setTambon("");
              setAmphur("");
              setProvince("");
              setPostCode("");
            }}
          >
            <span className="icon my-margin-right">
              <i className="fas fa-minus-circle" aria-hidden="true" />
            </span>
            ??????????????????????????????
          </a>
        </header>
        <div className="card-content">
          <div className="content">
            {isSelectHelper ? 
            <>
            <SearchBox
              delay={300}
              label="?????????????????????????????????????????????"
              name="AutoSearchOldCustomer"
              className={searchOldCust.trim() === "" ? "is-danger" : ""}
              value={searchOldCust}
              type="input"
              placeholder="????????????????????????????????????????????????????????????"
              onInputChange={async e => {
                //await onChangeSearchName(e.target.value);
                setSearchOldCust(replaceEmoji(e.target.value))
                
              }}
              searchFunction={onChangeSearchName}
              FormatResult={formatSearchOldCustResult}
              isNotSort={true}
            />
            <div className="field">
              <label className="label">???????????? ????????????????????????????????????????????????????????????</label>
              <div className="control">
                <NotifTextArea
                  delay={500}
                  rowsNumber={2}
                  placeholder="???????????????????????????????????????????????????????????????????????????"
                  /*handelOnChange={e => {
                    //setSearchAddress(e.target.value);
                    onChangeAddressHelper(e.target.value);
                  }}*/
                  handelOnChange={onChangeAddressHelper}
                  text={searchAddress}
                />
                {/*<textarea
                  rowsNumber="2"
                  class="textarea"
                  
                  //type="textbox"
                  value={searchAddress}
                  onChange={e => {
                    //setSearchAddress(e.target.value);
                    onChangeAddressHelper(e.target.value);
                  }}
                  placeholder="???????????????????????????????????????????????????????????????????????????"
                />*/}
                
              </div>
            </div>
            </>
            : null}
            <div className="field">
              <label className="label">????????????-?????????????????????</label>
              <div className="control">
                <input
                  className={`input ${name.trim() === "" ? "is-danger" : ""}`}
                  type="text"
                  value={name}
                  onChange={e => {
                    setName(replaceEmoji(e.target.value));
                  }}
                  placeholder="????????????-???????????????????????????????????????"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">?????????????????????????????????</label>
              <div className="control">
                <input
                  className={`input ${mobile.trim() === "" ? "is-danger" : ""}`}
                  value={mobile}
                  onChange={e => {
                    //setMobile(e.target.value);
                    setMobile(replaceEmoji(e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')));
                  }}
                  type="tel"
                  placeholder="????????????????????????????????????????????????????????????????????????????????????"
                  //inputProps = {{maxLength:12}}
                  maxlength="12"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">?????????????????????</label>
              <div className="control">
                <input
                  className={`input ${
                    address.trim() === "" ? "is-danger" : ""
                  }`}
                  type="text"
                  value={address}
                  onChange={e => {
                    setAddress(replaceEmoji(e.target.value));
                  }}
                  placeholder="?????????????????? ????????? ?????????"
                />
              </div>
            </div>
            {tambon.length > 0 ? (
              <SearchBox
                label="????????????"
                name="tambon"
                className={tambon.trim() === "" ? "is-danger" : ""}
                value={tambon}
                placeholder="???????????????????????????????????? ????????????"
                onInputChange={e => {
                  setTambon(replaceEmoji(e.target.value));
                }}
                searchFunction={searchAddressByDistrict}
                FormatResult={formatSearchResult}
              />
            ) : null}

            {amphur.length > 0 ? (
              <SearchBox
                label="???????????????"
                className={amphur.trim() === "" ? "is-danger" : ""}
                name="amphur"
                value={amphur}
                placeholder="???????????????????????????????????? ???????????????"
                onInputChange={e => {
                  setAmphur(replaceEmoji(e.target.value));
                }}
                searchFunction={searchAddressByAmphoe}
                FormatResult={formatSearchResult}
              />
            ) : null}

            {province.length > 0 ? (
              <SearchBox
                label="?????????????????????"
                className={province.trim() === "" ? "is-danger" : ""}
                name="province"
                value={province}
                placeholder="???????????????????????????????????? ?????????????????????"
                onInputChange={e => {
                  setProvince(replaceEmoji(e.target.value));
                }}
                searchFunction={searchAddressByProvince}
                FormatResult={formatSearchResult}
              />
            ) : null}
            <SearchBox
              label="????????????????????????????????????"
              name="postcode"
              className={postCode.trim() === "" ? "is-danger" : ""}
              value={postCode}
              type="tel"
              placeholder="????????????????????????????????????????????????????????????"
              onInputChange={e => {
                setPostCode(replaceEmoji(e.target.value));
              }}
              searchFunction={searchAddressByZipcode}
              FormatResult={formatSearchResult}
            />
          </div>
        </div>
        {validated ? (
          <footer className="card-footer">
            <NotifButton
              name=""
              isSuccess={async (e) => {
                //let isSuccess = await openBill(e);
                //console.log(isSuccess);
                //e.preventDefault();

                if(checkPostCodeWithSelectedShipType()){

                  updateShippingAddress({
                    Name: name,
                    Address: address,
                    SubDistrict: tambon,
                    District: amphur,
                    Province: province,
                    Postcode: postCode,
                    Mobile: mobile
                  }, "1.0")

                  return {message : "??????????????????????????????????????? ?????????????????????????????????????????????????????????/????????????????????? ??????????????????????????????????????????????????????????????????", isSuccess : false, type : "error"}
                }
                
                
                
                updateShippingAddress({
                  Name: name,
                  Address: address,
                  SubDistrict: tambon,
                  District: amphur,
                  Province: province,
                  Postcode: postCode,
                  Mobile: mobile
                }, "3.0")
                
                window.scrollTo(0, 0);
                lineNotif(name, totalAmount);
                return {message : "??????????????????????????????????????????????????????", isSuccess : true};
              }}
              billStatus={1.0}
              buttonStyle="card-footer-item"
              message="??????????????????????????????????????????????????????"
              //errorMessage=""
            >
            <a
              //href="#t"
              className=""
              /*onClick={e => {
                e.preventDefault();
                updateShippingAddress({
                  Name: name,
                  Address: address,
                  SubDistrict: tambon,
                  District: amphur,
                  Province: province,
                  Postcode: postCode,
                  Mobile: mobile
                });
              }}*/
            >
              <i class="far fa-check-circle"></i>{' '}
              ??????????????????
            </a>
            </NotifButton>
          </footer>
        ) : null}
      </div>
    </div>
  );
}
