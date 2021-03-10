import React from "react";

export default function BillVendor({
  VendorName,
  VendorLogo,
  VendorAddress,
  AgentMobile
}) {
  return (
    <div className="my-margin-top">    
      <div className="media">
        <div className="media-left">
          <figure className="image is-1by1" style={{ width: "70px",height:"70px" }}>
            <img className="is-rounded" src={VendorLogo ? VendorLogo : ""} alt="" />
          </figure>
      </div>
        <div className="media-content">
          <p className="title is-4">{VendorName ? VendorName : ""}</p>
          <p className="subtitle is-6">{VendorAddress ? VendorAddress : ""} |{" "}
            {AgentMobile ? AgentMobile : ""}</p>
        </div>
      </div>
    </div>
  );
}
