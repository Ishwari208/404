import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const GetComplaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchComplaints = async () => {
      if (!accessToken) {
        setError("❌ Access token is required. Please log in.");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(
          "https://404-server-production.up.railway.app/complaints/get",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "access_token": accessToken,
            },
          }
        );

        if (!response.ok) {
          throw new Error("⚠️ Failed to fetch complaints.");
        }
        const data = await response.json();
        setComplaints(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, [accessToken]);

  return (
    <div className="container mt-4">
      <div className="card shadow-lg border-0 rounded-4">
        <div
          className="card-header text-white text-center py-3 rounded-top-4"
          style={{
            background: "linear-gradient(135deg,#3a69ad, #3a69ad)",
          }}
        >
          <h2 className="fw-bold">📌 Complaints List</h2>
        </div>
        <div className="card-body">
          {loading && (
            <div className="text-center my-3">
              <div className="spinner-border text-primary" role="status"></div>
              <p className="text-secondary mt-2 fs-5">Loading...</p>
            </div>
          )}
          {error && <p className="text-danger text-center fs-5">{error}</p>}

          {!loading && !error && complaints.length > 0 ? (
            <div className="row g-4">
              {complaints.map((complaint, index) => (
                <div key={index} className="col-md-6">
                  <div className="card border-primary shadow-sm rounded-4 complaint-card">
                    <div className="card-body">
                      <p className="fs-5 fw-semibold text-dark mb-2">
                        {complaint.complaint}
                      </p>
                      <small className="text-muted d-block">
                        📅 Submitted on: {complaint.date || "Unknown"}
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !loading &&
            !error && (
              <div className="text-center mt-3">
                <img
                  src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-available-5302984-4432411.png"
                  alt="No Complaints"
                  className="img-fluid"
                  style={{ maxWidth: "200px" }}
                />
                <p className="text-center fs-5 text-secondary mt-3">
                  No complaints found.
                </p>
              </div>
            )
          )}
        </div>
      </div>

      {/* Styles */}
      <style>
        {`
          .complaint-card {
            transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
          }
          .complaint-card:hover {
            transform: scale(1.03);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
          }
        `}
      </style>
    </div>
  );
};

export default GetComplaint;
