import React, { useEffect, useState } from "react";

const API_URL = "http://192.168.46.5:8000";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [action, setAction] = useState("");
  const [forwardedTo, setForwardedTo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApplications();
    fetchFaculties();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/applications/applications`, {
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

  const fetchFaculties = async () => {
    try {
      const response = await fetch(`${API_URL}/faculty/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch faculties");

      setFaculties(data.faculty || []);
    } catch (error) {
      console.error("Error fetching faculties:", error);
    }
  };

  const handleActionSubmit = async (e) => {
    e.preventDefault();
    if (!selectedApplication || !action) {
      return alert("Please select an application and action.");
    }

    try {
      const response = await fetch(`${API_URL}/applications/action`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify({
          action,
          applicationId: selectedApplication.id,
          forwardedTo: action === "forwarded" ? forwardedTo : null,
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to perform action");

      alert("Action performed successfully!");
      fetchApplications(); // Refresh applications after action
      setSelectedApplication(null);
      setAction("");
      setForwardedTo("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary">Pending Applications</h2>

      {loading && <p className="text-center">Loading applications...</p>}
      {error && <p className="text-center text-danger">{error}</p>}

      {!loading && !error && applications.length === 0 && (
        <p className="text-center text-muted">No applications found.</p>
      )}

      <ul className="list-group">
        {applications.map((app) => (
          <li
            key={app.id}
            className={`list-group-item ${selectedApplication?.id === app.id ? "active" : ""}`}
            onClick={() => setSelectedApplication(app)}
            style={{ cursor: "pointer" }}
          >
            <strong>{app.title}</strong> - {app.description}
          </li>
        ))}
      </ul>

      {selectedApplication && (
        <form onSubmit={handleActionSubmit} className="mt-4 p-4 border rounded bg-light">
          <h4>Take Action on: {selectedApplication.title}</h4>

          <label className="form-label">Select Action</label>
          <select className="form-select mb-3" value={action} onChange={(e) => setAction(e.target.value)}>
            <option value="">-- Choose Action --</option>
            <option value="approved">Approve</option>
            <option value="rejected">Reject</option>
            <option value="forwarded">Forward</option>
          </select>

          {action === "forwarded" && (
            <div>
              <label className="form-label">Select Faculty to Forward</label>
              <select
                className="form-select mb-3"
                value={forwardedTo}
                onChange={(e) => setForwardedTo(e.target.value)}
                required
              >
                <option value="">-- Choose Faculty --</option>
                {faculties.map((faculty) => (
                  <option key={faculty.id} value={faculty.id}>
                    {faculty.fullName} - {faculty.department}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button type="submit" className="btn btn-primary">Submit Action</button>
        </form>
      )}
    </div>
  );
};

export default Applications;