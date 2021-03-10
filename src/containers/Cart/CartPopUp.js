import React, { useContext, useState, useEffect, useMemo } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Modal, openModal, closeModal } from '@redq/reuse-modal';
import CartItem from './Cart';
import CartPopupButton, { BoxedCartButton, } from '../../components/CartPopup/CartPopupButton';
import { CartContext } from '../../contexts/cart/cart.context';
import { CURRENCY } from '../../helper/constant';
import { CartSlidePopup } from './CartItemCard.style';
import { FormattedMessage } from 'react-intl';
import { getbillProductList, createBill1, updateStatus1 } from '../../API';
import { Redirect } from "react-router-dom";
import { DrawerContext } from '../../contexts/drawer/drawer.context';
import { AlertDotIcon } from '../../components/AllSvgIcon';


const CartPopupStyle = createGlobalStyle `


.reuseModalParentWrapper {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  box-sizing: border-box;
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
}

.reuseModalOverlay {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  position: fixed;
}

  .cartPopup{
    top: auto !important;
    left: auto !important;
    bottom: 50px !important;
    right: 50px !important;
    box-shadow: 0 21px 36px rgba(0, 0, 0, 0.16);
    transform-origin: bottom right;


    @media (max-width: 767px) {
      max-width: none!important;
      width: 100% !important;
      bottom: 0 !important;
      left: 0!important;
      background: #fff;
      overflow: initial !important;
      transform-origin: bottom center;
    }

  }
`;
const CartPopUp = ({ deviceType: { mobile, tablet, desktop }, owner, localVariable } ) => {
  const { cartState, dispatch, products, totalPrice, initialCartValue } = useContext(CartContext);
  const { sendLineNotify } = useContext(DrawerContext);

    const [isRedirectBillEdit, setIsRedirectBillEdit] = useState(false);
    const [redirectPage, setRedirectPage] = useState();

    //console.log(lineToken);
    /*const notify = new LineAPI.Notify({
      token: lineToken
    })*/

    useMemo(() => {
      initialCartValue(localVariable.cart, localVariable.totalPrice)
    }, [])

    const handleModal = () => {

        console.log("TEST TEST TEST");

        openModal({
            show: true,
            config: {
                className: 'cartPopup',
                width: 'auto',
                height: 'auto',
                enableResizing: false,
                disableDragging: true,
                transition: {
                    tension: 360,
                    friction: 40,
                },
            },
            closeOnClickOutside: true,
            component: CartItem,
            closeComponent: () => <div />,
            componentProps: { onCloseBtnClick: closeModal, onClickCheckOutBtnClick: onClickCheckOut, scrollbarHeight: 370 },
            // componentProps: { onClickCheckOutBtnClick: onClickCheckOut, scrollbarHeight: 370 },
        });
    };



    const onClickCheckOut = () => {
    
      //alert("WHY");
      if(products.length === 0) return;

      let params = {
        "amcode" : owner
      }
      
      console.log("owner");
      console.log(owner);
      getbillProductList(params).then(async (result) => {
        let data = JSON.parse(result.request.response);
        // data.data.data.VName
        let VName = data.data.VName;
        console.log(data);
        console.log("result.data.data");
        console.log(result.data);
        if (result.data.message == "success") {
          let items = [];


          for(let i = 0; i < products.length; i++){
            console.log("products---------"+i);
            console.log(products);
            items.push({
              "Amount" : products[i].quantity,
              "Description" : products[i].title,
              "PricePerUnit" : products[i].salePrice,
              "SKU" : products[i].SKU,
              "UnitName" : "",
              "total" : (products[i].salePrice*products[i].quantity),
              "image" : products[i].image
            }
            );
          }

          if(products[0].shipTypes){
            data.data.data.ShipTypes=products[0].shipTypes;
          }
          data.data.data.items=items;

          return createBill1(data.data)
            .then(result2 => {
              if (result2.data.result == "OK") {  

                const params = {
                  id : parseInt(result2.data.data.id),
                  status : "NEW"
                }
            

                return updateStatus1(params)
                .then(result3 => {
                  if (result3.data.result === "OK") {

                    
                    sendLineNotify( result2.data.data.BillNo, owner, products[0].lineToken, VName);
                    //console.log(window.location);
                    //window.location.href = `/#/bill/${result2.data.data.BillNo}`;
                    // console.log(window);
                    window.location.replace(`#/bill/${result2.data.data.BillNo}`);
                    
                    return {message : "เปิดบิลสำเร็จ", isSuccess : true}
                  }
                  
                });
                //window.location.href = `/#/bill/${result2.data.data.BillNo}`;
                //setRedirectPage(`billedit/${result2.data.data.BillNo}`);
                //setIsRedirectBillEdit(true);
                //return true;
              }
            });
        } else {
          //alert("Error OpenBill");
          return {message : "Error", isSuccess : true}
        }
      });
      closeModal();
    }

    const toggleCart = () => {
        dispatch({
            type: 'TOGGLE',
        });
    };
    let cartSlideclass = cartState.isOpen === true ? 'cartPopupFixed' : '';

    
    if (isRedirectBillEdit) {
      return <Redirect to={`${redirectPage}`} />
    }

    return (<>
      {mobile || tablet ? (<>
          <CartPopupStyle />
          <CartPopupButton className='product-cart' itemCount={products.length} itemPostfix={products.length > 1 ? (<FormattedMessage id='cartItems' defaultMessage='รายการ'/>) : (<FormattedMessage id='cartItem' defaultMessage='รายการ'/>)} price={totalPrice} pricePrefix='$' onClick={handleModal}/>
        </>) : (<>
          <CartSlidePopup className={cartSlideclass}>
            {cartState.isOpen === true && (<CartItem onCloseBtnClick={toggleCart} scrollbarHeight='100vh' />)}
          </CartSlidePopup>

          <BoxedCartButton className='product-cart' itemCount={products.length} itemPostfix={products.length > 1 ? (<FormattedMessage id='cartItems' defaultMessage='items'/>) : (<FormattedMessage id='cartItem' defaultMessage='item'/>)} price={totalPrice} pricePrefix={CURRENCY} onClick={toggleCart}/>
        </>)}
    </>);
};
export default CartPopUp;
