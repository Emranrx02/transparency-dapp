import React, { useState } from "react";
import { ethers } from "ethers";
import RoleSelector from "./components/RoleSelector";
import WalletManager from "./components/WalletManager";
import ENSResolver from "./components/ENSResolver";
import DonationSection from "./components/DonationSection";
import TransactionHistory from "./components/TransactionHistory";
import KYCSection from "./components/KYCSection";

function App() {
  const [userRole, setUserRole] = useState(""); // "needy" or "donor"
  const [account, setAccount] = useState("");
  const [ensName, setEnsName] = useState("");
  const [ensSearchName, setEnsSearchName] = useState("");
  const [ensSearchResult, setEnsSearchResult] = useState("");
  const [showKYC, setShowKYC] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");
  const [donationBalance, setDonationBalance] = useState("");

  const contractAddress = "0xAcDF97aAD93CF81f8a85E732E982e889F73364C2";
  const contractABI = [
    "function donate() public payable",
    "function getDonation(address donor) view returns (uint256)"
  ];

  // Connect Wallet
  async function connectWallet() {
    if (window.ethereum) {
      const [selectedAccount] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(selectedAccount);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const ens = await provider.lookupAddress(selectedAccount);
      setEnsName(ens || "");
    } else {
      alert("Please install MetaMask!");
    }
  }

  // Disconnect
  function disconnectWallet() {
    setAccount("");
    setEnsName("");
    setEnsSearchName("");
    setEnsSearchResult("");
    setDonationAmount("");
    setDonationBalance("");
    setShowKYC(false);
    setUserRole("");
  }

  // Change Wallet
  async function changeWallet() {
    await connectWallet();
  }

  // ENS Search
  async function resolveENSName() {
    if (!ensSearchName) {
      alert("Please enter an ENS name.");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const address = await provider.resolveName(ensSearchName);

    if (address) {
      setEnsSearchResult(address);
    } else {
      setEnsSearchResult("❌ ENS not found.");
    }
  }

  // Donate ETH
  async function donate() {
    if (!donationAmount) {
      alert("Please enter an amount.");
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    const tx = await contract.donate({
      value: ethers.utils.parseEther(donationAmount),
    });
    await tx.wait();
    alert(`Donation of ${donationAmount} ETH successful!`);
  }

  // Get Donation Balance
  async function getBalance() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, contractABI, provider);
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
        background: "linear-gradient(270deg, rgb(36,203,147), rgb(26,200,151))",
        backgroundSize: "400% 400%",
        animation: "gradientBG 15s ease infinite",
        fontFamily: "Arial, sans-serif",
        color: "white",
        textAlign: "center",
        padding: "1rem"
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
          Welcome to Transparency World 🌟
        </h1>

        {!userRole && <RoleSelector setUserRole={setUserRole} />}

        {userRole && (
          <>
            <WalletManager
              account={account}
              ensName={ensName}
              connectWallet={connectWallet}
              disconnectWallet={disconnectWallet}
              changeWallet={changeWallet}
            />

            {account && (
              <>
                <ENSResolver
                  ensSearchName={ensSearchName}
                  setEnsSearchName={setEnsSearchName}
                  resolveENSName={resolveENSName}
                  ensSearchResult={ensSearchResult}
                />

                {userRole === "donor" && (
                  <>
                    <DonationSection
                      donationAmount={donationAmount}
                      setDonationAmount={setDonationAmount}
                      donate={donate}
                      getBalance={getBalance}
                      donationBalance={donationBalance}
                    />

                    <TransactionHistory />

                    {!showKYC && (
                      <button
                        onClick={() => setShowKYC(true)}
                        style={{
                          padding: "10px 20px",
                          backgroundColor: "#2196F3",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                          marginTop: "10px",
                        }}
                      >
                        Start KYC
                      </button>
                    )}
                    {showKYC && <KYCSection />}
                  </>
                )}

                {userRole === "needy" && (
                  <>
                    {!showKYC && (
                      <button
                        onClick={() => setShowKYC(true)}
                        style={{
                          padding: "10px 20px",
                          backgroundColor: "#2196F3",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                          marginTop: "10px",
                        }}
                      >
                        Start KYC
                      </button>
                    )}
                    {showKYC && <KYCSection />}
                  </>
                )}
              </>
            )}
          </>
        )}

        <style>{`
          @keyframes gradientBG {
            0% {background-position: 0% 50%;}
            50% {background-position: 100% 50%;}
            100% {background-position: 0% 50%;}
          }
        `}</style>
      </div>
    </div>
  );
}

export default App;