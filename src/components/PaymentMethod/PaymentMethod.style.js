import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import Inputs from "../Input/Input";
import Buttons from "../Button/Button";
export const Button = styled(Buttons) `
  height: calc(100% - 10px);
`;

export const PaymentMethodWrapper = styled.div `
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 50px;
  padding-right: 5px;
  p {
    margin-left: 10px;
    background-color: #009E7F;
    color: white;
    border-radius: .25rem;
    line-height: 1;
    width: max-content;
    padding: .25em .4em;
  }
`;