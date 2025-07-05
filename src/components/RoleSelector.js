import React from "react";

function RoleSelector({ setRole }) {
  return (
    <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
      <button
        onClick={() => setRole("needy")}
        style={{
          padding: "12px 20px",
          backgroundColor: "#2196F3",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "1rem"
        }}
      >
        I am Needy
      </button>
      <button
        onClick={() => setRole("donor")}
        style={{
          padding: "12px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "1rem"
        }}
      >
        I want to Donate
      </button>
    </div>
  );
}

export default RoleSelector;