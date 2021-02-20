import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light px-4 sticky-top">
      <div className="container">
        <a className="navbar-brand" href="#">
          Chat App
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ">
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item mr-4">
              <Link to="/signup" className="nav-link">
                Sign up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Home;
