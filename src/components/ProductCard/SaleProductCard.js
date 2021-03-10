import React, { useContext } from "react";
import { ProductCardMinusButton, ProductCardPlusButton } from "./SaleProductCard.style";
import SelectedProductContext from '../../contexts/selectedProduct/selectedProduct.context';

import {apiServer} from '../../API';

const SaleProductCard = ({onClickCard, selectedCard, key, index, product, img}) => {

    const { selectedProductData, addSelectedProduct, removeSelectedProduct, getSelectedProductQuantity } = useContext(SelectedProductContext);

    return (
        <div className="column is-one-third">
            
            <div className="card">
                <div className="card-content">
                    <div className="media" onClick={onClickCard}>
                        <img src={`${apiServer}/ci-api/${img}`} />
                    </div>
                    <div>
                        {product.selectProductName1}
                    </div>
                    <div>
                        {product.ParentPrice}
                    </div>
                    {selectedCard === index ? 
                    <>
                        <div class="is-multiline is-flex is-fullwidth " >
                            <ProductCardMinusButton class="column is-one-fifth my-widthless" >
                                <a class="button is-primary" 
                                    onClick={(e) => {removeSelectedProduct(e, product);}}
                                >
                                    -
                                </a>
                            </ProductCardMinusButton>
                            <div 
                                class="column is-three-fifth my-widthless is-paddingless" 
                                style={{"textAlign" : "center", "marginTop": "5px"}}>
                                {getSelectedProductQuantity(product)}
                            </div>
                            <ProductCardPlusButton class="column is-one-fifth" >
                                <a class="button is-primary" 
                                    onClick={(e) => {addSelectedProduct(e, product);}}
                                >
                                    +
                                </a>
                            </ProductCardPlusButton>
                        </div>
                        <div>
                        <a class="button is-primary is-fullwidth" style={{"marginTop": "3px"}}
                            onClick={() => {}}
                        >
                            ซื้อทันที
                        </a>
                        </div>
                    </>
                    : null}
                    
                </div>
            </div>
        </div>
    )
}

export default SaleProductCard;