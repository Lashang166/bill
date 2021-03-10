import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import Inputs from "../Input/Input";
import Buttons from "../Button/Button";
export const Button = styled(Buttons) `
  height: calc(100% - 10px);
`;

export const FlashSaleWrapper = styled.div `
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 50px;
  padding-right: 5px;
  padding-left: 10px;
  border-radius: 6px;
  background-color: #ee4d2d;
  overflow: hidden;
  border: 1px solid #ededed;
  font-weight : 700;
`;

export const FlashSaleText = styled.p`
  display: inline;
  color: white;
  text-align: left;
  
`;

export const CountDown = styled.div`
  display: block;
  color: white;
  position: absolute;
  right: 10px;
  
`;


