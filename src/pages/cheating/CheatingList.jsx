import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://192.168.46.5:8000/cheating/get";

const CheatingList = () => {
  const [cheatingCases, setCheatingCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCheatingCases = async () => {
      try {
        const response = await fetch(API_URL, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch cheating cases");
        }
        const data = await response.json();
        setCheatingCases(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCheatingCases();
  }, []);

  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-4 rounded-3 bg-light">
        <h4 className="text-center fw-bold text-primary mb-3">📋 Cheating Cases</h4>

        {/* Loading Spinner */}
        {loading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && <div className="alert alert-danger text-center">{error}</div>}

        {/* No Data Message */}
        {!loading && !error && cheatingCases.length === 0 && (
          <p className="text-center text-muted">🚫 No cheating cases reported yet.</p>
        )}

        {/* Table with Cheating Cases */}
        {!loading && cheatingCases.length > 0 && (
          <div className="table-responsive">
            <table className="table table-hover table-bordered text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Reg No</th>
                  <th>Reason</th>
                  <th>Exam</th>
                  <th>Subject</th>
                  <th>Sem</th>
                  <th>Invigilator</th>
                  <th>Proof</th>
                </tr>
              </thead>
              <tbody>
                {cheatingCases.map((caseItem, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="fw-semibold">{caseItem.collegeRegNo}</td>
                    <td>{caseItem.reason}</td>
                    <td>{caseItem.examination}</td>
                    <td>{caseItem.subject}</td>
                    <td>{caseItem.semester}</td>
                    <td>{caseItem.invigilatorCollegeId}</td>
                    <td>
                      {caseItem.proofUrl ? (
                        <a
                          href={caseItem.proofUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-success"
                        >
                          🔗 View Proof
                        </a>
                      ) : (
                        <span className="text-danger">No Proof</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheatingList;
