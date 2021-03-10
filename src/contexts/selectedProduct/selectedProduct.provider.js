import React, { useState } from 'react';
import selectedProductContext from './selectedProduct.context';
import axios from "axios";
import { getLocalState, setLocalState } from '../../helper/localStorage';

import fakeData from "../../fake-data-salePage.json";

const geSelectedProducts = () => {
  const selectedProducts = getLocalState('selectedProduct');
  return selectedProducts ? selectedProducts : [];
};

export const SelectedProductProvider = (props) => {

    const [selectedProductData, setSelectedProductData] = useState(geSelectedProducts());

    
    const addSelectedProduct = (event, item) => {

    if (selectedProductData.length) {
      //const index = selectedProductData.findIndex(product => product.SKU === item.SKU);
      const index = selectedProductData.findIndex(product => product.selectProductName2[0].ChildSKU === item.selectProductName2[0].ChildSKU);
      if (index !== -1) {
        // if product already available in the cart
        const quantity = selectedProductData[index].quantity ? selectedProductData[index].quantity : 1;
        selectedProductData[index] = { ...item, quantity: quantity + 1 }; // just increase the quantity
      }
      else {
          // if this product is not available in the cart, replace it into selectedProductData
          selectedProductData[0] = { ...item, quantity: 1 };
      }
    }
    else {
        // if the cart is empty
        selectedProductData.push({ ...item, quantity: 1 });
    }

    setLocalState('selectedProduct', selectedProductData);
    setSelectedProductData([...selectedProductData]);
    }

    
    const removeSelectedProduct = (event, item) => {
      //let tempData = inputData.filter();;

      let currentQuantity = -1;

      if (selectedProductData.length > 0) {
        //const index = selectedProductData.findIndex(product => product.SKU === item.SKU);
        const index = selectedProductData.findIndex(product => product.selectProductName2[0].ChildSKU === item.selectProductName2[0].ChildSKU);
        if (index !== -1) {
            // if product already available in the cart
            currentQuantity = selectedProductData[index].quantity;

            if (currentQuantity <= 1) {
              // delete if quantity, 0
              selectedProductData.splice(index, 1);
            }
            else{
              selectedProductData[index] = { ...item, quantity: currentQuantity - 1 }; // just decrease the quantity
            }
        }
      }
      else {
          // if the cart is empty
          selectedProductData.push({ ...item, quantity: 0 });
      }
      setLocalState('selectedProduct', selectedProductData);
      setSelectedProductData([...selectedProductData]);
      console.log(selectedProductData);
    }

    const getSelectedProductQuantity = (item) => {
      let quantity = 1;
      //const index = selectedProductData.findIndex(product => product.SKU === item.SKU);
      console.log(selectedProductData);
      console.log(item);  
      
      const index = selectedProductData.findIndex(product => product.selectProductName2[0].ChildSKU === item.selectProductName2[0].ChildSKU);
          
      if(index >= 0){
        quantity = selectedProductData[index].quantity
      }

      return quantity;
    }
    
    
    const addSelectedProduct2 = (event, item, index2) => {

      //console.log(selectedProductData[0].selectProductName2[0].ChildSKU);
      //alert("Test");
      let tempProduct = {
        ...item,
        selectProductName2: [{
          ...item.selectProductName2[index2]
        }]
      }


      if (selectedProductData.length  && selectedProductData[0].selectProductName2) {
        const index = selectedProductData.findIndex(product => product.selectProductName2[0].ChildSKU === item.selectProductName2[index2].ChildSKU);
        if (index !== -1) {
            // if product already available in the cart
            const quantity = selectedProductData[0].quantity ? selectedProductData[index].quantity : 1;
            selectedProductData[0] = { ...tempProduct, quantity: quantity + 1 }; // just increase the quantity
        }
        else {
            // if this product is not available in the cart, replace it into selectedProductData
            selectedProductData[0] = { ...tempProduct, quantity: 2 };
        }
      }
      else {
          // if the cart is empty
          selectedProductData[0] = { ...tempProduct, quantity: 2 };
      }
      // console.log(selectedProductData);
      setLocalState('selectedProduct', selectedProductData);
      setSelectedProductData([...selectedProductData]);
      /*setLocalState('selectedProduct', []);
      setSelectedProductData([]);*/
      }
  
      const setSelectedProduct2 = (event, item, index2) => {

        let tempProduct = {
          ...item,
          selectProductName2: [{
            ...item.selectProductName2[index2]
          }]
        }
  
        if(selectedProductData.length > 0 && selectedProductData[0].selectProductName2[0].ChildSKU !== item.selectProductName2[index2].ChildSKU){
          selectedProductData[0] = { ...tempProduct, quantity: 1 };
        }
        
  
        
        // console.log(selectedProductData);
        setLocalState('selectedProduct', selectedProductData);
        setSelectedProductData([...selectedProductData]);
        /*setLocalState('selectedProduct', []);
        setSelectedProductData([]);*/
        }
    
      
      const removeSelectedProduct2 = (event, item, index2) => {
        //let tempData = inputData.filter();;
  
        console.log(item);
        let currentQuantity = -1;
  
        /*let tempProduct = {
          image : item.image,
          selectProductName1 : item.selectProductName1,
          selectProductName2 : item.selectProductName2[index2],
        }*/
        let tempProduct = {
          ...item,
          selectProductName2: [{
            ...item.selectProductName2[index2]
          }]
        }
  
        console.log(tempProduct);
        if (selectedProductData.length) {
          const index = selectedProductData.findIndex(product => product.SKU === item.SKU);
          if (index !== -1) {
              // if product already available in the cart
              currentQuantity = selectedProductData[index].quantity;

              console.log("currentQuantity-----");
              console.log(currentQuantity);
              // if (currentQuantity <= 1) {
                // delete if quantity, 0
                // selectedProductData.splice(index, 1);
              // }
              // else{
                if(currentQuantity > 1) selectedProductData[index] = { ...tempProduct, quantity: currentQuantity - 1 }; // just decrease the quantity
              // }
          }
        }
        setLocalState('selectedProduct', selectedProductData);
        setSelectedProductData([...selectedProductData]);
      }
  
      const getSelectedProductQuantity2 = (item, i) => {
        let quantity = 1;
        // console.log(item);
        // console.log(i);
        if(i !== undefined){
          
          // console.log(item.selectProductName2[i].ChildSKU);
          // console.log(selectedProductData);
          const index = selectedProductData.findIndex(product => product.selectProductName2[0].ChildSKU === item.selectProductName2[i].ChildSKU);
          // console.log("index-------------");
          // console.log(index);
          if(index >= 0){
            quantity = selectedProductData[index].quantity
          }
        }
  
        return quantity;
      }
    
    return (<selectedProductContext.Provider value={{
      selectedProductData,
      addSelectedProduct,
      removeSelectedProduct,
      getSelectedProductQuantity,
      addSelectedProduct2,
      setSelectedProduct2,
      removeSelectedProduct2,
      getSelectedProductQuantity2,
    }}>
      {props.children}
    </selectedProductContext.Provider>);
};
