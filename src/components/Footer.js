import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import fblogo from "../resources/f_logo_RGB-Blue_58.png";
import instalogo from "../resources/Instagram_Glyph_Gradient_RGB.png";

export default function Footer() {
  const [user, setUser] = useState(false);
  const [error, setError] = useState("");
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(!!u);
    });
    return unsubscribe;
  }, [auth]);

  async function handleLogout() {
    setError("");
    try {
      await signOut(auth);
    } catch {
      error("Disconnessione fallita");
    }
  }
  return (
    <footer className="bg-light">
      <div className="container fluid px-0 mt-5">
        <div style={{ marginTop: "0.5rem" }} className="row">
          <div className="col-xs-12 col-md-4 text-center">
            <h4>Contatti</h4>
            <p>
              Manzi Patrizia: +393462255109 <br />
              allevamento.preciouspaws@outlook.it
            </p>
          </div>
          <div className="col-xs-12 col-md-4 mb-3 text-center">
            <h4>Seguici</h4>
            <div style={{ maxWidth: "100%" }}>
              <a
                style={{ maxWidth: "100%", display: "inline" }}
                href="https://www.facebook.com/allevamentopreciouspaws/"
              >
                <img
                  style={{ maxWidth: "10%" }}
                  src={fblogo}
                  alt="facebook-logo"
                />
              </a>
              <a
                style={{ maxWidth: "100%", display: "inline" }}
                href="https://www.instagram.com/preciouspawsallevamento/"
              >
                <img
                  style={{ maxWidth: "10%" }}
                  src={instalogo}
                  alt="instagram-logo"
                />
              </a>
            </div>
          </div>
          <div xs="12" md="4" className="col-xs-12 col-md-4 mb-3 text-center">
            {user ? (
              <Link className="text-secondary" to="#" onClick={handleLogout}>
                Logout
              </Link>
            ) : (
              <Link className="text-secondary" to="/login">
                Login
              </Link>
            )}
            {user ? (
              <p>
                <Link className="text-secondary" to="/new-post">
                  Nuovo Post
                </Link>
              </p>
            ) : null}
          </div>
        </div>
        <div className="row" style={{ paddingBottom: "0.2rem" }}>
          <div className="col text-center">&copy;{new Date().getFullYear()} DoktorPumpkin</div>
        </div>
      </div>
    </footer>
  );
}
