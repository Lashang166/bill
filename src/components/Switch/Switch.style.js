import styled from "styled-components";

const SwitchStyled = styled.div`
.switch[type=checkbox]:checked+label::after {
  left: 1.625rem;
}

.switch[type=checkbox]+label::after, .switch[type=checkbox]+label:after {
  display: block;
  position: absolute;
  top: .25rem;
  left: .25rem;
  width: 1rem;
  height: 1rem;
  -webkit-transform: translate3d(0,0,0);
  transform: translate3d(0,0,0);
  border-radius: 4px;
  background: #fff;
  -webkit-transition: all .25s ease-out;
  transition: all .25s ease-out;
  content: '';

`;

export default SwitchStyled;
