import React, { useReducer, useState } from 'react';
import { DrawerContext } from './drawer.context';
import { getbillProductList } from '../../API';
import { lineNotifCheckOut } from '../../API';

const initialState = {
    isOpen: false,
};
function reducer(state, action) {
    switch (action.type) {
        case 'TOGGLE':
            return {
                ...state,
                isOpen: !state.isOpen,
            };
        default:
            return state;
    }
}



export const DrawerProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    //const [headerName, setHeaderName] = useState("Saranya");
    const [headerName, setHeaderName] = useState();
    const [lineToken, setLineToken] = useState();
    const [bill, setBill] = useState();

    //const headerName = "Saranya";

    const sendLineNotify = (billNo, amcode, sendLineToken, shopName) => {
        


        let tempLineToken = sendLineToken ? sendLineToken : lineToken;
        let sendShopName = shopName ? shopName : headerName;

        let params = {
            
                "Token": tempLineToken,
                "MsgBillno": "บิล: " + billNo,
                "MsgVname": "ร้านค้า: " + sendShopName,
                "MsgAmcode": "รหัส: " + amcode,
                "MsgTextCart": "เปิดบิลสำเร็จ โดยลูกค้าค่ะ",
                "MsgBillUrl": window.location.origin+window.location.pathname+"#/bill/" + billNo,
            
        };

        console.log("params-----");
        console.log(params);
        //notify.status().then(console.log)
        /*notify.send(msg)
              .catch(console.error)*/
        lineNotifCheckOut(params);
    }

    const getHeaderName = async owner => {
        let params = {
            "amcode" : owner
        }

        await getbillProductList(params).then(async (result) => {
            //console.log(result);
            //console.log(result.data.data.data.LineToken)
            setBill(result.data.data);
            setHeaderName(result.data.data.VName);
            setLineToken(result.data.data.data.LineToken);
        });
    }

    return (<DrawerContext.Provider value={{ state, dispatch, headerName, getHeaderName, sendLineNotify }}>
      {children}
    </DrawerContext.Provider>);
};
