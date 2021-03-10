import React from "react";
export default function CardImage({ imageURL, imageName }) {
  const img = {
    borderRadius: "4px",

    width: "auto",
    height: "100%",
  };

  return (
    <div style={{ position: "relative" }}>
      <img src={imageURL} style={img} alt={imageName} />
    </div>
  );
}
