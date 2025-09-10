import React from 'react'
import { useNavigate } from "react-router-dom";

function Navbar() {
  return (
    <div><nav class="navbar navbar-expand-lg bg-body-tertiary ">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Student-dashboard</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/student">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/live">Elections</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              More
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="/facility">facility</a></li>
              <li><a class="dropdown-item" href="#">Leave Notifications
              </a></li>
              <li><a class="dropdown-item" href="#">Academic Integrity
              </a></li>
              
            </ul>
          </li>
          {/* <li class="nav-item">
            <a class="nav-link disabled" aria-disabled="true"> Academic Integrity
            </a>
          </li> */}
        </ul>
        <div className="dropdown">
          <a
            href="/profile"
            className="d-flex align-items-center text-dark text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            
            <strong>Profile</strong>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            
            <li>
              <a className="dropdown-item" href="/profile">
                Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav></div>
  )
}

export default Navbar