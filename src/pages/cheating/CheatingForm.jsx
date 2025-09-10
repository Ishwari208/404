import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import CheatingList from "./CheatingList";

const CheatingForm = () => {
  const [formData, setFormData] = useState({
    collegeRegNo: "",
    reason: "",
    proofUrl: "",
    examination: "",
    invigilatorCollegeId: "",
    subject: "",
    semester: "",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const form = new FormData();
    form.append("student", JSON.stringify(formData));
    form.append("file", file);

    try {
      const response = await fetch("http://192.168.46.5:8000/cheating/register", {
        method: "POST",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        body: form,
      });

      if (!response.ok) {
        throw new Error("Failed to register cheating incident");
      }

      setMessage("✅ Cheating report submitted successfully!");
      setFormData({
        collegeRegNo: "",
        reason: "",
        proofUrl: "",
        examination: "",
        invigilatorCollegeId: "",
        subject: "",
        semester: "",
      });
      setFile(null);
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="container mt-5">
      <div className="card shadow-lg p-4 text-dark">
        <h2 className="text-center mb-4 text-dark">📜 Register Cheating Case</h2>

        {/* Message Alert */}
        {message && (
          <div
            className={`alert ${
              message.startsWith("✅") ? "alert-success" : "alert-danger"
            } text-center`}
            role="alert"
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row ">
            {Object.keys(formData).map((key) => (
              <div className="col-md-6 mb-3 " key={key}>
                <label className="form-label text-dark">
                  {key.replace(/([A-Z])/g, " $1").trim()}:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
          </div>

          {/* File Upload */}
          <div className="mb-3">
            <label className="form-label">📎 Upload Proof:</label>
            <input
              type="file"
              className="form-control "
              accept="image/*,application/pdf"
              onChange={handleFileChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "🚀 Submitting..." : "📤 Submit Report"}
          </button>
        </form>
      </div>
    </div>
    <CheatingList />
    </>
  );
};

export default CheatingForm;
