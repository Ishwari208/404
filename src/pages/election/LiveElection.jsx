import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function LiveElection() {
    const [elections, setElections] = useState([]);
    const [candidates, setCandidates] = useState({});
    const [electionDetails, setElectionDetails] = useState({});
    const [loading, setLoading] = useState(true); // Track loading

    useEffect(() => {
        fetchElectionDetails(); // 🟢 Ensure this runs before WebSocket receives data
    }, []);

    useEffect(() => {
        const socket = new WebSocket("ws://192.168.46.5:8000/ws");

        socket.onopen = () => console.log("Connected to WebSocket server");

        socket.onmessage = (event) => {
            try {
                const electionData = JSON.parse(event.data);
                console.log("WebSocket Data Received:", electionData);

                const electionIdsFromWebSocket = electionData.map(e => String(e.electionId));
                console.log("WebSocket Election IDs:", electionIdsFromWebSocket);

                // Ensure `electionDetails` exists before setting elections
                if (Object.keys(electionDetails).length === 0) {
                    console.warn("⚠️ Election details not loaded yet. Waiting...");
                    return;
                }

                setElections(electionData);
                fetchCandidateDetails(electionData);
            } catch (error) {
                console.error("Error parsing WebSocket data:", error);
            }
        };

        socket.onclose = () => console.log("Disconnected from WebSocket server");

        return () => socket.close();
    }, [electionDetails]); // 🟢 Ensure WebSocket runs **after** election details are fetched

    const fetchElectionDetails = async () => {
        try {
            const response = await fetch("http://192.168.46.5:8000/election/elections");

            if (!response.ok) throw new Error("Failed to fetch election details");

            const data = await response.json();
            console.log("API Response Data:", data);

            if (!data.data || !Array.isArray(data.data)) {
                throw new Error("Invalid response format: 'data' is missing or not a list");
            }

            const electionMap = {};
            data.data.forEach((election) => {
                electionMap[String(election.id)] = election; // ✅ Convert ID to string
            });

            console.log("Mapped Election Details:", electionMap);
            console.log("Election IDs from API:", Object.keys(electionMap));

            setElectionDetails(electionMap);
            setLoading(false); // 🟢 Mark as loaded
        } catch (error) {
            console.error("Error fetching election details:", error);
            setLoading(false);
        }
    };

    const fetchCandidateDetails = async (electionData) => {
        const updatedCandidates = { ...candidates };

        for (let item of electionData) {
            if (!updatedCandidates[item.candidateId]) {
                try {
                    const response = await fetch("http://192.168.46.5:8000/student/deatils_by_id", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ "StudentId": item.candidateId, "collegeRegNo": null }),
                    });

                    if (!response.ok) throw new Error("Candidate not found");

                    const data = await response.json();
                    updatedCandidates[item.candidateId] = data.fullName || `Candidate ${item.candidateId}`;
                } catch (error) {
                    console.error("Error fetching candidate details:", error);
                    updatedCandidates[item.candidateId] = "Unknown Candidate";
                }
            }
        }

        setCandidates(updatedCandidates);
    };

    // Group elections by electionId
    const groupedElections = elections.reduce((acc, election) => {
        const electionId = String(election.electionId);
        if (!acc[electionId]) acc[electionId] = [];
        acc[electionId].push(election);
        return acc;
    }, {});

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Live Election Results</h1>

            {loading ? (
                <p className="text-center text-muted">Loading election details...</p>
            ) : Object.keys(groupedElections).length === 0 ? (
                <p className="text-center text-muted">No election data available.</p>
            ) : (
                Object.keys(groupedElections).map((electionId) => {
                    const electionInfo = electionDetails[electionId] || {};

                    console.log(`Election Info for ID ${electionId}:`, electionInfo);

                    return (
                        <div key={electionId} className="mb-4">
                            <h2 className="text-primary">
                                {electionInfo.postion ? `${electionInfo.poistion} Election` : "Unknown Position"}
                            </h2>
                            <p><strong>Election ID:</strong> {electionId}</p>
                            <p><strong>Department:</strong> {electionInfo.department || "Unknown"}</p>

                            <div className="row">
                                {groupedElections[electionId].map((item, index) => (
                                    <div key={index} className="col-md-4 mb-3">
                                        <div className="card shadow-sm">
                                            <div className="card-body">
                                                <h5 className="card-title">
                                                    {candidates[item.candidateId] || "Loading..."}
                                                </h5>
                                                <p className="card-text"><strong>Votes:</strong> {item.votes}</p>
                                                <span className="badge bg-primary">Candidate ID: {item.candidateId}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}