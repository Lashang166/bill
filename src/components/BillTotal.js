import React, {useEffect} from "react";
import formatMoney from "../lib/FormatMoney";

export default function BillTotal({
  TotalValue,
  PostalCharge,
  PostalName,
  Discount,
  DiscountType,
  COD,
  setCOD
}) {
  const DiscountValue =
    DiscountType === "VALUE"
      ? Discount
      : TotalValue * (parseFloat(Discount) / 100);

  useEffect(() => {
    
    setCOD(TotalValue + PostalCharge - DiscountValue);

  });
  return (
    <div className="my-padding">
      <div>
        ค่าสินค้า
        <span className="is-pulled-right">{formatMoney(TotalValue)} บาท</span>
      </div>
      {parseFloat(Discount) > 0 ? (
        <div>
          ส่วนลด
          <span className="is-pulled-right has-text-danger">
           - {formatMoney(DiscountValue)} บาท
          </span>
        </div>
      ) : null}
      <div>
        ค่าส่งสินค้า {PostalName}
        <span className="is-pulled-right">{formatMoney(PostalCharge)} บาท</span>
      </div>
      <div>
        <strong className="is-size-5">รวมเป็นเงิน</strong>
        <strong className="is-pulled-right is-size-5 has-text-success">
          {formatMoney(TotalValue + PostalCharge - DiscountValue)} บาท
        </strong>
      </div>
    </div>
  );
}
