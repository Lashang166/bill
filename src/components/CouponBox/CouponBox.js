import React from "react";
import { CouponBoxWrapper, Input, Button, Display, CouponCode, DiscountPrice, CancelBtn } from "./CouponBox.style";
import { CloseIcon } from "../AllSvgIcon";
const CouponBox = ({ onUpdate, value, onClick, disabled, buttonTitle, intlCouponBoxPlaceholder, intlCouponApplyButton, className, style, couponPlaceholder }) => {
    return (<CouponBoxWrapper className={className} style={style}>
      <Input onUpdate={onUpdate} value={value} placeholder={couponPlaceholder} intlPlaceholderId={intlCouponBoxPlaceholder
        ? intlCouponBoxPlaceholder
        : "intlCouponBoxPlaceholder"}/>
      <Button onClick={onClick} disabled={disabled} title={buttonTitle} intlButtonId={intlCouponApplyButton}/>
    </CouponBoxWrapper>);
};
export const CouponDisplay = ({ code, currency, price, sign, onClick, style, btnStyle }) => {
    return (<Display style={style} className="couponDisplayBox">
      <CouponCode className="couponCodeText">{code}</CouponCode>
      <DiscountPrice className="discountedPrice">
        {sign}
        {currency}
        {price}
      </DiscountPrice>
      <CancelBtn onClick={onClick} btnStyle={btnStyle}>
        <CloseIcon />
      </CancelBtn>
    </Display>);
};
export default CouponBox;
