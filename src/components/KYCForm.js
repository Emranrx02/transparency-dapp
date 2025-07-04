import React, { useState } from "react";
import { db, storage } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function KYCForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !mobile || !file) {
      setMessage("❌ Please fill all fields and select an image.");
      return;
    }

    try {
      // Upload Image to Storage
      const storageRef = ref(storage, `kyc_docs/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      // Save Data to Firestore
      await addDoc(collection(db, "kyc_submissions"), {
        firstName,
        lastName,
        email,
        mobile,
        documentURL: downloadURL,
        status: "pending",
        createdAt: serverTimestamp()
      });

      setMessage("✅ KYC Submitted Successfully! We will verify soon.");
      setFirstName("");
      setLastName("");
      setEmail("");
      setMobile("");
      setFile(null);
    } catch (error) {
      console.error("Error submitting KYC:", error);
      setMessage("❌ Error submitting KYC. Please try again.");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
      <h2>KYC Verification Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Submit KYC
        </button>
      </form>
      {message && (
        <p
          style={{
            marginTop: "10px",
            color: message.includes("✅") ? "green" : "red",
            fontWeight: "bold"
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default KYCForm;