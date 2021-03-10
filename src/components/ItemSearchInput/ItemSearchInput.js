import React, { useState, useMemo, useEffect } from 'react';
import { searchProduct2, apiServerImg, getSelectProduct, updateSelectProduct } from "../../API";
import { AlertDotIcon } from '../AllSvgIcon';
import { useHistory } from "react-router-dom";
import store from "store";

const ItemSearchInput = ({ 
    setSelectItem, 
    initialProducts,
    setPID,
    PID
}) => {

    const history = useHistory();

    const user = store.get("user");

    const [productName, setProductName] = useState("");
    const [searchdata, setSearchData] = useState([]);
    const [choosesku, setChoosesku] = useState("");
    const [isSelected, setIsSelected] = useState(true);

    const displayAmount = 0;

    useEffect(async () => {

        if(PID){
            let params = {
                amcode : user.amcode,
                PID : PID,
            }
            await initialProducts(params);
            setPID(PID)
            setSelectItem({item : "SS"});
        }
    }, [])


    const onClickSearchProduct = item => {
        //console.log("doubleClick = " , item);
        if (item.SKU === choosesku) {
         
            setIsSelected(false);
            setPID(item.PID)

            let params = {
                amcode : user.amcode,
                PID : item.PID,
            }

            history.replace(`/productList/editsalepage/${item.PID}`);
            

            getSelectProduct(params).then(result => {
                

                if(result.data.data[0].pr_longdesc === null){
                    // alert("SSS");
                    let updateParams = {
                        "pid": item.PID,  
                        // pr_longdesc : 'social-3333:{}',  
                        "pr_longdesc" : {
                            "social": {
                                "line": {
                                    "link": "",
                                    "buttonText": "",
                                },
                                "facebook": {
                                    "link": "",
                                    "buttonText": "",
                                },
                                "phone": {
                                    "link": "",
                                    "buttonText": ""
                                }
                            },
                            "description": [
                                {
                                    "line": ""
                                },
                                {
                                    "line": ""
                                },
                                {
                                    "line": ""
                                },
                                {
                                    "line": ""
                                },
                                {
                                    "line": ""
                                }
                            ],
                            "productName": "",
                            "imageSlide": [
                                {
                                    "image": ""
                                },
                                {
                                    "image": ""
                                },
                                {
                                    "image": ""
                                },
                                {
                                    "image": ""
                                },
                                {
                                    "image": ""
                                },
                                {
                                    "image": ""
                                },
                                {
                                    "image": ""
                                },
                                {
                                    "image": ""
                                }
                            ],
                            "sale": {
                                "fullPrice": "",
                                "salePrice": "",
                                "amount": "",
                                "discountPercent": "",
                                "saledAmount": ""
                            },
                            "flashSale": {
                                "active": 1,
                                "countDownTime": "1"
                            },
                            "payment": [
                            {
                                "type": "จัดส่งฟรี",
                                "active": true
                            },
                            {
                                "type": "เก็บเงินปลายทาง",
                                "active": true
                            },
                            {
                                "type": "โอนเงิน",
                                "active": true
                            }
                            ],
                            "courier": [],
                            "chooseProduct": [{
                                selectProductName2 : [{
                                    selectProduct2 : ""
                                }],
                                ChildSKU : 0
                            }],
                            // "id": 1,
                            "editor": {
                                "time": undefined,
                                "blocks": [],
                                "version": "2.18.0"
                            },
                            "shipTypes": [],
                            "googleTagCode": undefined,
                            "lineToken": undefined,
                            "active" : 0
                        }
                    }
                    // setSelectItem(params);

                    // alert("New Initial")
                    updateSelectProduct(updateParams).then(result => {
                        
                        // initialProducts(params);
                        // setSelectItem(item);
                        window.location.reload();
                    })
                }
                else{
                    // setSelectItem(result.data.data[0].pr_longdesc);
                    // initialProducts(params);
                    // setSelectItem(item);
                    window.location.reload();
                }
            }) 
            

            setProductName(item.Title);


            // https://i-sabuy.xyz/warehouse/api/product/get?pid=764

        } else {
          setChoosesku(item.SKU);
        }
    };

    const onProductNameChange = (event) => {
    setProductName(event.target.value)
    searchProduct2(event.target.value)
        .then(result => {
            setSearchData(result.data.data);
            setIsSelected(true);
        })
        .catch(e => {
            //console.log("Error updating", e);
        });
    }

    return (
        <>
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">ค้นหาสินค้า</label>
                </div>
                <div class="field-body">
                    <div class="field">
                    <div class="control">
                        <input 
                            class="input" 
                            type="text" 
                            value={productName} 
                            onChange={(event) => {onProductNameChange(event)}}
                            placeholder="กรอกชื่อสินค้าหรือรหัสสินค้า  (เชื่อมระบบหลัก)"
                        />
                    </div>
                    <div className="columns is-multiline is-mobile" style={{ marginTop: "5px"}}>
                    {isSelected && searchdata.length > 0 ? searchdata.filter(item => item.InStock > displayAmount).map((searchitem, idx) => {
                        let imgUrl = `${apiServerImg}${searchitem.ProductImageUrl.thumb}`;
                        return (
                            <div
                                key={idx}
                                className={
                                searchitem.SKU === choosesku
                                    ? "column is-narrow has-text-centered has-background-primary"
                                    : "column is-narrow has-text-centered"
                                }
                                
                                onClick={() => {
                                    onClickSearchProduct(searchitem);
                                }}
                            >
                                <div
                                    className="image container is-64x64"
                                    style={{ marginTop: "5px"}}
                                >
                                    {" "}
                                    <img src={imgUrl} alt="" />{" "}
                                </div>{" "}
                                <p className="is-size-7	has-text-centered"> {searchitem.SKU} ({searchitem.InStock})</p>
                            </div>
                        );
                    }) : null}
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ItemSearchInput;