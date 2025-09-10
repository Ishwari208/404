import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import OnElections from "./election/OnElections";
import BudgetList from "./budget/BudgetList";
import CheatingList from "./cheating/CheatingList";

const HomePage = () => {
  return (
    <div
      className="container-fluid p-0 overflow-auto"
      style={{ maxHeight: "100vh" }} // Enables full-page scrolling
    >
      {/* Hero Section */}
      <header className="bg-primary text-white text-center py-5">
        <h1 className="fw-bold display-4">Welcome to CollegeSphere</h1>
        <p className="lead">A Centralized System for Students & Faculty</p>
      </header>

      {/* Features & Elections Side by Side */}
      <section className="container my-5">
        <div className="row align-items-center">
          {/* Features Section */}
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <div className="card shadow p-4 mb-3 text-center">
              <h3 className="text-primary">📜 Transparency</h3>
              <p>Ensuring fairness and clear communication across the system.</p>
            </div>
            <div className="card shadow p-4 mb-3 text-center">
              <h3 className="text-primary">🔒 Security</h3>
              <p>Ensuring data privacy and authorized access for all users.</p>
            </div>
            <div className="card shadow p-4 text-center">
              <h3 className="text-primary">⚡ Effectiveness</h3>
              <p>Streamlined processes for students, faculty, and administration.</p>
            </div>
          </div>

          {/* Elections Section */}
          <div className="col-md-6">
            <OnElections />
          </div>
        </div>
      </section>

      {/* Cheating Cases & Budget List Side by Side */}
      <section className="container my-5">
        <div className="row">
          <div className="col-md-6">
            <div className="card shadow p-3">
              <h3 className="text-primary">🚨 Cheating Cases</h3>
              <CheatingList />
            </div>
          </div>
          <div className="col-md-6">
            <div className="card shadow p-3">
              <h3 className="text-primary">💰 Budget List</h3>
              <BudgetList />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="text-center my-5 py-5 bg-light">
        <h2 className="fw-bold text-primary mb-4">Join Us Today!</h2>
        <p className="text-muted">Access exclusive features and stay updated with the latest information.</p>

        <Link 
          to="/signin" 
          className="btn btn-lg mx-3 px-4 py-2 fw-bold rounded-pill shadow-sm"
          style={{
            backgroundColor: "blue",
            borderColor: "#ff6b6b",
            color: "white",
            transition: "all 0.3s ease-in-out",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#ff4757";
            e.target.style.borderColor = "#ff4757";
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#ff6b6b";
            e.target.style.borderColor = "#ff6b6b";
            e.target.style.transform = "scale(1)";
          }}
        >
          🔑 Sign In
        </Link>
        
        <Link 
          to="/signup" 
          className="btn btn-outline-primary btn-lg mx-3 px-4 py-2 fw-bold rounded-pill shadow-sm"
          style={{
            transition: "all 0.3s ease-in-out",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#007bff";
            e.target.style.color = "white";
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#007bff";
            e.target.style.transform = "scale(1)";
          }}
        >
          📝 Sign Up
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <p className="m-0">© 2025 College-Sphere | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default HomePage;
