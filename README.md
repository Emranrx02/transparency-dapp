# 🌟 Transparency DApp - Decentralized Donation and KYC Platform

Welcome to **Transparency World**, a decentralized application built with **React** and **Ethereum smart contracts**. This project empowers transparency and trust in donations by leveraging blockchain technology.

---

## 🚀 Features

✅ **Connect Wallet**
- Users can securely connect their Ethereum wallet (e.g., MetaMask).

✅ **Role Selection**
- Choose between:
  - **I am Needy**: Verify identity and submit KYC.
  - **I want to Donate**: Send donations transparently.

✅ **ENS Resolution**
- Lookup ENS names to Ethereum addresses.

✅ **Donation**
- Donate ETH directly to the smart contract.
- See your total donated amount and its USD equivalent.

✅ **Transaction History**
- View all donation events stored on the blockchain.
- All records are immutable and verifiable.

✅ **Address Donation Insight**
- Search any Ethereum address to see:
  - Live balance.
  - Contract donations with date and transaction hash.

✅ **KYC Form**
- Needy users can submit identity information and documents for verification.

✅ **Responsive Design**
- Mobile-friendly layout and styling.

---

## ⚙️ Technologies Used

- **Frontend:** React.js, Ethers.js
- **Smart Contract:** Solidity (deployed on Sepolia Testnet)
- **Styles:** Inline CSS with responsive adjustments
- **APIs:**
  - CoinGecko (ETH/USD price)
  - Etherscan (optional for additional transaction data)

---

## 📂 Project Structure

---
src/
components/
AddressInsight.js      # ENS and donation lookup
DonationSection.js     # Donation logic and UI
KYCForm.js             # KYC submission form
KYCSection.js          # KYC container
RoleSelector.js        # Role selection buttons
TransactionHistory.js  # Donation history table
WalletManager.js       # Connect/disconnect wallet
App.js                   # Main application logic
App.css                  # Global styles
contracts/
DonationContract.sol     # Solidity smart contract

## 🏗️ How to Run

1️⃣ **Install dependencies:**

npm install

2️⃣ **Start the development server:**

npm start

3️⃣ **Build for production:**

npm run build

4️⃣ **Deploy:**
- Recommended: Vercel or Netlify

---

## 📜 Smart Contract Info

- **Address:** `0xac45090D82da90c47a8fda64EA1676178c26b686`
- **Network:** Sepolia Testnet
- **Functions:**
  - `donate()`: Accepts ETH donations
  - `getDonation(address)`: Returns total donated amount
  - `DonationReceived`: Event emitted on each donation

---

## 💡 Future Enhancements

- Email notifications on KYC approval
- Detailed donation analytics
- Multi-network support (Goerli, Mainnet)

---

## 🙏 Credits

Made with ❤️ by Emran haque - https://emranhaque.com

---

## 📧 Contact

If you have any questions, feel free to open an issue or contact me.
