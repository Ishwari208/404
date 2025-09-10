import React, { useState } from "react";
import GetComplaint from "./GetComplaint";
import "bootstrap/dist/css/bootstrap.min.css";

const SubmitComplaint = () => {
  const [complaintText, setComplaintText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const accessToken = localStorage.getItem("access_token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!accessToken) {
      setError("Access token is required. Please log in.");
      return;
    }
    if (!complaintText.trim()) {
      setError("Complaint text cannot be empty.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("https://404-server-production.up.railway.app/complaints/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access_token": accessToken,
        },
        body: JSON.stringify({ complaint_text: complaintText }),
      });

      if (!response.ok) {
        const errorData = await response.json();
       alert("Please write a proper complaint!")
      }

      setSuccess("Complaint submitted successfully.");
      setComplaintText("");
    } catch (error) {
      console.error("Error submitting complaint:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="card shadow-lg p-4">
          <div className="card-header bg-primary text-dark  text-white text-center">
            <h2>Submit Anonymous Complaint</h2>
          </div>
          <div className="card-body">
            {error && <p className="text-danger text-center">{error}</p>}
            {success && <p className="text-success text-center">{success}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  rows="6"
                  placeholder="Enter your complaint here..."
                  value={complaintText}
                  onChange={(e) => setComplaintText(e.target.value)}
                ></textarea>
              </div>
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  disabled={loading}
                  className={`btn btn-lg ${loading ? "btn-secondary" : "btn-primary"}`}
                >
                  {loading ? "Submitting..." : "Submit Complaint"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="container mt-4">
        <GetComplaint />
      </div>
    </>
  );
};

export default SubmitComplaint;
