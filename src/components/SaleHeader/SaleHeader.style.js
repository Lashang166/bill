import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

export const SaleHeaderWrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: #fff;
  position: relative;
  font-family: 'Lato', sans-serif;
  border-radius: 6px;
  cursor: pointer;
`;

export const SalePrice = styled.p`
  font-weight : 700;
  padding-left: 10px;
  color: #ee4d2d;
  
  .fullPrice {
	
	-webkit-text-decoration-line: line-through; /* Safari */
	text-decoration-line: line-through;
	text-decoration-color: black;	
	font-size : 0.8em;
	color:rgba(0,0,0,.26);
  }
  
  .salePrice {
	  font-size : 1.5rem;
  }
  
  .NameTitle {
	  font-size : 1 rem;
	  color: rgba(0,0,0,.87);
  }
  
  .saleAmount {
	float: right;
	padding-right: 10px; 
	font-size : 0.8rem;
  }
  
`;

export const SameLine = styled.div`
  display: flex;
  font-size : 0.8rem;

`;