import React, { useState } from "react";

function TransactionHistory() {
  const [address, setAddress] = useState("");
  const [txs, setTxs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = "E9YTVSG375QXS9SGQ4VH5MZHW8E5RIBHT3"; // এখানে তোমার Etherscan API Key বসাও

  const fetchTransactions = async () => {
    if (!address) {
      setError("Please enter an address.");
      return;
    }

    setLoading(true);
    setError("");
    setTxs([]);

    try {
        const response = await fetch(
            `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`
          );
      const data = await response.json();

      if (data.status !== "1") {
        setError("No transactions found or invalid address.");
        setLoading(false);
        return;
      }

      setTxs(data.result);
    } catch (err) {
      console.error(err);
      setError("Error fetching transactions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "500px", margin: "auto" }}>
      <h2>Transaction History</h2>
      <input
        type="text"
        placeholder="Enter Ethereum Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ width: "100%", padding: "10px", marginRight: "8px" }}
      />

      <button
        onClick={fetchTransactions}
        style={{
          padding: "8px 12px",
          backgroundColor: "#2196F3",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
        
      >
        Fetch History
      </button>

      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
      )}

      {loading && (
        <p style={{ marginTop: "10px" }}>Loading transactions...</p>
      )}

      {txs.length > 0 && (
        <table
          style={{
            width: "100%",
            marginTop: "20px",
            borderCollapse: "collapse"
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Hash</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Date</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Value (ETH)</th>
            </tr>
          </thead>
          <tbody>
            {txs.slice(0, 10).map((tx) => (
              <tr key={tx.hash}>
                <td style={{ border: "1px solid #ccc", padding: "8px", wordBreak: "break-all" }}>
                  <a
                    href={`https://etherscan.io/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {tx.hash.slice(0, 12)}...
                  </a>
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {new Date(tx.timeStamp * 1000).toLocaleString()}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {(Number(tx.value) / 1e18).toFixed(4)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TransactionHistory;