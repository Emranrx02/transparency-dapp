import React, { useState } from "react";
import { ethers } from "ethers";
import KYCForm from "./KYCForm";
import TransactionHistory from "./TransactionHistory";

function App() {
  const [account, setAccount] = useState("");
  const [ensName, setEnsName] = useState("");
  const [resolvedAddress, setResolvedAddress] = useState("");
  const [donationAmount, setDonationAmount] = useState("");
  const [donationBalance, setDonationBalance] = useState("");

  async function connectWallet() {
    if (window.ethereum) {
      const [selectedAccount] = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(selectedAccount);
    } else {
      alert("Please install MetaMask!");
    }
  }

  async function resolveENS() {
    console.log("ENS Name Resolving:", ensName);

    if (!ensName) {
      alert("Please enter an ENS name.");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const address = await provider.resolveName(ensName);

    if (!address) {
      alert("❌ This ENS name is not registered.");
      setResolvedAddress("");
      return;
    }

    setResolvedAddress(address);

    alert(`✅ You are connected to ENS.\n🔒 This address is trusted and verified on Ethereum. No one can change it.\n\nResolved Address:\n${address}`);
  }

  const contractAddress = "0xAcDF97aAD93CF81f8a85E732E982e889F73364C2";

  const contractABI = [
    "function donate() public payable",
    "function getDonation(address donor) view returns (uint256)"
  ];

  async function donate() {
    if (!donationAmount) {
      alert("Please enter an amount.");
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    const tx = await contract.donate({
      value: ethers.utils.parseEther(donationAmount)
    });
    await tx.wait();
    alert(`Donation of ${donationAmount} ETH successful!`);
  }

  async function getBalance() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    console.log("Checking donation for:", account);

    const balance = await contract.getDonation(account);
    setDonationBalance(ethers.utils.formatEther(balance));
  }

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
        padding: "2rem"
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        Welcome to Transparency World – Make the World Via Blockchain
      </h1>

      <h2 style={{ marginBottom: "1rem" }}>Donation DApp</h2>

      {!account && (
        <button
          onClick={connectWallet}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "1rem"
          }}>
          Connect Wallet
        </button>
      )}

      {account && (
        <>
          <p><strong>Connected:</strong> {account}</p>

          <div style={{ margin: "10px 0" }}>
            <input
              type="text"
              placeholder="Enter ENS name (e.g., vitalik.eth)"
              value={ensName}
              onChange={(e) => setEnsName(e.target.value)}
              style={{
                padding: "8px",
                width: "250px",
                marginRight: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                color: "#333"
              }}
            />
            <button
              onClick={resolveENS}
              style={{
                padding: "8px 12px",
                backgroundColor: "#2196F3",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}>
              Resolve ENS
            </button>
          </div>

          {resolvedAddress && (
            <p><strong>Resolved Address:</strong> {resolvedAddress}</p>
          )}

          <div style={{ margin: "10px 0" }}>
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
              }}>
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
              cursor: "pointer"
            }}>
            Check My Donation
          </button>

          {donationBalance && (
            <p style={{ fontSize: "1.2rem", marginTop: "10px" }}>
              🎉 <strong>Your Total Donation:</strong> {donationBalance} ETH
            </p>
          )}
        </>
      )}

      {/* Animation Keyframes */}
      <style>{`
        @keyframes gradientBG {
          0% {background-position: 0% 50%;}
          50% {background-position: 100% 50%;}
          100% {background-position: 0% 50%;}
        }
      `}</style>

      {/* Transaction History */}
      <TransactionHistory />

      {/* KYC Form */}
      <KYCForm />
    </div>
  );
}

export default App;