import React, { useState, useContext, useEffect, useMemo } from "react";
import SaleHeader from "../components/SaleHeader/SaleHeader";
import SaleBody from "../components/SaleBody/SaleBody";
import { SaleProductProvider } from "../contexts/saleProduct/saleProduct.provider";
import { SelectedProductProvider } from "../contexts/selectedProduct/selectedProduct.provider";
import SaleProductContext from '../contexts/saleProduct/saleProduct.context';
import SaleFooter from '../components/SaleFooter/SaleFooter';
import SelectedProductEditContext from '../contexts/selectedProductEdit/SelectedProductEdit.context';
import SaleSticky from '../components/SaleSticky/SaleSticky';
import CartPopUp from '../containers/Cart/CartPopUp';
import {CartProvider} from "../contexts/cart/cart.provider";
import { DrawerProvider } from '../contexts/drawer/drawer.provider';
import { IntlProvider } from 'react-intl';
import { Modal, openModal, closeModal } from '@redq/reuse-modal';
import { getLocalState } from '../helper/localStorage';


import TagManager from 'react-gtm-module'
 


const deviceType = {
    mobile: true, tablet: false, desktop: false
};
  

const SaleProductPage = ({match}) => {

  
    const { initialProducts, products} = useContext(SelectedProductEditContext);
    const [ isSuccess, setIsSuccess ] = useState(false);
    const [ loading, setLoading ] = useState(true);


    // const [ loading, setLoading ] = useState(true);
    const [ user, setUser ] = useState({});

    let result;
    
    useMemo(async () => {

        let params = {
            amcode : match.params.amcode,
            PID : match.params.PID,
        }

        result = await initialProducts(params);
        setIsSuccess(result !== "error");
        setLoading(false);
        setUser(getLocalState("user"));
    }, []);

    if(loading){
        return <div></div>
    }

    if(!isSuccess || (products && products.active === 0)){
        return(
            <div>
                This page is not available for now.
            </div>
        )
    }
    return (
        <div>
            {/* {products.imageSlide ? 
                // <SaleSticky 
                //     LineLink={products.social.line}
                //     FacebookLink={products.social.facebook}
                // /> 
            : null} */}
            <div class="container" style={{"maxWidth": "750px", "margin": "auto"}}>
               <div style={{"margin" : "0px"}}>
                    {products.imageSlide ? 
                    <>
                        <DrawerProvider>
                        <SaleProductProvider>
                        <CartProvider>
                        <SelectedProductProvider>
                        <IntlProvider locale="en">
                            <Modal>
                                <SaleHeader
                                    imageSlide={products.imageSlide}
                                    salePrice={products.sale.salePrice}
                                    fullPrice={products.sale.fullPrice}
                                    saleAmount={products.sale.saledAmount}
                                    flashSale={products.flashSale}
                                    shipTypes={products.shipTypes}
                                    paymentMethod={products.payment}
                                    productName={products.productName}
                                />
                                <SaleBody
                                    editor={products.editor}
                                    productDesc={products.description}
                                />
                                <SaleFooter
                                    productName={products.productName}
                                    productsList={products.chooseProduct}
                                    shipTypes={products.shipTypes}
                                    salePrice={products.sale.salePrice}
                                    fullPrice={products.sale.fullPrice}
                                    saleAmount={products.sale.saledAmount}
                                    flashSale={products.flashSale}
                                    paymentMethod={products.payment}
                                    social={products.social}
                                    googleTagCode={products.googleTagCode}
                                    lineToken={products.lineToken}
                                />
                                {/* <CartPopUp deviceType={deviceType} owner={"saranya"}/> */}

                                <CartPopUp deviceType={deviceType} owner={match.params.amcode}
                                    localVariable={{ cart : 'cart_productList', totalPrice : 'totalPrice_productList'}}
                                />
                            </Modal>
                        </IntlProvider>
                        </SelectedProductProvider>
                        </CartProvider>
                        </SaleProductProvider>
                        </DrawerProvider>
                    </>
                    : null}
                </div>
            </div>
        </div>
    );
}

export default SaleProductPage;