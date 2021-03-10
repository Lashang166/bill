import React, { useState, useEffect } from 'react';
import { Plus, Minus } from '../AllSvgIcon';
import InputIncDecWrapper from './InputIncDec.style';
const InputIncDec = ({ onUpdate, className, value, type, style, onClick, }) => {
    const [state, setState] = useState(value);
    const addAllClasses = ['quantity'];
    if (className) {
        addAllClasses.push(className);
    }
    if (type) {
        addAllClasses.push(type);
    }
    useEffect(() => {
        setState(value);
    }, [value]);
    const increment = (e) => {
        let currentValue = state;
        setState(++currentValue);
        onUpdate(currentValue, e);
    };
    const decrement = (e) => {
        let currentValue = state;
        setState(currentValue > 0 ? --currentValue : 0);
        onUpdate(currentValue, e);
    };
    const handleOnChange = (e) => {
        let currentValue = e.target.value;
        setState(currentValue);
        onUpdate(currentValue, e);
    };
    return (<InputIncDecWrapper className={addAllClasses.join(' ')} style={style} onClick={onClick}>
      <button className="btn decBtn" onClick={decrement}>
        <Minus />
      </button>
      <input className="qnt-input" type="number" value={state} onChange={handleOnChange} readOnly/>
      <button className="btn incBtn" onClick={increment}>
        <Plus />
      </button>
    </InputIncDecWrapper>);
};
export default InputIncDec;
