import React from 'react';
import SwitchStyled from './Switch.style';
import "bulma-extensions/bulma-switch/dist/css/bulma-switch.min.css";

const Switch = ({
    children, 
    id, 
    name, 
    value, 
    onClickButton, 
    isChecked
}) => {
    return (
        <SwitchStyled>
            <input 
                id={id} 
                className="switch is-rounded is-success" 
                type="checkbox" 
                value={value} 
                onClick={onClickButton}  
                checked={isChecked}
            />
            <label for={id}>{name}</label>
            {children}
        </SwitchStyled>
    );
};

export default Switch;