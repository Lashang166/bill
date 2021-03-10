import React, { useContext, useState, useEffect, useMemo } from "react";
import SaleProductCard from '../ProductCard/SaleProductCard';
import SaleProductCard2 from '../ProductCard/SaleProductCard2';
import SaleProductContext from '../../contexts/saleProduct/saleProduct.context';
import SelectedProductContext from '../../contexts/selectedProduct/selectedProduct.context';
import './SaleFooter.style.css';
import {apiServer} from '../../API';
import { CartContext } from '../../contexts/cart/cart.context';
import PaymentMethod from '../../components/PaymentMethod/PaymentMethod';
import FlashSale from '../FlashSale/FlashSale';
import CourierDisplay from '../../components/Courier/Courier';
import { SocialButton, SalePrice, SameLine } from './SaleFooter.style';
// import {apiServer} from '../../API';
import TagManager from 'react-gtm-module'

const CustomButton = ({
    text,
    color,
    icon,
    link,
    isPhone
}) => {

    const onClickSocialBtn = () => {
        if(!isPhone) window.open("https://"+link);
    }
    if(text === ''){
        return <></>
    }

    return (
        <SocialButton  style={{ background : color }} >
            {isPhone ? 
            <a class="media" href={link}>
                <div class="SocialIcon media-left">
                    <img src={icon} />
                </div>
                <div class="text media-content">
                    {text}
                </div>
			</a>
            :
            <a class="media" onClick={() => onClickSocialBtn()}>
                <div class="SocialIcon media-left">
                    <img src={icon} />
                </div>
                <div class="text media-content">
                    {text}
                </div>
			</a>
            }
        </SocialButton>
    )
}


const MyCartView = ({
    selectedCard2,
    product,
    selectedCard,
    addSelectedProduct2,
    removeSelectedProduct2,
    selectedProductData,
    productsList,
    img
}) => {

    return (
        <>
            ตะกร้าสินค้า
            <div>
ตะกร้าสินค้า
            </div>
           
            <div
                style={{
                    'flexDirection': 'row',
                    'flex': 1,
                    'display': 'flex',
                    'justifyContent': 'space-between',
                }}
            >
                <div>
                <img src={`${apiServer}/ci-api/${img}`} style={{width : "50px", height : "50px"}}/>
                </div>
                <div>
                    <div>
                        {selectedProductData.length > 0 ? selectedProductData[0].selectProductName1 : ""}
                    </div>

                    <div>
                    <button onClick={(e) => {removeSelectedProduct2(e, product, selectedCard2)}}>-</button>
                        {selectedProductData.length > 0 ? selectedProductData[0].quantity : 0}
                        <button onClick={(e) => {addSelectedProduct2(e, product, selectedCard2)}}>+</button>
                    </div>

                    <div>
                        {selectedProductData.length > 0 ? selectedProductData[0].selectProductName2[0].ChildPrice : 0}
                    </div>
                </div>
                <div>
                    ลบ
                </div>
            </div>
            <div
                style={{
                    'flexDirection': 'row',
                    'flex': 1,
                    'display': 'flex',
                    'justifyContent': 'space-between',
                }}
            >
                <div>
                    ค่าสินค้า
                </div>
                <div>
                    {selectedProductData.length > 0 ? selectedProductData[0].selectProductName2[0].ChildPrice : 0}
                </div>
            </div>
            <div
                style={{
                    'flexDirection': 'row',
                    'flex': 1,
                    'display': 'flex',
                    'justifyContent': 'space-between',
                }}
            >
                <div>
                    ราคารวม
                </div>
                <div>
                    {selectedProductData.length > 0 ? selectedProductData[0].selectProductName2[0].ChildPrice*selectedProductData[0].quantity : 0}
                </div>
            </div>
        </>
    )
}


