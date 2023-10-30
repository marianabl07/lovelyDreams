// Navbar.js
import React from 'react';
import LovelyDreamsLogo from '../Icons/Lovely Dreams Logo.png'
import { Link } from 'react-router-dom';


function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary p-3" id="menu">
      <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={LovelyDreamsLogo} alt="logo" width="70" height="70"/>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="homepage">Home</a>
                </li>
                
                <li className="nav-item">
                <a className="nav-link" href="#aboutUs">About us</a>
                </li>

                <li className="nav-item">
                <a className="nav-link" href="#">Our shop</a>
                </li>

                <li className="nav-item">
                <a class="nav-link" href="#contactUs">Contact us</a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="logup">Log up</a>
                  </li>
              
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Offers
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Short pajama set</a></li>
                  <li><a className="dropdown-item" href="#">Nightgowns</a></li>
                </ul>
              </li>
              
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-danger" type="submit">Search</button>
            </form>
          </div>
        </div>
    </nav>
  );
}

export default Navbar;
