import styled from 'styled-components';

export const HTMLVirtual = styled.div`
    
    b {
        font-weight: 700;
    }
    
    i {
        font-style: italic;
    }

    mark {
        background: rgba(245,235,111,0.29);
    }
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