import React from "react";

function RoleSelector({ setUserRole }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <button
        onClick={() => setUserRole("needy")}
        style={{
          padding: "12px 20px",
          marginRight: "10px",
          backgroundColor: "#2196F3",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        I am Needy
      </button>
      <button
        onClick={() => setUserRole("donor")}
        style={{
          padding: "12px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        I want to Donate
      </button>
    </div>
  );
}

export default RoleSelector;