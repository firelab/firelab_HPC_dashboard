import React, { useState, useEffect } from "react";

export default function ViewLogs() {
  const [logLines, setLogLines] = useState([]);
  const [jobId, setJobId] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!jobId) return; // Skip if jobId is not set

    const eventSource = new EventSource(
      `https://ninjastorm.firelab.org/hpc_dashboard/api/get-log/${jobId}`
    );

    eventSource.onmessage = (event) => {
      const logData = event.data.trim();
      if (logData) {
        setLogLines((prev) => [...prev, logData]);
      }
    };

    eventSource.onerror = () => {
      setError("Error receiving log data. Please try again.");
      console.error("Error receiving log data.");
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [jobId]);

  const handleJobIdChange = (e) => {
    setLogLines([]);
    setError(null);
    setJobId(e.target.value);
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>View Logs</h2>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="jobId">Enter Job ID:</label>
        <input
          id="jobId"
          type="text"
          value={jobId}
          onChange={handleJobIdChange}
          placeholder="Enter Job ID"
          style={{ marginLeft: "1rem", padding: "0.5rem", width: "200px" }}
        />
      </div>

      {error && (
        <div style={{ color: "red", marginTop: "1rem" }}>
          <strong>{error}</strong>
        </div>
      )}

      {jobId && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Logs for Job ID: {jobId}</h3>
          <div
            style={{
              backgroundColor: "#f4f4f4",
              padding: "1em",
              height: "300px",
              overflowY: "auto",
            }}
          >
            {logLines.length > 0 ? (
              logLines.map((line, index) => (
                <p key={index} style={{ whiteSpace: "pre-wrap" }}>
                  {line}
                </p>
              ))
            ) : (
              <p>No logs available yet. Waiting for updates...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
