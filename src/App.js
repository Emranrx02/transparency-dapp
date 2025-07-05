import React, { useState } from "react";
import RoleSelector from "./components/RoleSelector";
import WalletManager from "./components/WalletManager";
import DonationSection from "./components/DonationSection";
import KYCSection from "./components/KYCSection";

function App() {
  const [role, setRole] = useState(""); // "needy" or "donor"
  const [account, setAccount] = useState("");

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "linear-gradient(270deg, rgb(36,203,147), rgb(26,200,151))",
        backgroundSize: "400% 400%",
        animation: "gradientBG 15s ease infinite",
        fontFamily: "Arial, sans-serif",
        color: "white",
        textAlign: "center",
        padding: "1rem",
      }}
    >
      <h1 style={{
        fontSize: "1.5rem",
        marginBottom: "1rem",
        lineHeight: "1.4",
        maxWidth: "90%"
      }}>
        Welcome to Transparency World 🌟<br/>
        Via Blockchain Making the Better World
      </h1>

      {!role && (
        <RoleSelector setRole={setRole} />
      )}

      {role && (
        <div style={{
          width: "100%",
          maxWidth: "500px",
          display: "flex",
          flexDirection: "column",
          gap: "1rem"
        }}>
          <WalletManager account={account} setAccount={setAccount} />

          {account && (
            <>
              {role === "donor" && <DonationSection account={account} />}
              {role === "needy" && <KYCSection />}
            </>
          )}
        </div>
      )}

      <style>{`
        @keyframes gradientBG {
          0% {background-position: 0% 50%;}
          50% {background-position: 100% 50%;}
          100% {background-position: 0% 50%;}
        }
      `}</style>
    </div>
  );
}

export default App;