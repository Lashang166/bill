import React, { useState } from "react";

export default function ModalImage({ showHide, setmodal, modalImg, totalPrice }) {
  //const [modalshow, setmodalshow] = useState(showHide);

  const showHideClassName = showHide === true ? "modal is-active" : "modal";

  return (
    <div className={showHideClassName}>
      <div
        className="modal-background"
        onClick={() => {
          setmodal(false);
        }}
        style={{ cursor: "pointer" }}
      />
      <header className="modal-card-head">
      <p className="modal-card-title">ยอดชำระ: {totalPrice}</p>
      </header>
      <div  className="modal-content">
        <p className="image">
          <img src={modalImg} alt="" />
        </p>
      </div >
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={() => {
          setmodal(false);
        }}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}
