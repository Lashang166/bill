import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import Inputs from "../Input/Input";
import Buttons from "../Button/Button";
export const Button = styled(Buttons) `
  height: calc(100% - 10px);
`;

export const CourierWrapper = styled.div `

  display: flex;
  flex-direction: row;
  align-items: center;
  height: 50px;
  max-width: min-content;    
  float: right;
  margin-left: auto;

  p {
    
    margin-right: 10px;
    background-color: #009E7F;
    color: white;
    border-radius: .25rem;
    line-height: 1;
    padding: .25em .4em;
    width: max-content;
  }
`;