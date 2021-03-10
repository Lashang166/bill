import React from "react";

export default function BillActionOrderSent({ ShipType, tracking }) {
  return (
    <div class="has-text-centered">
      <h2 class="subtitle">จัดส่งสินค้าแล้ว</h2>
      <strong>วิธีการจัดส่ง {ShipType}</strong>
      <strong>หมายเลขพัสดุ {tracking}</strong>
    </div>
  );
}
