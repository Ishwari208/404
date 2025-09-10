import React, { useState, useEffect } from "react";

const CandidateForm = () => {
  const [formData, setFormData] = useState({
    electionId: "",
    manifesto: "",
    proposals: "",
  });

  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch elections when the component mounts
  useEffect(() => {
    const fetchElections = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("https://404-server-production.up.railway.app/election/elections", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "access_token": localStorage.getItem("access_token"),
          },
        });

        if (!response.ok) throw new Error("Failed to fetch elections");

        const data = await response.json();

        if (!Array.isArray(data.data)) {
          throw new Error("Invalid response format");
        }

        setElections(data.data);
      } catch (err) {
        console.error("Error fetching elections:", err);
        setError("Could not load elections. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchElections();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    if (!formData.electionId) {
      alert("Please select an election before applying.");
      setUploading(false);
      return;
    }

    try {
      const newData = JSON.stringify({
        electionId: parseInt(formData.electionId,10),
        manifesto: formData.manifesto,
        proposals: formData.proposals,
      });
      console.log(newData)
      const response = await fetch("https://404-server-production.up.railway.app/election/apply_as_candidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access_token": localStorage.getItem("access_token"),
        },
        body: newData
      });

      const data = await response.json();

      if (response.ok) {
        alert("Candidate registered successfully!");
        setFormData({ electionId: "", manifesto: "", proposals: "" });
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error registering candidate: ", error);
      alert("Failed to register. Try again.");
    }

    setUploading(false);
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card shadow-lg p-4 rounded-4" style={{ maxWidth: "500px", width: "100%", border: "none" }}>
        <h2 className="text-center mb-4 text-primary fw-bold">Candidate Registration</h2>

        {loading && <p>Loading elections...</p>}
        {error && <p className="text-danger">{error}</p>}

        {!loading && elections.length === 0 && <p>No ongoing elections available.</p>}

        {!loading && elections.length > 0 && (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold text-dark">Select Election</label>
              <select name="electionId" className="form-control" value={formData.electionId} onChange={handleChange} required>
                <option value="">-- Choose an election --</option>
                {elections.map((election) => (
                  <option key={election.electionId} value={election.electionId}>
                    {election.poistion} (From {election.start} to {election.end})
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold text-dark">Manifesto</label>
              <textarea name="manifesto" className="form-control" value={formData.manifesto} onChange={handleChange} required style={{ minHeight: "100px" }} />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold text-dark">Proposals</label>
              <input type="text" name="proposals" className="form-control" value={formData.proposals} onChange={handleChange} required />
            </div>

            <button type="submit" className="btn btn-primary w-100 fw-bold" disabled={uploading} style={{ transition: "0.3s" }}>
              {uploading ? "Submitting..." : "Register"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CandidateForm;