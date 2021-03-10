import React, { useState } from 'react';
import { BillInfoContext } from './billInfo.context';
import { getLocalState, setLocalState } from '../../helper/localStorage';



const getBillInfo = () => {
  const billInfo = getLocalState('billInfo');
  return billInfo ? billInfo : [];
};



export const BillInfoProvider = (props) => {

        
    const [billInfo, setBillInfo] = useState(getBillInfo());
    

    const addNewBillInfo = (item) => {

      if (billInfo.length) {
        const index = billInfo.findIndex(bill => bill.billData.id === item.billData.id);
        if (index !== -1) {
            // if product already available in the cart
            const bill = billInfo[index];
            billInfo[index] = { ...bill, ...item }; // just increase the quantity
        }
        else {
            // if this product is not available in the cart
            billInfo.push({ ...item});
        }
      }
      else {
        // if the cart is empty
        billInfo.push({ ...item});
      }

      setBillInfo(billInfo)
      setLocalState('billInfo', billInfo);
    }

    const updateBillInfo = (itemId) => {

      const index = billInfo.findIndex(bill => bill.billData.id === itemId);

      if (index > -1) {
          // delete if quantity, 0
          billInfo.splice(index, 1);
      }/*
      else {
          // update quanity
          const bill = billInfo[index];
          billInfo[index] = { ...bill };
      }*/

      setLocalState('billInfo', billInfo);
      setBillInfo([...billInfo]);

    };
    
    return (<BillInfoContext.Provider value={{
        billInfo,
        addNewBillInfo,
        updateBillInfo,
        setBillInfo,
    }}>
      {props.children}
    </BillInfoContext.Provider>);
};
