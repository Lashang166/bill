import React from 'react';
import EditorInput from '../EditorInput/EditorInput';

const EditorMultiInput = ({
    fieldName, 
    valueList, 
    setValueByIndex, 
    inputType, 
    placeholder, 
    addButtonName, 
    onClickAddButton, 
    onClickRemoveButton
}) => {

    return (
        <>
            {valueList.map((description, index) => {
                return (
                    <>
                    <EditorInput
                        index={index}
                        fieldName={index === 0 ? fieldName : null}
                        value={description.line}
                        setValue={setValueByIndex}
                        inputType={inputType}
                        placeholder={placeholder}
                        onClickRemoveButton={onClickRemoveButton}
                    />
                    </>
                )
            })
            }
            

            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label"></label>
                </div>
                <div class="field-body">
                    <div class="field">
                    <div class="control">
                        <button class="button is-outlined is-fullwidth is-rounded" style={{
                        border: "1px dashed #1791f2",
                        color: "#1791f2",
                            }} 
						onClick={onClickAddButton}><i class="fas fa-plus-circle fas fa-lg"></i>{addButtonName}</button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditorMultiInput;