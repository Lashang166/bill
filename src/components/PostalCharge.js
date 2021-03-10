import React from "react";
import formatMoney from "../lib/FormatMoney";
export default function PostalCharge({
  ShipTypes,
  SelectedShipType,
  UpdateState
}) {
  SelectedShipType = SelectedShipType ? SelectedShipType : ShipTypes[0].id;
  return (
    <div className="my-padding">
      เลือกวิธีจัดส่งสินค้า
      {ShipTypes.map((ShipType, idx) => {
        return (
          <div
            key={idx}
            style={{ cursor: "pointer" }}
            onClick={e => {
              UpdateState(ShipType.id);
            }}
          >
            <i
              className={`my-padding-right far ${
                ShipType.id === SelectedShipType
                  ? "fa-check-square has-text-success"
                  : "fa-check-square has-text-grey-light"
              }`}
            />
            {ShipType.description}
            <span
              className={`is-pulled-right ${
                ShipType.id === SelectedShipType ? "" : "is-strike"
              }`}
            >
              {parseFloat(ShipType.rate) === 0.0
                ? "ฟรี"
                : formatMoney(ShipType.rate)}{" "}
              บาท
            </span>
          </div>
        );
      })}
      {/* <select
        className="is-pulled-right"
        value={SelectedShipType}
        onChange={e => {
          UpdateState(e.target.value);
        }}
      >
        {ShipTypes.map((ShipType, idx) => {
          // console.log(ShipType);
          return (
            <option key={idx} value={ShipType.id}>
              {ShipType.description}
            </option>
          );
        })}
        }
      </select> */}
    </div>
  );
}
