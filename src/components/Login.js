import React, { useRef, useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import {
  buttonStyle,
  cardBody,
  buttonReverseStyle,
  darkLinkStyle,
} from "./styles";

export default function Login() {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      navigate(-1);
    } catch {
      setError("Errore nell'accesso");
    }
    setLoading(false);
  }

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh"}}
    >
      <form style={{ minWidth: "400px", maxWidth: "80%" }} onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" style={cardBody}>
            Email
          </label>
          <input
            className="form-control input-lg"
            type="email"
            placeholder="Email"
            ref={emailRef}
            name="email"
            required
          />
          <label htmlFor="password" style={cardBody}>
            Password
          </label>
          <input
            className="form-control input-lg"
            type="password"
            name="password"
            placeholder="Password"
            ref={passwordRef}
            required
          />
          {error && (
            <span class="alert alert-danger" role="alert">
              {error}
            </span>
          )}
        </div>

        <button
          className="btn mt-3"
          style={buttonStyle}
          type="submit"
          disabled={loading}
        >
          Login
        </button>
        <button
          type="submit"
          className="btn mt-3 ms-3"
          onClick={handleCancel}
          style={buttonReverseStyle}
        >
          Annulla
        </button>
        <div className="w-100 text-center mt-3">
          <Link style={darkLinkStyle} to="/forgot-password">
            Password dimenticata?
          </Link>
        </div>
      </form>
    </div>
  );
}
