import React, { useState } from "react";
import axios from "axios";

export default function UploadScript() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setMessage(""); // Clear any previous messages
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5001/hpc_dashboard/api/upload-sbatch",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(`Upload successful: ${response.data.message}`);
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Failed to upload script. Please try again.");
    }
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <h2>Upload SBATCH Script</h2>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <input
          type="file"
          onChange={handleFileChange}
          accept=".sbatch"
          style={{ padding: "0.5rem", border: "1px solid #ccc" }}
        />
        <button
          onClick={handleUpload}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Upload
        </button>
      </div>
      {message && (
        <div style={{ marginTop: "1rem", color: message.startsWith("Upload successful") ? "green" : "red" }}>
          {message}
        </div>
      )}
    </div>
  );
}
