import React, { useContext, useMemo } from "react";
import { ProductCardMinusButton, ProductCardPlusButton } from "./SaleProductCard.style";
import SelectedProductContext from '../../contexts/selectedProduct/selectedProduct.context';

import {apiServer} from '../../API';

const SaleProductCard2 = ({
    onClickCard, 
    selectedCard, 
    selectedCard2, 
    key, 
    index, 
    product, 
    img, 
    setIsClickedBuy,
    setSelectedCard2,
    setSelectedProduct2
}) => {

    const { 
        selectedProductData, 
        addSelectedProduct2, 
        removeSelectedProduct2, 
        getSelectedProductQuantity2,
        getSelectedProductQuantity,
        addSelectedProduct,
        removeSelectedProduct,
    } = useContext(SelectedProductContext);

    // console.log("product---------");
    // console.log(product);

    const selectedStyles = {
        "box-shadow" : "0 2px 3px red, 0 0 0 1px red",
    }

    useMemo(() => {
        setSelectedCard2(product.ChildSKU === 0 ? 0 : undefined)
    }, [])


    return (
        <div className="column is-narrow">
            
            <div 
                className={`${selectedCard === index ? 'card-selected' : 'card'}`}
                // style={{ 'box-shadow' : '0 2px 3px red, 0 0 0 1px red'}}
                // className={`${selectedCard2 !== undefined ? 'sticky' : 'unSticky'}`}
            >
                <div className="card-image" style={{width : "165px",borderWidth : 2}}>
                    <div className="media" onClick={onClickCard} >
                        <img src={`${apiServer}/ci-api/${img}`} style={{width : "165px", height : "165px"}}/>
                    </div>
                    <div className="card-content">
							{product.selectProductName1}

                    {/*  */}
					
                    {selectedCard === index && product.ChildSKU === 1 ? 
                        <>
						<hr />
                            <div className="content">ตัวเลือก: {product.ChildName}</div>
                            <div className="columns is-multiline is-mobile">
                                {product.selectProductName2.map((selectProduct, index) => {
                                
                                return (
                                    <div 
                                        key={index}
                                        class={
                                            `card tag is-white my-padding-left my-padding-right
                                            ${selectedCard2 === index ? 'selected-border' : ''}
                                        `} style={{margin : "5px"}}
                                        onClick={(e) => {
                                            setSelectedCard2(index)
                                            // addSelectedProduct2(e, product, index);
                                            setSelectedProduct2(e, product, index);
                                            // addSelectedProduct2(e, product, -1);
                                        }}
                                    >
                                        {selectProduct.selectProduct2}
                                    </div>
                                )}
                                )
                                }
                            </div>
							<div>
                                {/* {selectedCard2 !== undefined ? product.selectProductName2[selectedCard2].ChildPrice : null} */}
                            </div>
                        </>
                    : null} 
                    {/*  */}
                    {selectedCard === index ? 
                    <>
                        <div class="is-multiline is-flex is-fullwidth" >
                            <ProductCardMinusButton class="column is-one-fifth my-widthless" >
                                <a class="button is-primary" 
                                    onClick={(e) => {
                                        if(selectedCard2 !== undefined){
                                            removeSelectedProduct2(e, product, selectedCard2);
                                        }
                                    }}
                                >
                                
                                    -
                                </a>
                            </ProductCardMinusButton>
                            <div 
                                class="column is-three-fifth my-widthless is-paddingless" 
                                style={{"textAlign" : "center", "marginTop": "5px"}}>
                                {getSelectedProductQuantity2(product, selectedCard2)}
                            </div>
                            <ProductCardPlusButton class="column is-one-fifth" >
                                <a class="button is-primary" 
                                    onClick={(e) => {
                                        if(selectedCard2 !== undefined){
                                            addSelectedProduct2(e, product, selectedCard2);
                                        }
                                    }}
                                >
                                    +
                                </a>
                            </ProductCardPlusButton>
                        </div>
                        <div>
                        <a class="button is-primary is-fullwidth" style={{"marginTop": "3px"}}
                            onClick={(e) => {
                                setIsClickedBuy(e)}
                            }
                        >
                            ใส่ตะกร้า
                        </a>
                        </div>
                    </>
                    : null}
                   </div> 
                </div>
            </div>
        </div>
    )
}

export default SaleProductCard2;