import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import CandidateList from "./election/CandidateList";
import Features from "./Features";
import Navbar from "./Navbar";
import OnElections from "./election/OnElections";
import BudgetList from "./budget/BudgetList";
import ExpenseList from "./budget/ExpenseList";
import CheatingList from "./cheating/CheatingList";
import GetComplaint from "./profiles/complaints/GetComplaint";
const Home = () => {
  return (
    <>
        <Navbar />
        <h1 className="display-3 fw-bold text-center text-dark mt-4">
          Welcome to the CollegeSphere
        </h1>
        <p
          className="lead text-center text-secondary mx-auto"
          style={{ maxWidth: "600px", fontSize: "1.2rem" }}
        >
          Your centralized hub for seamless management and efficiency.
        </p>
  <hr />
        {/* Layout with Bootstrap grid */}
        <div className="container">
          <div className="row">
            {/* Left side: OnElections */}
            <div className="col-md-6">
              <OnElections />
            </div>

            {/* Right side: CandidateList */}
            <div className="col-md-6">
              <CandidateList />
            </div>
          </div>
        </div>
        <hr />
        <div className="container ">
        <div className="row">
            {/* Left side: OnElections */}
            <div className="col-md-6">
            <BudgetList />          </div>

            {/* Right side: CandidateList */}
            <div className="col-md-6">
              <ExpenseList />
            </div>
          </div>
          </div>
          <hr />
          <div className="container ">

          <div className="row">
            {/* Left side: OnElections */}
            <div className="col-md-6">
            <CheatingList/>         </div>

            {/* Right side: CandidateList */}
            <div className="col-md-6">
              <GetComplaint />
            </div>
          </div>
        </div>

        
        <h2 className="text-dark fw-bold mb-5 text-center pt-5">Dashboard Features</h2>
        
        <Features />
    
     
    </>
  );
};

export default Home;
