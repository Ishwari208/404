import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";
import CandidateForm from "./pages/election/CandidateForm";
import StudentProfile from "./pages/profiles/StudentProfile";
import SubmitComplaint from "./pages/profiles/complaints/SubmitComplaint";
import CheatingForm from "./pages/cheating/CheatingForm";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import FacultyProfile from "./pages/faculty/facultyProfile";
import RegisterElection from "./pages/faculty/RegisterElection";
import SubmitApplication from "./pages/profiles/SubmitApplication";
import RegisterDoctorAdvice from "./pages/doctor/RegisterDoctorAdvice";
import BudgetForm from "./pages/budget/BudgetForm";
import ExpenseForm from "./pages/budget/ExpenseForm";
import ApplicationAction from "./pages/faculty/ApplicationAction";
import HomePage from "./pages/HomePage";
import GetComplaint from "./pages/profiles/complaints/GetComplaint";
import FacilityBooking from "./pages/facilities/FacilityBooking";
import LiveElection from "./pages/election/LiveElection";


function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/student" element={<Home />} />
        <Route path="/candidate" element={<CandidateForm />} />
        <Route path="/profile" element={<StudentProfile />} />
        <Route path="/complaint" element={<GetComplaint />} />
        <Route path="/cheating" element={<CheatingForm />} />
        <Route path="/faculty" element={<FacultyDashboard />} />
        <Route path="/facultyProfile" element={<FacultyProfile />} />
        <Route path="/electionregister" element={<RegisterElection />} />
        <Route path="/submitapplication" element={<SubmitApplication />} />
        <Route path="/viewapplication" element={<ApplicationAction />} />
        <Route path="/doctoradvice" element={<RegisterDoctorAdvice />} />
        <Route path="/budgetform" element={<BudgetForm />} />
        <Route path="/expenseform" element={<ExpenseForm />} />
        <Route path="/live" element={<LiveElection />} />
        <Route path="/facility" element={<FacilityBooking />} />

       
      </Routes>
    </Router>
  );
}

export default App;
