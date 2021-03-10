import React from 'react';
import { CartPopupButtonStyled, ButtonImgBox, ItemCount, PriceBox, CartPopupBoxButton, PriceBoxAlt, TotalItems, } from './CartPopup.style';
import { ShoppingBag } from '../AllSvgIcon';
const CartPopupButton = ({ itemCount, itemPostfix = 'items', price, priceSuffix = 'บาท', style, onClick, className, }) => (<CartPopupButtonStyled style={style} onClick={onClick} className={className}>
    <ButtonImgBox>
      <ShoppingBag />
    </ButtonImgBox>
    <ItemCount>
      {itemCount} {itemPostfix}
    </ItemCount>
    <PriceBox>
      {parseFloat(`${price}`).toFixed(2)}{' '}
      {priceSuffix}
    </PriceBox>
  </CartPopupButtonStyled>);
export const BoxedCartButton = ({ itemCount, itemPostfix = 'items', price, priceSuffix = 'บาท', style, onClick, className, }) => (<CartPopupBoxButton style={style} onClick={onClick} className={className}>
    <TotalItems>
      <ShoppingBag />
      {itemCount} {itemPostfix}
    </TotalItems>
    <PriceBoxAlt>
      {parseFloat(`${price}`).toFixed(2)}
      {priceSuffix}
    </PriceBoxAlt>
  </CartPopupBoxButton>);
export default CartPopupButton;
