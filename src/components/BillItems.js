import React from "react";
import formatMoney from "../lib/FormatMoney";

const ItemDetail = item => {
  const thisItem = item.item;
  return (
    <div className="media">
      <figure className="media-left">
        <p className="image is-64x64">
          <img src={thisItem.image} alt="thisItem.SKU" />
        </p>{" "}
      </figure>{" "}
      <div className="media-content">
        <div className="content">
          <div> {thisItem.Description} </div>{" "}
          <div className="is-normal" style={{ fontSize: ".8rem" }}>
            {" "}
            [{thisItem.SKU}] {formatMoney(thisItem.Amount, 0)}X{" "}
            {formatMoney(thisItem.PricePerUnit)}{" "}
            <span className="is-pulled-right" style={{ fontSize: "1rem" }}>
              {" "}
              {formatMoney(
                parseFloat(thisItem.Amount) * parseFloat(thisItem.PricePerUnit)
              )}{" "}
              <span className="my-padding-left"> บาท </span>{" "}
            </span>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
    // <div className="my-padding-bottom">
    //   <div>{thisItem.Description}</div>
    //   <div>
    //     {thisItem.SKU}: {formatMoney(thisItem.Amount, 0)} X{" "}
    //     {formatMoney(thisItem.PricePerUnit)}
    //     <span className="is-pulled-right">
    //       {formatMoney(
    //         parseFloat(thisItem.Amount) * parseFloat(thisItem.PricePerUnit)
    //       )}
    //       <span className="my-padding-left">บาท</span>
    //     </span>
    //   </div>
    // </div>
  );
};

export default function BillItems({ items }) {
  return (
    <div className="my-padding">
      <div>
        <strong> รายการสินค้า </strong>{" "}
      </div>{" "}
      {items.map((item, idx) => {
        return <ItemDetail item={item} key={idx} />;
      })}{" "}
    </div>
  );
}
