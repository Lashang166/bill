import React, { useEffect, useContext } from 'react';
// import { Link } from 'react-router'
import { ProductCardWrapper, SalePrice, SameLine } from './SaleHeader.style';
import SelectedProductEditContext from '../../contexts/selectedProductEdit/SelectedProductEdit.context';
import CourierDisplay from '../../components/Courier/Courier';
import PaymentMethod from '../../components/PaymentMethod/PaymentMethod';
import FlashSale from '../FlashSale/FlashSale';
import Carousel from 're-carousel'    
import CustomCarousel from '../../components/Carousel/Carousel'; 
import { ProductSingleContainer } from '../../styled/product-single.style';

//import Carousel from 'react-multi-carousel';

const SaleHeader = ({ 
  imageSlide,
  salePrice,
  fullPrice,
  discountPercent,
  saleAmount,
  flashSale,
  shipTypes,
  paymentMethod,
  productName
}) => {
    //const { add, update, products } = React.useContext(CartContext);
    

    const responsive = {
      desktop: {
          breakpoint: {
              max: 3000,
              min: 1024,
          },
          items: 1,
      },
      mobile: {
          breakpoint: {
              max: 464,
              min: 0,
          },
          items: 1,
      },
      tablet: {
          breakpoint: {
              max: 1024,
              min: 200,
          },
          items: 1,
      },
    };
    
    

    const frameArray = ['red', 'green', 'blue'];
    const frames = frameArray.map((frame, i) => {
      return <div style={{backgroundColor: frame}}>Frame {i}</div>
    })


    return (
      <div>
        
        
        <CustomCarousel 
          /*data={[
            { id : 0,
              image: 'red'
            },
            { id : 1,
              image: 'green'
            },
            { id : 2,
              image: 'blue'
            },
          ]}*/
          data={imageSlide}

        >
        </CustomCarousel>
        {/*
          <div style={{backgroundColor: "red"}}>Frame 1</div>
          <div style={{backgroundColor: "green"}}>Frame 2</div>
          <div style={{backgroundColor: "blue"}}>Frame 3</div>*/}
        
		<SalePrice>
		<p class="NameTitle">{productName}</p>
		  <p class="salePrice">฿{salePrice}</p>
          <span class="fullPrice">฿{fullPrice}</span>
          <span class="saleAmount">{saleAmount} ขายแล้ว</span>
        </SalePrice>
		<discountPercent>
		</discountPercent>
        <FlashSale flashSale={flashSale.countDownTime} />

        <SameLine>
          <PaymentMethod PaymentMethod={paymentMethod}/>
          
          <CourierDisplay couriers={shipTypes}/>
        </SameLine>
      </div>
    );
};
export default SaleHeader;
