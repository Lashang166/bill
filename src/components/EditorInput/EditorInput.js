import React, { useState, useEffect } from 'react';
//import './EditorInput.style.css';

const EditorInput = ({fieldName, value, setValue, inputType, placeholder, index, onClickRemoveButton}) => {

    return (
        <div class="field is-horizontal">
            {fieldName !== "" ?
            <div class="field-label is-normal">
                <label class="label">{fieldName}</label>
            </div>
            :
            null
            }
            <div class="field-body">
                <div class="field has-addons">
                <div class="control is-expanded">
                    <input 
                        class="input" 
                        type={inputType} 
                        placeholder={placeholder}
                        value={value} 
                        onChange={e => setValue(e, index)}
                    />
                    
                </div>
                {onClickRemoveButton && index > 0 ? 
                    <div class="control" onClick={(e) => {onClickRemoveButton(e, index)}}>
                        <a class="button is-static">
                            -
                        </a>
                    </div>
                : null}
                </div>
            </div>
        </div>
    )
}

export default EditorInput;