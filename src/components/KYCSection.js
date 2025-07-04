import React from "react";
import KYCForm from "./KYCForm";

function KYCSection() {
  return (
    <div
      style={{
        marginTop: "20px",
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "6px",
        color: "#333",
        maxWidth: "400px",
        width: "100%"
      }}
    >
      <KYCForm />
    </div>
  );
}

export default KYCSection;