import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

export default function InOut() {
  const [formData, setFormData] = useState({
    collegeRegNo: "",
    in_or_out: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        "https://404-server-production.up.railway.app/college/inoutregister",
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
        throw new Error("Failed to register In/Out status");
      }

      setSuccess("✅ In/Out status registered successfully!");
      setFormData({ collegeRegNo: "", in_or_out: "" });
    } catch (err) {
      setError(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-5">
        <div className="card p-4 shadow-lg">
          <h2 className="text-center fw-bold mb-3 text-dark">In/Out Register</h2>

          {/* Success & Error Messages */}
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* College Registration Number */}
            <div className="mb-3">
              <label className="form-label fw-semibold text-dark">College Registration No</label>
              <input
                type="text"
                name="collegeRegNo"
                value={formData.collegeRegNo}
                onChange={handleChange}
                placeholder="Enter Registration No"
                required
                className="form-control"
              />
            </div>

            {/* In/Out Selection */}
            <div className="mb-3">
              <label className="form-label fw-semibold text-dark">In/Out Status</label>
              <select
                name="in_or_out"
                value={formData.in_or_out}
                onChange={handleChange}
                required
                className="form-select"
              >
                <option value="">Select Status</option>
                <option value="IN">in</option>
                <option value="OUT">out</option>
              </select>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Submitting...
                </>
              ) : (
                "Submit Status"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}   
