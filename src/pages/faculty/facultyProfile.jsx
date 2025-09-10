import React, { useEffect, useState } from "react";

const FacultyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!accessToken) {
        setError("Missing access token");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch("https://404-server-production.up.railway.app/faculty/details", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "access_token": accessToken,
          },
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch profile");
        }
        
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [accessToken]);

  return (
    <>
  <h2 className="text-center text-primary mb-4 pt-5 fw-bold">Faculty Profile</h2>
  <div className="container py-2">
    {loading && <p className="text-center fs-5 text-secondary">Loading profile...</p>}
    {error && <p className="text-center text-danger fs-5">{error}</p>}

    {!loading && !error && profile ? (
      <div className="card shadow-lg border-0 rounded-4 mx-auto" style={{ maxWidth: "600px" }}>
        <div className="card-body text-center">
          <img
            src={profile.profilePhoto || "https://via.placeholder.com/100"}
            alt={profile.fullName}
            className="rounded-circle border shadow-sm mb-3"
            width="120"
            height="120"
          />
          <h3 className="fw-bold text-dark">{profile.fullName}</h3>
          <p className="text-muted">{profile.role}</p>
          <hr />
          <div className="text-start">
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Employee ID:</strong> {profile.collegeId}</p>
            <p><strong>Department:</strong> {profile.department}</p>
            <p><strong>Designation:</strong> {profile.desgination}</p>
            <p><strong>Experience:</strong> {profile.experience} years</p>
            <p><strong>Contact:</strong> {profile.phone}</p>
          </div>
        </div>
      </div>
    ) : (
      !loading && !error && <p className="text-center fs-5 text-secondary">Profile not found.</p>
    )}
  </div>
</>

  );
};

export default FacultyProfile;