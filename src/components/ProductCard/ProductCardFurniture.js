import React from 'react';
import Image from 'components/Image/Image';
import { ProductName, DiscountPercent, ProductCardWrapper, ProductImageWrapper, ProductInfo, } from './ProductCard.style';
const ProductCard = ({ title, image, discountInPercent, onClick, }) => {
    return (<ProductCardWrapper onClick={onClick} className='furniture-card'>
      <ProductImageWrapper>
        <Image url={image} className='product-image' style={{ position: 'relative' }} alt={title}/>
        {discountInPercent ? (<>
            <DiscountPercent>{discountInPercent}%</DiscountPercent>
          </>) : ('')}
      </ProductImageWrapper>
      <ProductInfo>
        <ProductName>{title}</ProductName>
      </ProductInfo>
    </ProductCardWrapper>);
};
export default ProductCard;
