/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import formatMoney from "../lib/FormatMoney";
//import axios from "axios";
import store from "store";
import { NONAME } from "dns";
import { searchProduct2, apiServerImg } from "../API";

/*const apiServer = "https://www.i-sabuy.com";

axios.defaults.headers.common["Content-Type"] = "application/json";
//axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

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

export default function BillItems({ items, setBillItems, UpdateCOD, COD, setCOD, updateCODAndItem }) {
  const [billitems, setbillitem] = useState(items);
  const [editBill, setEditBill] = useState(false);
  const [token, setToken] = useState("");
  const [searchdata, setSearchData] = useState("");
  const [searchitems, setSearchItems] = useState([]);
  const [choosesku, setChoosesku] = useState("");
  const [isDisplayHasAmount, setIsDisplayHasAmount] = useState(false);
  const [displayAmount, setDisplayAmount] = useState(0);

  //console.log("items = ", items);
  //console.log("searchItems = ", searchitems);
  //console.log(apiServerImg);

  useEffect(() => {
    const userInfo = store.get("user");
    setToken(userInfo.amtk);
    //console.log("user = " + userInfo.amtk);
  }, []);

  useEffect(() => {
    if (searchdata.length >= 1) {
      const params = {
          keyword : searchdata
      }
      //axios.get(`https://i-sabuy.com/warehouse/api/product/search?keyword=${searchdata}`)
      searchProduct2(searchdata)
        .then(result => {
          setSearchItems(result.data.data);
        })
        .catch(e => {
          //console.log("Error updating", e);
        });
    }
  }, [searchdata]);

  const changePrice = (i, event) => {
    //console.log("change = " + event.target.value);

    //if (!isNaN(event.target.value) && event.target.value) {
    //const newValue = event.target.value;
   

    let newValue = billitems.map((item, _idx) => {
      if (_idx !== i) return item;

      return {
        ...item,
        PricePerUnit: event.target.value
      };
    });

    setbillitem(newValue);
    if(COD != 0){
      
      ///UpdateCOD(COD + parseFloat(event.target.value) - billitems[i].PricePerUnit);
      updateCODAndItem(newValue, COD + (parseFloat(event.target.value)*billitems[i].Amount) - (billitems[i].PricePerUnit*billitems[i].Amount));
    }else{
      setBillItems(newValue);
    }
    //}
  };

  const changeQty = (i, event) => {

    //if (!isNaN(event.target.value) && event.target.value) {
    //const newValue = event.target.value;

    let newValue = billitems.map((item, _idx) => {
      if (_idx !== i) return item;

      return {
        ...item,
        Amount: event.target.value
      };
    });
    setbillitem(newValue);

    if(COD != 0){
      
      ///UpdateCOD(COD + parseFloat(event.target.value) - billitems[i].PricePerUnit);
      updateCODAndItem(newValue, COD 
        + (parseFloat(billitems[i].PricePerUnit)*event.target.value) 
        - (parseFloat(billitems[i].PricePerUnit)*parseFloat(billitems[i].Amount)));
    }else{
      setBillItems(newValue);
    }
    //setBillItems(newValue);
    
    //}
  };

  const oneClick = item => {
    //console.log("doubleClick = " , item);
    console.log(`${apiServerImg}${item.ProductImageUrl.thumb}`);
    if (item.SKU === choosesku) {
      let newItem = {
        Amount: 1,
        Description: item.Title,
        PricePerUnit: item.PricePerUnit,
        SKU: item.SKU,
        UnitName: "",
        total: item.PricePerUnit,
        image: `${apiServerImg}${item.ProductImageUrl.thumb}`
      };
      setbillitem([...billitems, newItem]);
      setBillItems([...billitems, newItem]);

      setEditBill(false);
    } else {
      setChoosesku(item.SKU);
    }
  };

  const deleteItem = (inputItem, idx) => {
    const newValue = billitems.filter((item, idx) => {
      if (item.SKU !== inputItem.SKU) {
        return item;
      }
    });
    setbillitem(newValue);
    setBillItems(newValue);
  };

  const focusItem = e => {
    e.currentTarget.select();
  };

  const changeDisplayItems = e => {
    //alert(isDisplayHasAmount);
    //alert(dispatchEvent);
    setIsDisplayHasAmount(!isDisplayHasAmount);
    setDisplayAmount(isDisplayHasAmount ? 0 : -1);
  }

  return (
    <div className="my-padding">
      <div>
        <strong> รายการสินค้า </strong>{" "}
      </div>{" "}
      {billitems.map((item, idx) => {
        
        return (
          <div key={idx} className="columns is-mobile">
            {" "}
            <div className="column is-3">
              <div className="image is-64x64">
                <button
                  className="delete is-small"
                  onClick={() => {
                    deleteItem(item, idx);
                  }}
                  style={{ position: "absolute" }}
                />
                <img src={item.image} alt="item.SKU" />
              </div>

              {/*}
              <div className="card" style={{ boxShadow: "none" }}>
                <div className="image is-64x64">
                  <img src={item.image} alt={item.SKU} />
                </div>
                <div className="is-overlay">
                  <span
                    className="tag is-small"
                    style={{
                      cursor: "pointer",
                      backgroundColor: "transparent"
                    }}
                    onClick={() => {
                      deleteItem(item, idx);
                    }}
                  >
                    <i className="fas fa-trash-alt"> </i>
                  </span>
                </div>
              </div>
              {*/}
            </div>
            {/* ProductName */}
            <div className="column">
              <div>
                {" "}
                {item.Description} <br />[{item.SKU}]
              </div>
            </div>
            <div className="column is-3 has-text-right">
              <p className="control has-icons-left ">
                <input type="number"
                  className="input is-small is-pulled-right has-text-right"
                  value={item.PricePerUnit}
                  onChange={e => {
                    changePrice(idx, e);
                  }}
                  onFocus={e => {
                    focusItem(e);
                  }}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-tags" />
                </span>
              </p>
              <p className="control has-icons-left">
                <input type="number"
                  className="input is-small is-pulled-right has-text-right"
                  value={item.Amount}
                  onChange={e => {
                    changeQty(idx, e);
                  }}
                  onFocus={e => {
                    focusItem(e);
                  }}
                  style={{ marginTop: "3px" }}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-sort-numeric-down" />
                </span>
              </p>
              <span className="is-pulled-right">
                {formatMoney(
                  parseFloat(item.Amount) * parseFloat(item.PricePerUnit)
                )}
                บาท{" "}
              </span>
            </div>
          </div>
        );
      })}
      {!editBill ? (
        <a
          className="button is-success is-rounded is-small-mobile is-fullwidth"
          onClick={() => setEditBill(true)}
          style={{ marginTop: "10px" }}
        >
          <i className="fas fa-plus"> </i> &nbsp; เพิ่มสินค้า
        </a>
      ) : (
        <a
          className="button is-warning is-rounded is-small-mobile is-fullwidth"
          onClick={() => setEditBill(false)}
          style={{ marginTop: "10px" }}
        >
          <i className="fas fa-times"> </i> &nbsp; ยกเลิก
        </a>
      )}{" "}
      {editBill ? (
        <div className="field is-grouped">
          <br />
          <div className="control is-expanded my-padding">
          <input
            className="input"
            value={searchdata}
            onChange={e => {
              setSearchData(e.target.value);
            }}
            placeholder="ค้นหา"
          />{" "}
          </div>
          <div className="control my-padding" style={{ margin: "5px" }}>
            <i
              onClick={e => {
                changeDisplayItems();
              }}
            
              className={`my-padding-right far ${
                isDisplayHasAmount
                  ? "fa-check-square has-text-success"
                  : "fa-check-square has-text-grey-light"
              }`}
            />All
            </div>
        </div>
      ) : null}
      {editBill ? (
        <div className="columns is-multiline is-mobile is-gapless">
          {" "}
          {searchitems.filter(item => item.InStock > displayAmount).map((searchitem, idx) => {
            let imgUrl = `${apiServerImg}${searchitem.ProductImageUrl.thumb}`;
            return (
              <div
                key={idx}
                className={
                  searchitem.SKU === choosesku
                    ? "column is-one-quarter has-text-centered has-background-primary"
                    : "column is-one-quarter has-text-centered"
                }
                onClick={() => {
                  oneClick(searchitem);
                }}
              >
                <div
                  className="image container is-64x64"
                  style={{ marginTop: "5px" }}
                >
                  {" "}
                  <img src={imgUrl} alt="" />{" "}
                </div>{" "}
                <p className="is-size-7	has-text-centered"> {searchitem.SKU} ({searchitem.InStock})</p>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