const SaleFooter = ({
    productsList,
    shipTypes,
    productName,
    salePrice,
    fullPrice,
    discountPercent,
    saleAmount,
    flashSale,
    paymentMethod,
    social,
    googleTagCode,
    lineToken,
}) => {




    const tagManagerArgs = {
        gtmId: googleTagCode
    }
    


    const [ selectedCard, setSelectedCard ] = useState();
    const [ selectedCard2, setSelectedCard2 ] = useState();
    const [ isClickedBuy, setIsClickedBuy ] = useState(false);
    const { saleProductData, productList } = useContext(SaleProductContext);

    const { 
        selectedProductData, 
        setSelectedProduct2, 
        addSelectedProduct2,
        removeSelectedProduct2,
        getSelectedProductQuantity2
    } = useContext(SelectedProductContext);
    
    const {
        add
    } = useContext(CartContext);

    useMemo(() => {
        TagManager.initialize(tagManagerArgs);
        // alert("googleTagCode : " + googleTagCode);
    }, [])

    const onClickedBuy = (e) => {
        // productsList[selectedCard];
        console.log("productsList[selectedCard]++++++++")
        console.log(productsList[selectedCard])
        console.log(selectedProductData[0].quantity)
        // {`${apiServer}/ci-api/${productsList[selectedCard].img}`}

        let tempProductInfo = { 
            SKU: productsList[selectedCard].selectProductName2[selectedCard2].ChildSKU,
            description: productsList[selectedCard].ParentName,
            discountInPercent: 0,
            gallery: [{url: `${apiServer}/ci-api/${productsList[selectedCard].image}`}],
            id: productsList[selectedCard].selectProductName2[selectedCard2].ChildSKU,
            image: `${apiServer}/ci-api/${productsList[selectedCard].image}`,
            price: productsList[selectedCard].selectProductName2[selectedCard2].ChildPrice,
            quantity: selectedProductData[0].quantity,
            // quantity: 10,
            salePrice: productsList[selectedCard].selectProductName2[selectedCard2].ChildPrice,
            slug: productsList[selectedCard].selectProductName2[selectedCard2].ChildSKU,
            // title: productsList[selectedCard].selectProductName2[selectedCard2].selectProduct2,
            title : productName + " ( " + productsList[selectedCard].selectProductName1 + ", " + productsList[selectedCard].selectProductName2[selectedCard2].selectProduct2 + " )",
            type: "products",
            unit: 1,
            shipTypes : shipTypes,
            lineToken : lineToken,
            
        }

        e.stopPropagation();
        add(e, tempProductInfo);
    }
    
    const onClickCard = (cardIndex) => {
        console.log(cardIndex);
        setSelectedCard(cardIndex);
        setSelectedCard2(productsList[0].ChildSKU === 0 ? 0 : undefined);
    }

    const getPrice = () => {
        if(productsList[0].ChildSKU === 1 && selectedCard2 >= 0){
            return productsList[selectedCard].selectProductName2[selectedCard2].ChildPrice
        }
        else if(productsList[0].ChildSKU === 0 && selectedCard >= 0){
            return productsList[selectedCard].selectProductName2[0].ChildPrice
        }
        else{
            return salePrice;
        }
    }

    return (
        <div style={{padding : "0px 3px 0px 3px"}}>
            <CustomButton 
                text={social.line.buttonText}
                link={social.line.link}
                color="#00c300"
                icon={require('../../assets/icon/Line.png')}
                isPhone={false}
            />
            <CustomButton 
                text={social.facebook.buttonText}
                link={social.facebook.link}
                color="rgb(68 138 255)"
                icon={require('../../assets/icon/Facebook.png')}
                isPhone={false}
            />
            <CustomButton 
                text={social.phone.buttonText}
                link={social.phone.link}
                color="#69C9D0"
                icon={require('../../assets/icon/Phone.png')}
                isPhone={true}
            />
            <SalePrice>
                <p class="NameTitle">{productName}</p>
                {/* <p class="salePrice">฿{selectedCard2 >= 0 && productsList[0].ChildSKU === 1 ? productsList[selectedCard].selectProductName2[selectedCard2].ChildPrice : productsList[selectedCard ? selectedCard : 0].selectProductName2[0].ChildPrice}</p> */}
                <p class="salePrice">{getPrice()}</p>
                <span class="fullPrice">฿{fullPrice}</span>
                <span class="saleAmount">{saleAmount} ขายแล้ว</span>
            </SalePrice>
            <discountPercent>
            </discountPercent>
            <FlashSale flashSale={flashSale.countDownTime} />

            {/* <SameLine>
                <PaymentMethod PaymentMethod={paymentMethod}/>
                
                <CourierDisplay couriers={shipTypes}/>
            </SameLine> */}
            เลือก: {productsList[0].ParentName}
            <div className="columns is-multiline is-mobile" >
                {productsList.map((product, key ) => {
                    
                    return (
                        <>
                            {/* {product.ChildSKU === 0 ?
                            <SaleProductCard
                                key={key}
                                index={key}
                                key={key}
                                product={product}
                                img={product.image}
                                selectedCard={selectedCard}
                                selectedCard2={selectedCard2}
                                onClickCard={() => {
                                    onClickCard(key);
                                }}
                            />
                            : */}
                            <SaleProductCard2
                                key={key}
                                index={key}
                                product={product}
                                img={product.image}
                                selectedCard={selectedCard}
                                selectedCard2={selectedCard2}
                                onClickCard={() => {
                                    onClickCard(key);
                                }}
                                setIsClickedBuy={onClickedBuy}
                                setSelectedCard2={setSelectedCard2}
                                setSelectedProduct2={setSelectedProduct2}
                            />
                            {/* } */}
                        </>
                    )
                })
                }
            </div>
            {/* {selectedCard !== undefined && productsList[selectedCard].ChildSKU === 1 ? 
                <>
                    <div className="my-space-bottom">ตัวเลือกสินค้า</div>
                    <div className="columns is-multiline is-mobile">
                        {productsList[selectedCard].selectProductName2.map((selectProduct, index) => {
                        
                        return (
                            <div 
                                key={index}
                                class={
                                    `card my-space-left my-padding-left my-padding-right
                                    ${selectedCard2 === index ? 'selected-border' : ''}
                                `}
                                onClick={(e) => {
                                    setSelectedCard2(index)
                                    // addSelectedProduct2(e, productsList[selectedCard], index);
                                    setSelectedProduct2(e, productsList[selectedCard], index);
                                    // addSelectedProduct2(e, productsList[selectedCard], -1);
                                }}
                            >
                                {selectProduct.selectProduct2}
                            </div>
                        )}
                        )
                        }
                    </div>
                    {isClickedBuy ? 
                        <MyCartView 
                            product={productsList[selectedCard]}
                            selectedCard2={selectedCard2}
                            selectedCard={selectedCard}
                            addSelectedProduct2={addSelectedProduct2}
                            // removeSelectedProduct2(e, product, selectedCard2);
                            removeSelectedProduct2={removeSelectedProduct2}
                            selectedProductData={selectedProductData}
                            productsList={productsList}
                            img={productsList[selectedCard].image}
                        />
                    : null}
                </>
            : null} */}
            {//</div>
            }
        </div>
    )
}

export default SaleFooter;