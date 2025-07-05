import React, { useState } from "react";
import { ethers } from "ethers";
import TransactionHistory from "./TransactionHistory";
import AddressInsight from "./AddressInsight";

function DonationSection({ account }) {
  const [ensName, setEnsName] = useState("");
  const [resolvedAddress, setResolvedAddress] = useState("");
  const [donationAmount, setDonationAmount] = useState("");
  const [donationBalance, setDonationBalance] = useState("");

  const contractAddress = "0xac45090D82da90c47a8fda64EA1676178c26b686";
  const contractABI = [
    "function donate() public payable",
    "function getDonation(address donor) view returns (uint256)"
  ];

  async function resolveENS() {
    if (!ensName) {
      alert("Please enter an ENS name.");
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const address = await provider.resolveName(ensName);
    if (!address) {
      alert("❌ ENS not found.");
      setResolvedAddress("");
      return;
    }
    setResolvedAddress(address);
  }

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

  async function fetchEthPriceInUSD() {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    );
    const data = await response.json();
    return data.ethereum.usd;
  }

  async function getBalance() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, contractABI, provider);
    const balance = await contract.getDonation(account);
    const ethAmount = ethers.utils.formatEther(balance);
    const ethPrice = await fetchEthPriceInUSD();
    const usdAmount = (parseFloat(ethAmount) * ethPrice).toFixed(2);
    setDonationBalance(`${ethAmount} ETH ($${usdAmount})`);
  }

  return (
    <div style={{ marginTop: "20px", width: "100%", maxWidth: "800px" }}>
      {/* ENS Resolve */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        marginBottom: "10px",
        justifyContent: "center"
      }}>
        <input
          type="text"
          placeholder="Search ENS name (e.g., vitalik.eth)"
          value={ensName}
          onChange={(e) => setEnsName(e.target.value)}
          style={{
            padding: "10px",
            flex: "1",
            minWidth: "220px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            color: "#333"
          }}
        />
        <button
          onClick={resolveENS}
          style={{
            padding: "10px 16px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            flexShrink: 0
          }}
        >
          Resolve ENS
        </button>
      </div>
      {resolvedAddress && (
        <p style={{ wordBreak: "break-all" }}>
          <strong>Resolved Address:</strong> {resolvedAddress}
        </p>
      )}

      {/* Donation Input */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        marginTop: "10px",
        justifyContent: "center"
      }}>
        <input
          type="text"
          placeholder="Enter donation amount in ETH"
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
          style={{
            padding: "10px",
            flex: "1",
            minWidth: "150px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            color: "#333"
          }}
        />
        <button
          onClick={donate}
          style={{
            padding: "10px 16px",
            backgroundColor: "#FF9800",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            flexShrink: 0
          }}
        >
          Donate ETH
        </button>
      </div>

      {/* Check Donation */}
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <button
          onClick={getBalance}
          style={{
            padding: "10px 16px",
            backgroundColor: "#9C27B0",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            width: "100%",
            maxWidth: "250px"
          }}
        >
          Check My Donation
        </button>
        {donationBalance && (
          <p style={{ marginTop: "10px" }}>
            🎉 <strong>Your Total Donation:</strong> {donationBalance}
          </p>
        )}
      </div>

      {/* Transaction History */}
      <TransactionHistory />
      <AddressInsight />
    </div>
  );
}

export default DonationSection;