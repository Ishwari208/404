import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/features.css";
import { FaVoteYea, FaUserCheck, FaCalendarCheck, FaFileInvoice, FaGavel, FaUserSecret, FaMoneyCheckAlt, FaBullhorn, FaTasks } from "react-icons/fa";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

function Features() {
  const data = {
    labels: ["Leave Requests", "Complaints", "Approvals Pending"],
    datasets: [
      {
        data: [10, 5, 7],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div className="container mt-4">
     
        {/* Feature Cards on the Left */}
       
          <div className="row g-4">
            {[
              { title: "Election Oversight", text: "Monitor candidates, approve nominations and track election progress.", link: "/electionregister", icon: <FaVoteYea style={{ fontSize: "40px", color: "#3a69ad" }} /> },
              { title: "Leave & Health Notifications", text: "Approve or reject student leave requests efficiently.", link: "/doctoradvice", icon: <FaUserCheck style={{ fontSize: "40px", color: "#3a69ad" }} /> },
              { title: "Facilities & Application & Budget Approvals", text: "Manage event requests, budget approvals, and sponsorship applications.", link: "/viewapplication", icon: <FaFileInvoice style={{ fontSize: "40px", color: "#3a69ad" }} /> },
              { title: "Exam Misconduct Tracking", text: "Monitor reports of academic dishonesty and take necessary action.", link: "/cheating", icon: <FaGavel style={{ fontSize: "40px", color: "#3a69ad" }} /> },
              { title: "Anonymous Grievance Handling", text: "Review and moderate anonymous student complaints.", link: "/complaint", icon: <FaUserSecret style={{ fontSize: "40px", color: "#3a69ad" }} /> },
              { title: "Budget & Sponsorship Management", text: "Track and verify departmental budgets and expenses.", link: "/budgetform", icon: <FaMoneyCheckAlt style={{ fontSize: "40px", color: "#3a69ad" }} /> },
            ].map((feature, index) => (
              <div key={index} className="col-12 col-sm-6 col-md-6 d-flex justify-content-center">
                <div className="card glass-card p-3 text-center w-100">
                  <div className="card-body">
                    <div className="mb-2">{feature.icon}</div>
                    <h5 className="fw-bold">{feature.title}</h5>
                    <p className="small">{feature.text}</p>
                    <a href={feature.link} className="btn btn-primary px-4 fw-semibold rounded-pill">
                      Access
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
     

      
        
     
    </div>
  );
}

export default Features;