import React from "react";
import NavbarF from "./NavbarF";
import FacultyFeatures from "./FacultyFeatures";
import CheatingList from "../cheating/CheatingList";
import BudgetList from "../budget/BudgetList";

function FacultyDashboard() {
  return (
    <>
      <div>
        <NavbarF />
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
        <BudgetList />
        <hr />
        <CheatingList />
        <hr />
        <FacultyFeatures />
      </div>
    </>
  );
}

export default FacultyDashboard;
