import React from "react";

function DonationSection({ donationAmount, setDonationAmount, donate, getBalance, donationBalance }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <div>
        <input
          type="text"
          placeholder="Enter donation amount in ETH"
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
          style={{
            padding: "8px",
            width: "150px",
            marginRight: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            color: "#333"
          }}
        />
        <button
          onClick={donate}
          style={{
            padding: "8px 12px",
            backgroundColor: "#FF9800",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Donate ETH
        </button>
      </div>
      <button
        onClick={getBalance}
        style={{
          padding: "8px 12px",
          backgroundColor: "#9C27B0",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginTop: "10px"
        }}
      >
        Check My Donation
      </button>
      {donationBalance && (
        <p style={{ fontSize: "1.2rem", marginTop: "10px" }}>
          🎉 <strong>Your Total Donation:</strong> {donationBalance} ETH
        </p>
      )}
    </div>
  );
}

export default DonationSection;