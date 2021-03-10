import React, { useState, useContext, useEffect } from "react";
import { defineLocale } from "moment";



const EditorCheckBox = ({
    paymentMethod,
    selectPaymentMethod
}) => {

    return(
        <div class="field is-horizontal">
            <div class="field-label is-normal ">
                <label class="label is-inline">ตั้งค่าวิธีการชำระเงิน</label>
            </div>
            <div class="field-body">
            <div class="field">
                <div class="control" >
                    {//<textarea class="textarea" type="text" placeholder="API components here" />
                    }
                    {paymentMethod.map((payment, idx) => {
                        //console.log(ShipType.id+"-"+idx);
                        return (
                        <div
                            key={idx}
                            style={{ cursor: "pointer", marginTop: "10px" }}
                            onClick={() => {
                                selectPaymentMethod(idx);
                            }}
                        >
                            <i
                                className={`my-padding-right far ${
                                    payment.active
                                    ? "fa-check-square has-text-success"
                                    : "fa-check-square has-text-grey-light"
                                }`}
                            />
                            
                            {payment.type}
                            <span className="is-pulled-right">
                            {" "}
                            </span>
                            
                        </div>
                        );
                    })}
                </div>
            </div>
            </div>
        </div>
    )
}

export default EditorCheckBox;