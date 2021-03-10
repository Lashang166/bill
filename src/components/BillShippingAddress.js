import React, {Fragment} from "react";

export default function ShippingAddress({
  ShippingAddress,
  BillStatus,
  setBillStatus
}) {
  return (
    <div className="" id="step2">
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">ที่อยู่จัดส่ง</p>
          {parseFloat(BillStatus) < 3.2 ? (
            <a
              href="#t"
              className="card-header-icon"
              aria-label="more options"
              onClick={e => {
                e.preventDefault();
                setBillStatus("2");
              }}
            >
              <span className="icon my-margin-right">
                <i className="far fa-edit" aria-hidden="true" />
              </span>
              แก้ไข
            </a>
          ) : null}
        </header>
        <div className="card-content">
          <div className="content">
            ส่งถึง {ShippingAddress.Name}
            <br />
            เบอร์ติดต่อ {ShippingAddress.Mobile}
            <hr />
            ที่อยู่
            <br />
            {`${ShippingAddress.Address}
          ${ShippingAddress.SubDistrict}
          ${ShippingAddress.District}
          ${ShippingAddress.Province}
          ${ShippingAddress.Postcode}`}
            <br />
            {ShippingAddress.Note?(<Fragment>โน๊ต:<br />{ShippingAddress.Note}</Fragment>):''}
          </div>
        </div>
      </div>
    </div>
  );
}
