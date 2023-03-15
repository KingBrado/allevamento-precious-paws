import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/js/src/collapse.js";

const brandStyle = {
  marginLeft: "2rem",
  color: "white",
  fontFamily: "Allison, cursive",
  fontSize: "3.1rem",
};

const linkStyle = {
  color: "white",
  fontFamily: "Allison, cursive",
  fontSize: "2.5rem",
};

export default function Navbar() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{
        backgroundColor: "rgb(116,135,122)",
        padding: 0,
        paddingLeft: 8,
        paddingRight: 8,
      }}
    >
      <Link className="navbar-brand" to="/" style={brandStyle}>
        Precious Paws
      </Link>
      <button
        className="custom-toggler navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-label="Toggle navigation"
        onClick={handleCollapse}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/about-us"} className="nav-link" style={linkStyle}>
              Chi siamo
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/our-friends"} className="nav-link" style={linkStyle}>
              I nostri mici
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/kittens"} className="nav-link" style={linkStyle}>
              Cuccioli
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link to={"/gallery"} className="nav-link" style={linkStyle}>
              Galleria
            </Link>
          </li> */}
        </ul>
      </div>
    </nav>
  );
}
