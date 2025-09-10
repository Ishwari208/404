import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserTie, FaClock, FaBuilding } from "react-icons/fa";

function OnElections() {
  const [elections, setElections] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchElections = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("Access token missing. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("https://404-server-production.up.railway.app/election/elections", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "access_token": token,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch elections");

        const data = await response.json();
        console.log("API Response:", data);

        if (!Array.isArray(data.data)) {
          console.error("API did not return an array:", data);
          setElections([]);
          return;
        }

        setElections(data.data);
      } catch (error) {
        console.error("Error fetching elections:", error);
        setError("Failed to fetch elections.");
      } finally {
        setLoading(false);
      }
    };

    fetchElections();
  }, []);

  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-4">
        <h2 className="text-center text-primary mb-3">Ongoing Elections</h2>

        {loading && <div className="text-center text-secondary">Loading elections...</div>}
        {error && <div className="alert alert-danger text-center">{error}</div>}

        {!loading && elections.length === 0 && (
          <p className="text-center text-muted">No ongoing elections found.</p>
        )}

        {!loading && elections.length > 0 && (
          <ul className="list-group">
            {elections.map((election, index) => (
              <li key={election.electionId || index} className="list-group-item">
                <h5 className="text-dark">   <FaUserTie className="me-2 text-primary" />{election.poistion}</h5>
                <p className="text-muted">
                <FaClock className="me-2 text-warning" />
                  <strong>Duration:</strong>  {election.start} to {election.end}
                  <br />
                  <FaBuilding className="me-2 text-success" />

                  <strong>Conducted By:</strong> {election.conductedBy}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default OnElections;
