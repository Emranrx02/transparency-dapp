import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

function TransactionHistory() {
  const [events, setEvents] = useState([]);

  const contractAddress = "0xac45090D82da90c47a8fda64EA1676178c26b686";
  const contractABI = React.useMemo(() => [
    "event DonationReceived(address indexed donor, uint256 amount, uint256 timestamp)"
  ], []);

  useEffect(() => {
    async function fetchEvents() {
      if (!window.ethereum) return;

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractABI, provider);

      const filter = contract.filters.DonationReceived();
      const logs = await contract.queryFilter(filter, 0, "latest");

      const parsedLogs = logs.map(log => ({
        donor: log.args.donor,
        amount: ethers.utils.formatEther(log.args.amount),
        time: new Date(log.args.timestamp.toNumber() * 1000).toLocaleString()
      }));

      setEvents(parsedLogs.reverse());
    }

    fetchEvents();
  }, [contractABI]);

  return (
    <div style={{ marginTop: "10px" }}>
      <h3>Donation History</h3>
      {events.length === 0 ? (
        <p>No donations yet.</p>
      ) : (
        <table style={{ width: "100%", color: "white", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ddd" }}>Donor</th>
              <th style={{ borderBottom: "1px solid #ddd" }}>Amount (ETH)</th>
              <th style={{ borderBottom: "1px solid #ddd" }}>Time</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, idx) => (
              <tr key={idx}>
                <td>{event.donor}</td>
                <td>{event.amount}</td>
                <td>{event.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TransactionHistory;