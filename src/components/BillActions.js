import React from "react";

import BillActionPayment from "./BillActionPayment";
import BillActionPostalAddress from "./BillActionPostalAddress";
// import BillActionProcessing from "./BillActionProcessing";
// import BillActionOrderSent from "./BillActionOrderSent";

function renderStep(
  BillNo,
  step,
  BankAccounts,
  Payment,
  ShippingAddress,
  setPayment,
  setBillStatus,
  setShippingAddress,
  COD,
  setBillCOD,
  isAdmin,
  lineNotif,
  SelectedShipType,
  Datachannel,
  totalAmount,
  replaceEmoji
) {
  //console.log("BillActions:Payment", Payment);
  switch (parseInt(step, 10)) {
    case 1:
      return (
        <BillActionPayment
          BillNo={BillNo}
          BankAccounts={BankAccounts}
          Payment={Payment}
          COD={COD}
          setBillCOD={setBillCOD}
          setBillStatus={status => {
            if (parseInt(status, 10) === 1) {
              setPayment("");
            }
            setBillStatus(status);
          }}
          SetPaymentData={(fileUrl, cod) => {
            setPayment(fileUrl, cod);
          }}
          isAdmin={isAdmin}
        />
      );

    case 2:
      return (
        <BillActionPostalAddress
          ShippingAddress={ShippingAddress}
          updateShippingAddress={setShippingAddress}
          setBillStatus={setBillStatus}
          isAdmin={isAdmin}
          lineNotif={lineNotif}
          SelectedShipType={SelectedShipType}
          Datachannel={Datachannel}
          totalAmount={totalAmount}
          replaceEmoji={replaceEmoji}
        />
      );
    // case 3:
    // return <BillActionProcessing BillNo={BillNo} />;
    // case 4:
    // return (
    //   <BillActionOrderSent
    //     BillNo={BillNo}
    //     tracking={ShippingAddress.Tracking}
    //   />
    // );
    // case 5:
    //   return null;
    default:
      return null;
  }
}

export default function BillActions({
  BillNo,
  BankAccounts,
  ShippingAddress,
  Payment,
  setBillStatus,
  Step,
  setPayment,
  setShippingAddress,
  COD,
  setBillCOD,
  isAdmin,
  lineNotif,
  SelectedShipType,
  Datachannel,
  totalAmount,
  replaceEmoji
}) {
  return (
    <div>
      {renderStep(
        BillNo,
        Step,
        BankAccounts,
        Payment,
        ShippingAddress,
        setPayment,
        setBillStatus,
        setShippingAddress,
        COD,
        setBillCOD,
        isAdmin,
        lineNotif,
        SelectedShipType,
        Datachannel,
        totalAmount,
        replaceEmoji
      )}
    </div>
  );
}
