import React, { useState } from 'react';
import SaleProductContext from './saleProduct.context';
import axios from "axios";
import { getLocalState, setLocalState } from '../../helper/localStorage';
import { getSelectProduct } from '../../API';

import fakeData from "../../fake-data-salePage.json";

export const SaleProductProvider = (props) => {

    const [saleProductData, setSaleProductData] = useState(fakeData);
    const [productList, setProductList] = useState([]);

    const initData = async () => {
      
      getSelectProduct().then((result) => {
        console.log(result.data.data);
        setProductList(result.data.data);
      })
      console.log(await getSelectProduct());
      //var fakeData = require('../../fake-data-salePage.json');
      
      //console.log(fakeData);
      //setData()
    }


    const setDataWithAmount = (inputData) => {

      console.log(inputData);
      //let tempData = inputData.filter();;

      
    }
    
    return (<SaleProductContext.Provider value={{
        saleProductData,
        productList,
        setDataWithAmount,
        initData,
    }}>
      {props.children}
    </SaleProductContext.Provider>);
};
