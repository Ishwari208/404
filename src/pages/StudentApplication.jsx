import React, { useEffect, useState } from "react";

const API_URL = "http://192.168.46.5:8000/applications";

const StudentApplication = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [applicationDetails, setApplicationDetails] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => { 
    fetchStudentApplications();
  }, []);

  const fetchStudentApplications = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/my-applications`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch applications");

      setApplications(data.applications || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplicationDetails = async (applicationId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/application-details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify({ applicationId }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch details");

      setApplicationDetails(data.application);
      setLogs(data.logs);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary">My Applications</h2>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-danger">{error}</p>}

      {!loading && !error && applications.length === 0 && (
        <p className="text-center text-muted">No applications found.</p>
      )}

      <ul className="list-group mt-3">
        {applications.map((app) => (
          <li key={app.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{app.title}</strong> - {app.status}
            </div>
            <button className="btn btn-outline-primary btn-sm" onClick={() => fetchApplicationDetails(app.id)}>
              View Details
            </button>
          </li>
        ))}
      </ul>

      {applicationDetails && (
        <div className="mt-4 p-4 border rounded shadow-sm bg-light">
          <h4 className="text-dark">{applicationDetails.title}</h4>
          <p><strong>Description:</strong> {applicationDetails.description}</p>
          <p><strong>Type:</strong> {applicationDetails.type}</p>
          <p><strong>Status:</strong> {applicationDetails.status}</p>
          <p><strong>Last Updated:</strong> {applicationDetails.lastUpdated || "Not updated yet"}</p>

          <h5 className="mt-3 text-secondary">Application Logs</h5>
          {logs.length > 0 ? (
            <ul className="list-group">
              {logs.map((log, index) => (
                <li key={index} className="list-group-item">
                  <strong>{log.action}</strong> - {log.from} → {log.to || "N/A"} on {log.timestamp}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No logs available.</p>
          )}

          <button className="btn btn-secondary mt-3" onClick={() => setApplicationDetails(null)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentApplication;