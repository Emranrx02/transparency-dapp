import React, { useState } from "react";
import { ethers } from "ethers";

const contractAddress = "0xac45090D82da90c47a8fda64EA1676178c26b686";
const contractABI = [
  "event DonationReceived(address indexed donor, uint256 amount, uint256 timestamp)"
];

function AddressInsight() {
  const [input, setInput] = useState("");
  const [balance, setBalance] = useState(null);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchInsight = async () => {
    if (!input) {
      setError("Please enter ENS name or address.");
      return;
    }
    setLoading(true);
    setError("");
    setBalance(null);
    setDonations([]);

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      let address = input;

      // ENS resolve
      if (input.endsWith(".eth")) {
        address = await provider.resolveName(input);
        if (!address) throw new Error("Invalid ENS name.");
      }

      // Balance
      const bal = await provider.getBalance(address);
      setBalance(parseFloat(ethers.utils.formatEther(bal)));

      // Contract Donations
      const contract = new ethers.Contract(contractAddress, contractABI, provider);
      const filter = contract.filters.DonationReceived(address);
      const events = await contract.queryFilter(filter);
      setDonations(
        events.map((e) => ({
          hash: e.transactionHash,
          amount: ethers.utils.formatEther(e.args.amount),
          date: new Date(e.args.timestamp.toNumber() * 1000).toLocaleString()
        }))
      );

    } catch (err) {
      console.error(err);
      setError("Error fetching data.");
    }
    setLoading(false);
  };

  return (
    <div style={{
      margin: "2rem auto",
      maxWidth: "800px",
      background: "#e6f7ec",
      padding: "1.5rem",
      borderRadius: "10px",
      boxShadow: "0 0 8px rgba(13, 134, 47, 0.1)"
    }}>
      <h3 style={{ textAlign: "center", marginBottom: "1rem", color: "#2e7d32" }}>
        🔍 Address Donation Insight
      </h3>
      <div style={{ display: "flex", gap: "10px", marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="ENS or Address"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1, padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <button
          onClick={fetchInsight}
          style={{
            padding: "10px",
            background: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {balance !== null && (
        <p style={{ marginTop: "1rem", fontWeight: "bold", color: "#2e7d32" }}>
          ✅ Live Balance: {balance.toFixed(4)} ETH
        </p>
      )}

      {donations.length > 0 && (
        <>
          <h4 style={{ marginTop: "1.5rem", color: "#2e7d32" }}>
            🎁 Contract Donations
          </h4>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "0.5rem" }}>
            <thead>
              <tr>
                <th style={thStyle}>Tx Hash</th>
                <th style={thStyle}>Amount</th>
                <th style={thStyle}>Date</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((d) => (
                <tr key={d.hash}>
                  <td style={tdStyle}>
                    <a href={`https://etherscan.io/tx/${d.hash}`} target="_blank" rel="noopener noreferrer">
                      {d.hash.slice(0, 10)}...
                    </a>
                  </td>
                  <td style={{ ...tdStyle, color: "#c62828", fontWeight: "bold" }}>
                    {d.amount} ETH
                  </td>
                  <td style={{ ...tdStyle, color: "#2e7d32" }}>
                    {d.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

const thStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  background: "#a5d6a7",
  color: "#333"
};

const tdStyle = {
  border: "1px solid #ccc",
  padding: "8px",
  textAlign: "center",
  background: "#f9f9f9"
};

export default AddressInsight;