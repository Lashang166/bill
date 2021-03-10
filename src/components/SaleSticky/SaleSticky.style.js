import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

export const SaleStickyWrapper = styled.div`
    text-align: center;
    position: fixed;
    bottom: 0;
    margin-left : -10px;
    width : -webkit-fill-available;
    margin-left : auto;
    background : orange;
    height : 40px;
    display: flex;
    z-index : 9999;
`;

export const LineButtonWrapper = styled.div`
    background : green;
    width : 40px;
    height : 40px;
    
    img {
        vertical-align: -webkit-baseline-middle;
    }
`;

export const FacebookButtonWrapper = styled.div`
    background : blue;
    width : 40px;
    height : 40px;
    
    img {
        vertical-align: -webkit-baseline-middle;
    }
`;

export const QuickBuyWrapper = styled.div`
    align-self : center;
    width : -webkit-fill-available;
`;