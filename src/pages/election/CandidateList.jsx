import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";

const API_URL = "http://192.168.46.5:8000";

const CandidateList = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const webcamRef = useRef(null);

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const response = await fetch(`${API_URL}/election/elections`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.getItem("access_token"),
          },
        });
        if (!response.ok) throw new Error("Failed to fetch elections");
        const data = await response.json();
        setElections(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error("Error fetching elections:", error);
        setError(error.message);
      }
    };
    fetchElections();
  }, []);

  const fetchCandidates = async (electionId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/election/candidates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify({ electionId }),
      });
      if (!response.ok) throw new Error("Failed to fetch candidates");
      const data = await response.json();
      setCandidates(data.candidates || []);
    } catch (error) {
      console.error("Error fetching candidates:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const captureImage = async () => {
    if (!selectedCandidate || !selectedCandidate.id) {
      alert("Invalid candidate selection. Please try again.");
      return;
    }

    if (!webcamRef.current) {
      alert("Camera is not available.");
      return;
    }

    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) {
      alert("Failed to capture image.");
      return;
    }

    const response = await fetch(imageSrc);
    const blob = await response.blob();

    await verifyAndVote(blob, selectedCandidate);
    setShowCamera(false);
  };




  const verifyAndVote = async (imageBlob, candidate) => {
    try {
      const formData = new FormData();
      formData.append("file", imageBlob, "capture.jpg");
      const verifyResponse = await fetch(`${API_URL}/election/verifystudent`, {
        method: "POST",
        headers: { access_token: localStorage.getItem("access_token") },
        body: formData,
      });
      const verifyResult = await verifyResponse.json();
      if (!verifyResponse.ok) throw new Error(verifyResult.detail || "Verification failed");
      const voteResponse = await fetch(`${API_URL}/election/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify({ candidateId: candidate?._id || candidate?.id, electionId: selectedElection })
      });
      const voteResult = await voteResponse.json();
      if (!voteResponse.ok) throw new Error(voteResult.detail || "Vote failed");
      alert("Vote successfully recorded!");
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  return (
    <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
      <div className="text-center mb-4 w-100">
        <h3 className="fw-bold text-primary">Select an Election</h3>
        <div className="mb-4">
          <select
            className="form-select border-primary rounded-3 shadow-sm"
            value={selectedElection}
            onChange={(e) => {
              const electionId = e.target.value;
              setSelectedElection(electionId);
              if (electionId) fetchCandidates(electionId);
              else setCandidates([]);
            }}
          >
            <option value="">-- Select Election --</option>
            {elections.map((election) => (
              <option key={election.electionId} value={election.electionId}>
                {election.poistion} ({election.conductedBy}) - {election.start} to {election.end}
              </option>
            ))}
          </select>
        </div>
      </div>

      {showCamera && (
        <div className="camera-container position-fixed top-50 start-50 translate-middle p-3 bg-white shadow-lg rounded z-999999">
          <h5 className="text-center">Capture Your Image</h5>
          <Webcam ref={webcamRef} screenshotFormat="image/jpeg" className="border rounded" width="900" height="600" />
          <div className="d-flex justify-content-between mt-2">
            <button className="btn btn-success btn-sm" onClick={() => captureImage()}>Capture</button>
            <button className="btn btn-danger btn-sm" onClick={() => setShowCamera(false)}>Close</button>
          </div>
        </div>
      )}

      <div className="w-100">
        {loading && <p className="text-center text-secondary">Loading candidates...</p>}
        {error && <p className="text-center text-danger">{error}</p>}
        {!loading && !error && candidates.length > 0 ? (
          <div className="row justify-content-center">
            {candidates.map((candidate) => (
              <div key={candidate._id || candidate.id} className="col-md-6 mb-4">
                <div className="border p-4 rounded-4 shadow-lg bg-white text-dark d-flex flex-column align-items-center text-center h-100">
                  <img src={candidate.photo_url || "https://via.placeholder.com/120"} alt={candidate.fullName} className="rounded-circle border border-primary mb-3" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                  <h4 className="fw-bold text-primary">{candidate.fullName}</h4>
                  <button className="btn btn-outline-primary w-75 mt-3" onClick={() => {
                    setSelectedCandidate(candidate);
                    setShowCamera(true);
                  }}>
                   Vote
                    
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && !error && selectedElection && <p className="text-center text-secondary">No candidates available.</p>
        )}
      </div>
    </div>
  );
};

export default CandidateList;