import React, { useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const RegisterElection = () => {
    // State Variables
    const [position, setPosition] = useState("");
    const [yearEligible, setYearEligible] = useState([]);
    const [branchEligible, setBranchEligible] = useState([]);
    const [requirements, setRequirements] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const accessToken = localStorage.getItem("access_token");

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!accessToken) {
            setError("Access token is required. Please log in.");
            return;
        }

        const electionData = {
            poistion: position,
            year_eligible: {"years":yearEligible},
            branch_eligible: {"branch":branchEligible},
            requirments: requirements,
            start,
            end,
        };

        try {
            console.log(electionData)
            const response = await fetch(
                "https://404-server-production.up.railway.app/election/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "access_token": accessToken,
                    },
                    body: JSON.stringify(electionData),
                }
            );

            const data = await response.json();
            if (response.ok) {
                setSuccess("Election registered successfully!");
                alert("Election registered successfully!");
            } else {
                setError(data.error || "Failed to register election.");
            }
        } catch (error) {
            console.error("Error registering election:", error);
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="container"
        >
            <div className="card shadow-lg p-4 rounded-lg border border-secondary" style={{ maxWidth: "500px", width: "100%" }}>
                <h2 className="text-center text-primary mb-4">Register an Election</h2>
                {error && <div className="alert alert-danger text-center">{error}</div>}
                {success && <div className="alert alert-success text-center">{success}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-bold text-dark">Position</label>
                        <input type="text" className="form-control" value={position} onChange={(e) => setPosition(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold text-dark">Eligible Years</label>
                        <div className="d-flex gap-2">
                            {["FIRST YEAR", "SECOND YEAR", "THIRD YEAR", "BTECH"].map((year) => (
                                <div key={year} className="form-check">
                                    <input className="form-check-input" type="checkbox" value={year} id={year} checked={yearEligible.includes(year)} onChange={(e) => {
                                        setYearEligible(e.target.checked ? [...yearEligible, year] : yearEligible.filter(y => y !== year));
                                    }} />
                                    <label className="form-check-label" htmlFor={year}>{year}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold text-dark">Eligible Branches</label>
                        <input type="text" className="form-control" placeholder="e.g. CSE, IT, ECE" value={branchEligible.join(", ")} onChange={(e) => setBranchEligible(e.target.value.split(", "))} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold text-dark">Requirements</label>
                        <textarea className="form-control" value={requirements} onChange={(e) => setRequirements(e.target.value)} required></textarea>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold text-dark">Start Date</label>
                        <input type="datetime-local" className="form-control" value={start} onChange={(e) => setStart(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold text-dark">End Date</label>
                        <input type="datetime-local" className="form-control" value={end} onChange={(e) => setEnd(e.target.value)} required />
                    </div>

                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" className="btn btn-primary w-100">
                        Register Election
                    </motion.button>
                </form>
            </div>
        </motion.div>
    );
};

export default RegisterElection;
