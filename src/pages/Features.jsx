import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/features.css";
import { FaVoteYea, FaHospitalUser, FaCalendarCheck, FaFileInvoiceDollar, FaExclamationTriangle, FaUserSecret, FaMoneyCheckAlt } from "react-icons/fa";

function Features() {
  return (
    <div className="container px-1"> 
      <div className="row g-4">
        {[
          { title: "Election Candidates", text: "Secure online election platform for student councils.", link: "/candidate" ,  icon: <FaVoteYea style={{ fontSize: "40px", color: "#3a69ad" }}  /> },
          { title: "Event Management & Campus Facility Booking", text: "Manage events, registrations, and attendance.", link: "#" , icon: <FaCalendarCheck style={{ fontSize: "40px", color: "#3a69ad" }} /> },
          { title: "Anonymous Complaints", text: "Submit & moderate anonymous complaints.", link: "/complaint" , icon: <FaExclamationTriangle style={{ fontSize: "40px", color: "#3a69ad" }} /> },
          { title: "Budget & Sponsorship", text: "Manage event budgets, sponsorships & receipts.", link: "/expenseform" , icon: <FaMoneyCheckAlt style={{ fontSize: "40px", color: "#3a69ad" }} /> },
          { title: "Application & Approval", text: "Manage event, budget, and sponsorship applications.", link: "/submitapplication" , icon: <FaVoteYea style={{ fontSize: "40px", color: "#3a69ad" }} /> },
         
        ].map((feature, index) => (
          <div key={index} className="col-12 col-sm-6 col-md-4 d-flex justify-content-center">
            <div className="card glass-card p-3 text-center w-100">
              <div className="card-body">
              <div className="icon">{feature.icon}</div>
                <h5 className="fw-bold">{feature.title}</h5>
                <p className="small">{feature.text}</p>
                <a href={feature.link} className="btn btn-primary px-4 fw-semibold rounded-pill">
                  Apply
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