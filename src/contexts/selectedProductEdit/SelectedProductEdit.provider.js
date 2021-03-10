import React, { useState } from 'react';
import SelectedProductEditContext from './SelectedProductEdit.context';
import { getLocalState, setLocalState } from '../../helper/localStorage';
import {updateSelectProduct, getSelectProduct, getbill2} from '../../API';
import fakeData from "../../fake-data-salePage.json";
import { ProductsCol } from '../../containers/Products/Products.style';
import { AlertDotIcon } from '../../components/AllSvgIcon';


export const SelectedProductEditProvider = (props) => {

  //initial data

  const fakeDataTemp = fakeData;
  
  //const [products, setProducts] = useState(fakeDataTemp.products2[0].data);
  const [products, setProducts] = useState();
  const [PID, setPID] = useState();

  const selectProduct2Template = {"selectProduct2" : "", "ChildPrice": "", "ChildStock": "", "ChildSKU": ""};    

    
  const initialProducts = async (params) => {
    //tempProducts = (await getSelectProduct()).data.data
    //setProducts((await getSelectProduct()).data.data);
      console.log("params-----params------params");
      console.log(params);
    return getSelectProduct(params).then(result => {

      if(result.data.data[0].pr_longdesc === null){
        return "error";
      }

      console.log("result.data.data[0].pr_longdesc--");
      console.log(result.data.data[0].pr_longdesc);
      // '{"pid":"5432","pgrpid":"5","retail":"4490.00","prod_sku":"70P","pr_cat":"1","pr_desc":"โต๊ะเขียนหนังสือ รุ่นประหยัดสีชมพู","pr_longdesc":"{"social":{"line":[],"facebook":[],"phone":[]},"description":[{"line":""},{"line":""},{"line":""},{"line":""},{"line":""}],"productName":"","imageSlide":[{"image":""},{"image":""},{"image":""},{"image":""},{"image":""},{"image":""},{"image":""},{"image":""}],"sale":{"fullPrice":"100","salePrice":"1000-20000","amount":50,"discountPercent":"1","saledAmount":"100"},"flashSale":{"active":1,"countDownTime":"1"},"payment":[{"type":"เก็บเงินปลายทาง","active":true},{"type":"โอนเงิน","active":true}],"courier":[],"chooseProduct":[],"editor":{"blocks":[],"version":"2.18.0"},"shipTypes":[]}","pr_title":"70สีชมพู","Cost":"6999.00","POcost":"36","stk_org":"0"}'
      let tempProduct = JSON.parse(result.data.data[0].pr_longdesc);
      // let tempProduct = JSON.parse('{}');
      console.log("tempProduct----");
      console.log(tempProduct);
      if(!tempProduct.shipTypes || tempProduct.shipTypes.length === 0){
        getbill2().then(billResult => {
          
          tempProduct = {
            ...tempProduct,
            shipTypes : billResult.data.data.data.ShipTypes
          }

          setProducts(tempProduct);
          return "success";
        });
        
      }
      else{
        setProducts(tempProduct);
        return "success";
      }
    })
    
    //setProducts((await getSelectProduct()).data.selectProduct);
  }
  
  const updateProductName = (event) => {
    products.productName = event.target.value;
    
    console.log("products----");
    console.log(products);
    setProducts({...products});
    
    updateSelectProduct({ "pr_longdesc" : products, "pid": PID});
    // updateSelectProduct(products)
  }
  
  const updateSalePrice = (event) => {
    products.sale.salePrice = event.target.value;
    
    setProducts({...products});
    // updateSelectProduct(products)
    updateSelectProduct({ "pr_longdesc" : products, "pid": PID});
  }

  const updateFullPrice = (event) => {
    products.sale.fullPrice = event.target.value;
    
    setProducts({...products});
    // updateSelectProduct(products)
    updateSelectProduct({ "pr_longdesc" : products, "pid": PID});
  }

  const updateDiscountPercent = (event) => {
    products.sale.discountPercent = event.target.value;
    
    setProducts({...products});
    // updateSelectProduct(products)
    updateSelectProduct({ "pr_longdesc" : products, "pid": PID});
  }

  
  const updateCountDownTime = (event) => {
    products.flashSale.countDownTime = event.target.value;
    
    setProducts({...products});
    // updateSelectProduct(products)
    updateSelectProduct({ "pr_longdesc" : products, "pid": PID});
  }

  const updateDescriptionByIndex = (event, index) => {
    products.description[index] = {
      line : event.target.value,
    }
    
    
    setProducts({...products});
    // updateSelectProduct(products)
    updateSelectProduct({ "pr_longdesc" : products, "pid": PID});
  }


  const addDescriptionLine = (event) => {
    if(products.description.length < 5){
      products.description.push({line : ""});
      setProducts({...products});
      // updateSelectProduct(products)
      updateSelectProduct({ "pr_longdesc" : products, "pid": PID});
    }
    
  }

  const removeDescriptionLineByIndex = (event, index) => {
    products.description.splice(index, 1);
    
    setProducts({...products});
    // updateSelectProduct(products)
    updateSelectProduct({ "pr_longdesc" : products, "pid": PID});
  }


  const updateSlideImage = (img, index) => {
    products.imageSlide[index] = {
      image : img,
    }
    setProducts({...products});

    console.log(PID);
    console.log(products);
    // updateSelectProduct(products)
    updateSelectProduct({ "pr_longdesc" : products, "pid": PID}).then(result => {

      console.log("RESULT----");
      console.log(result);
    }).catch(err => {
      console.log(err);
    });
  }

  const deleteSlideImage = (index) => {
    products.imageSlide[index] = {
      image : "",
    }
    setProducts({...products});
    // updateSelectProduct(products)
    updateSelectProduct({ "pr_longdesc" : products, "pid": PID});
  }

  const updateLine = (event) => {
    
    products.social.line.link = event.target.value;
    
    setProducts({...products});
    // updateSelectProduct(products)
    updateSelectProduct({ "pr_longdesc" : products, "pid": PID});
  }


  const updatePhone = (event) => {
    
    products.social.phone.link = event.target.value;
    
    setProducts({...products});
    // updateSelectProduct(products)
    updateSelectProduct({ "pr_longdesc" : products, "pid": PID});
  }

  const updateFacebook = (event) => {
    
    products.social.facebook.link = event.target.value;
    
    setProducts({...products});
    // updateSelectProduct(products);
    updateSelectProduct({ "pr_longdesc" : products, "pid": PID});
  }

  const resetShipTypes = () => {
    getbill2().then(billResult => {
      
      let tempProduct = {
        ...products,
        shipTypes : billResult.data.data.data.ShipTypes
      }
      setProducts(tempProduct);
      // updateSelectProduct(tempProduct);
      updateSelectProduct({ "pr_longdesc" : products, "pid": PID});
    });
  }

  const deleteShipTypeByIndex = (index) => {

    products.shipTypes.splice(index, 1);

    setProducts({...products});
    // updateSelectProduct(products);
    updateSelectProduct({ "pr_longdesc" : products, "pid": PID});
  }

  //-----------------------------------------------------------------------
  const updateParentName = (event) => {
    

    for(let i = 0; i < products.chooseProduct.length; i++){
      products.chooseProduct[i] = {
        ...products.chooseProduct[i],
        ParentName : event.target.value
      }
    }
    setProducts({...products});
    // updateSelectProduct(products)
    updateSelectProduct({ "pr_longdesc" : products, "pid": PID});
  }

  const updateChildName = (event) => {

    for(let i = 0; i < products.chooseProduct.length; i++){
      products.chooseProduct[i] = {
        ...products.chooseProduct[i],
        ChildName : event.target.value
      }
    }
    setProducts({...products});
    // updateSelectProduct(products)
    updateSelectProduct({ "pr_longdesc" : products, "pid": PID});
  }

  const addSelectedProduct1 = (event) => {
    
    //products[index] = { ...products[index], selectProductName1 : event.target.value };

    console.log("tempProduct-----");
    console.log(products);
    let tempProduct = {
      ...products.chooseProduct[0],
      "selectProductName1": "",
      "image": "",
      "ParentPrice": "",
      "ParentStock": "",
      "ParentSKU": "",
      "selectProductName2": []
    }

    tempProduct.selectProductName2 = products.chooseProduct[0].selectProductName2.map((product2, key) => {
      
      return {...selectProduct2Template, "selectProduct2": product2.selectProduct2};
    })
    products.chooseProduct.push({...tempProduct});
    setProducts({...products});
    // updateSelectProduct(products)
    updateSelectProduct({ "pr_longdesc" : products, "pid": PID});
    
  }

  const updateSelectedProduct1ByIndex1 = (event, index) => {
    
    products.chooseProduct[index] = { 
      ...products.chooseProduct[index], 
      selectProductName1 : event.target.value 
    };
    setProducts({...products});
    // updateSelectProduct(products)
    updateSelectProduct({ "pr_longdesc" : products, "pid": PID});
  }

  const removeSelectedProduct1 = (event, index) => {
    
    if(products.chooseProduct.length !== 1){
      products.chooseProduct.splice(index, 1);
    }
    setProducts({...products});
    // updateSelectProduct(products)
    updateSelectProduct({ "pr_longdesc" : products, "pid": PID});
  }

  //Function for selected 2
  const addSelectedProduct2 = (event) => {
    
    for( let i = 0; i < products.chooseProduct.length; i++){
      if(products.chooseProduct[i].ChildSKU === 0){
        products.chooseProduct[i] = {
          ...products.chooseProduct[i],
          ChildSKU : 1
        }
      }else {
        products.chooseProduct[i].selectProductName2.push(selectProduct2Template);
      }
      
    }
    console.log("products------")
    console.log(products)
    
    setProducts({...products});
    // updateSelectProduct(products)
    updateSelectProduct({ "pr_longdesc" : products, "pid": PID});
  }

  const updateSelectedProduct1ByIndex2 = (event, index) => {

    for( let i = 0; i < products.chooseProduct.length; i++){
      products.chooseProduct[i].selectProductName2[index].selectProduct2 = event.target.value
    }

    setProducts({...products});
    // updateSelectProduct(products)
    updateSelectProduct({ "pr_longdesc" : products, "pid": PID});
  }

  const removeSelectedProduct2 = (event, index) => {
    
    for( let i = 0; i < products.chooseProduct.length; i++){
      if(products.chooseProduct[i].selectProductName2.length === 1){
        products.chooseProduct[i] = {
          ...products.chooseProduct[i],
          ChildSKU : 0,
          ChildName : "",
          "ParentPrice": "",
          "ParentStock": "",
          "ParentSKU": "",
          "selectProductName2": [
            {
              "selectProduct2": "",
              "ChildPrice": "",
              "ChildStock": "",
              "ChildSKU": ""
            }
          ]
        }
      }
      if(products.chooseProduct[i].selectProductName2.length !== 1){
        products.chooseProduct[i].selectProductName2.splice(index, 1);
      }
    }
    

    setProducts({...products});
    // updateSelectProduct(products)
    updateSelectProduct({ "pr_longdesc" : products, "pid": PID});
  }

  //Update product details by Index
  //update Price in selectProdct2 by index
  const updatePriceByindex = (event, index1, index2) => {
    
    if(index2 % products.chooseProduct[0].selectProductName2.length === 0){
      products.chooseProduct[index1] = {
        ...products.chooseProduct[index1],
        ParentPrice : event.target.value,
      }
    }

    
    let selectProductName2Temp = products.chooseProduct[index1].selectProductName2;

    selectProductName2Temp[index2] = {
      ...selectProductName2Temp[index2],
      ChildPrice : event.target.value,
    }

    products.chooseProduct[index1] = { 
      ...products.chooseProduct[index1], 
      selectProductName2 : [
        ...selectProductName2Temp
      ]
    };
    setProducts({...products});
    // updateSelectProduct(products)
    updateSelectProduct({ "pr_longdesc" : products, "pid": PID});
  }

  //update Stock by index
  const updateStockByindex = (event, index1, index2) => {
    if(index2 % products.chooseProduct[0].selectProductName2.length === 0){
      products.chooseProduct[index1] = {
        ...products.chooseProduct[index1],
        ParentStock : event.target.value,
      }
    }

    
    let selectProductName2Temp = products.chooseProduct[index1].selectProductName2;

    selectProductName2Temp[index2] = {
      ...selectProductName2Temp[index2],
      ChildStock : event.target.value,
    }

    products.chooseProduct[index1] = { 
      ...products.chooseProduct[index1], 
      selectProductName2 : [
        ...selectProductName2Temp
      ]
    };
    setProducts({...products});
    // updateSelectProduct(products)
    updateSelectProduct({ "pr_longdesc" : products, "pid": PID});
  }

  //update SKU by index
  const updateSKUByindex = (event, index1, index2) => {
    if(index2 % products.chooseProduct[0].selectProductName2.length === 0){
      products.chooseProduct[index1] = {
        ...products.chooseProduct[index1],
        ParentSKU : event.target.value,
      }
    }

    
    let selectProductName2Temp = products.chooseProduct[index1].selectProductName2;

    selectProductName2Temp[index2] = {
      ...selectProductName2Temp[index2],
      ChildSKU : event.target.value,
    }

    products.chooseProduct[index1] = { 
      ...products.chooseProduct[index1], 
      selectProductName2 : [
        ...selectProductName2Temp
      ]
    };
    setProducts({...products});
    // updateSelectProduct(products)
    updateSelectProduct({ "pr_longdesc" : products, "pid": PID});
  }

  const updateImage = (img, index) => {
    products.chooseProduct[index] = {
      ...products.chooseProduct[index],
      image : img,
    }
    setProducts({...products});
    // updateSelectProduct(products)
    updateSelectProduct({ "pr_longdesc" : products, "pid": PID});
  }

  const deleteSelectedImage = (index) => {
    products.chooseProduct[index] = {
      ...products.chooseProduct[index],
      image : "",
    }
    setProducts({...products});
    // updateSelectProduct(products)
    updateSelectProduct({ "pr_longdesc" : products, "pid": PID});
  }
    
  const updateEditorData = (data) => {
    products.editor = data;
    
    //setProducts({...products});
    // updateSelectProduct(products)
    updateSelectProduct({ "pr_longdesc" : products, "pid": PID});
  }

  const updateSaledAmount = event => {

    products.sale.saledAmount = event.target.value;
    
    console.log("products ------updateSaledAmount");
    console.log(products);
    setProducts({...products});
    updateSelectProduct({ "pr_longdesc" : products, "pid": PID});
    // updateSelectProduct(products);
  }

  const selectPaymentMethod = (index) => {
    products.payment[index].active = !products.payment[index].active;


    setProducts({...products});
    // updateSelectProduct(products);
    updateSelectProduct({ "pr_longdesc" : products, "pid": PID});
  }

  const updateLineButtonText = (event) => {

    products.social.line.buttonText = event.target.value;

    console.log("products----------");
    console.log(products);
    setProducts({...products});
    // updateSelectProduct(products);
    updateSelectProduct({ "pr_longdesc" : products, "pid": PID});
  }


  const updateFacebookButtonText = (event) => {

    products.social.facebook.buttonText = event.target.value;

    setProducts({...products});
    // updateSelectProduct(products);
    updateSelectProduct({ "pr_longdesc" : products, "pid": PID});
  }


  const updatePhoneButtonText = (event) => {

    products.social.phone.buttonText = event.target.value;

    setProducts({...products});
    // updateSelectProduct(products);
    updateSelectProduct({ "pr_longdesc" : products, "pid": PID});
  }

  const updateGoogleTagCode = (event) => {

    products.googleTagCode = event.target.value;

    setProducts({...products});
    // updateSelectProduct(products);
    updateSelectProduct({ "pr_longdesc" : products, "pid": PID});
  }

  const updateLineToken = (event) => {

    products.lineToken = event.target.value;

    setProducts({...products});
    // updateSelectProduct(products);
    updateSelectProduct({ "pr_longdesc" : products, "pid": PID});
  }

  const updateActive = (event, active) => {
    products.active = (active+1)%2;


    setProducts({...products});
    updateSelectProduct({ "pr_longdesc" : products, "pid": PID});
  }
    
  return (<SelectedProductEditContext.Provider value={{
    initialProducts,
    addSelectedProduct1,
    removeSelectedProduct1,
    updateSelectedProduct1ByIndex1,
    addSelectedProduct2,
    removeSelectedProduct2,
    updateSelectedProduct1ByIndex2,
    updatePriceByindex,
    updateStockByindex,
    updateSKUByindex,
    products,
    updateParentName,
    updateChildName,
    updateImage,
    updateProductName,
    updateSalePrice,
    updateFullPrice,
    updateDiscountPercent,
    updateCountDownTime,
    addDescriptionLine,
    updateDescriptionByIndex,
    removeDescriptionLineByIndex,
    updateSlideImage,
    updateLine,
    updatePhone,
    updateFacebook,
    updateEditorData,
    deleteShipTypeByIndex,
    resetShipTypes,
    deleteSlideImage,
    deleteSelectedImage,
    updateSaledAmount,
    selectPaymentMethod,
    updateLineButtonText,
    updateFacebookButtonText,
    updatePhoneButtonText,
    updateGoogleTagCode,
    updateLineToken,
    updateActive,
    PID,
    setPID
  }}>
    {props.children}
  </SelectedProductEditContext.Provider>);
};
