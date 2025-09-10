import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsPerson, BsClipboardHeart, BsChatDots, BsCalendarCheck } from "react-icons/bs";
import InOut from "../hostel/InOut";

export default function RegisterDoctorAdvice() {
  const [formData, setFormData] = useState({
    collegeRegNo: "",
    symptoms: "",
    advice: "",
    no_of_rest_days: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "no_of_rest_days" ? Math.max(0, parseInt(value) || 0) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        "https://404-server-production.up.railway.app/doctor/advice",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.getItem("access_token"),
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to register doctor advice");
      }

      setSuccess("Doctor advice registered successfully!");
      setFormData({ collegeRegNo: "", symptoms: "", advice: "", no_of_rest_days: 0 });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white text-center">
          <h3 className="mb-0">Register Doctor Advice</h3>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold text-dark">
                <BsPerson className="me-2" /> College Registration No
              </label>
              <input
                type="text"
                name="collegeRegNo"
                value={formData.collegeRegNo}
                onChange={handleChange}
                placeholder="Enter College Reg. No"
                required
                className="form-control"
                disabled={loading}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold text-dark">
                <BsClipboardHeart className="me-2" /> Symptoms
              </label>
              <input
                type="text"
                name="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                placeholder="Enter Symptoms"
                required
                className="form-control"
                disabled={loading}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold text-dark">
                <BsChatDots className="me-2" /> Doctor's Advice
              </label>
              <textarea
                name="advice"
                value={formData.advice}
                onChange={handleChange}
                placeholder="Enter Doctor's Advice"
                required
                className="form-control"
                rows="3"
                disabled={loading}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold text-dark">
                <BsCalendarCheck className="me-2" /> Number of Rest Days
              </label>
              <input
                type="number"
                name="no_of_rest_days"
                value={formData.no_of_rest_days}
                onChange={handleChange}
                placeholder="Enter Rest Days"
                required
                className="form-control"
                min="0"
                disabled={loading}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 d-flex align-items-center justify-content-center" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Submitting...
                </>
              ) : (
                "Submit Advice"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
    <InOut />
    </>
  );
}
