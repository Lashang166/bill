import React, {useState, useEffect} from "react";
import { PaymentMethodWrapper } from "./PaymentMethod.style";

const PaymentMethod = ({ PaymentMethod }) => {

    return (
        <PaymentMethodWrapper>
            {PaymentMethod.filter(payment => payment.active).map((payment) => {
                return (
                    <p>
                        {payment.type}
                    </p>
                );
            })

            }
        </PaymentMethodWrapper>
    );
};
export default PaymentMethod;
