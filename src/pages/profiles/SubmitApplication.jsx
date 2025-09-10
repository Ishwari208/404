import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import StudentApplication from "../StudentApplication";
// import ViewApplications from "../faculty/ViewApplications";

export default function SubmitApplication() {
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ type: "", title: "", description: "" });
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await fetch("https://404-server-production.up.railway.app/applications/titles");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log("API Response:", data);

        if (data && Array.isArray(data)) {
          setTitles(data);
        } else if (data && Array.isArray(data.titles)) {
          setTitles(data.titles);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTitles();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    try {
      const response = await fetch("https://404-server-production.up.railway.app/applications/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to submit application");
      }
      setSuccessMessage("Application submitted successfully!");
      setFormData({ type: "", title: "", description: "" });
      
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
    <div className="container mt-5">
      <div className="card p-4 shadow-lg">
        <h2 className="text-center mb-4 text-primary fw-bold">Submit Application</h2>
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="mb-3">
            <label className="form-label text-dark fw-bold">Type</label>
            <input
              type="text"
              name="type"
              placeholder="Enter type"
              value={formData.type}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-dark fw-bold">Title</label>
            <select
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select a Title</option>
              {titles.map((item, index) => (
                <option key={index} value={item.title || ""}>{item.title || "No Title Available"}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label text-dark fw-bold">Description</label>
            <textarea
              name="description"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
        {successMessage && <p className="text-success mt-3 fw-bold">{successMessage}</p>}
        {error && <p className="text-danger mt-3 fw-bold">Error: {error}</p>}
      </div>
    </div>
    <StudentApplication />
     
    </>
  );
}
