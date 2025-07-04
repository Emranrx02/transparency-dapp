import React from "react";

function WalletManager({ account, ensName, connectWallet, disconnectWallet, changeWallet }) {
  return (
    <>
      {!account ? (
        <button
          onClick={connectWallet}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "1rem",
            marginTop: "20px"
          }}
        >
          Connect Wallet
        </button>
      ) : (
        <>
          <p><strong>Connected:</strong> {account}</p>
          {ensName && <p><strong>ENS:</strong> {ensName}</p>}

          <div style={{ marginTop: "10px" }}>
            <button
              onClick={disconnectWallet}
              style={{
                padding: "8px 12px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginRight: "8px"
              }}
            >
              Disconnect
            </button>
            <button
              onClick={changeWallet}
              style={{
                padding: "8px 12px",
                backgroundColor: "#3f51b5",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Change Wallet
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default WalletManager;