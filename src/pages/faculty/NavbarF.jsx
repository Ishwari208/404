import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NavbarF() {
  const [notifications, setNotifications] = useState([]);

  


  return (
    <div >
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Faculty Dashboard</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/faculty">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="/live">election</a>
              </li>
              
            </ul>

            {/* Notifications Dropdown */}
            

            <div className="dropdown">
              <a
                href="/profile"
                className="d-flex align-items-center text-decoration-none dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                
                <strong>Profile</strong>
              </a>
              <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                
                <li>
                  <a className="dropdown-item" href="/facultyProfile">Profile</a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">Sign out</a>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavbarF;
