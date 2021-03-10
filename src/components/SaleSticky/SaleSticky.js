import React, { useEffect, useContext } from 'react';

import { 
    SaleStickyWrapper, 
    LineButtonWrapper, 
    FacebookButtonWrapper, 
    QuickBuyWrapper
} from './SaleSticky.style';

const SaleSticky = ({ 
    LineLink,
    FacebookLink,
}) => {
  
    return(
        <SaleStickyWrapper>
            <LineButtonWrapper
                onClick={() => {
                    window.open("https://"+LineLink);
                }}
            >
                <img src={require('../../assets/icon/Line.png')} />
            </LineButtonWrapper>
            <FacebookButtonWrapper
                onClick={() => {
                    window.open("https://"+FacebookLink);
                }}
            >
                <img src={require('../../assets/icon/Facebook.png')} />
            </FacebookButtonWrapper>
            <QuickBuyWrapper>
                <div>
                    ซื้อทันที
                </div>
            </QuickBuyWrapper>
          
        </SaleStickyWrapper>
    )
}

export default SaleSticky;