import React, { useRef, useState } from "react";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  buttonStyle,
  cardBody,
  buttonReverseStyle
} from "./styles";

export default function Login() {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await sendPasswordResetEmail(
        auth,
        emailRef.current.value
      );
      navigate(-1);
    } catch {
      setError("Errore durante il reset");
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
      style={{ minHeight: "100vh" }}
    >
      <form style={{ minWidth: "300px" }} onSubmit={handleSubmit}>
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
        </div>
        {error && (
          <span class="alert alert-danger" role="alert">
            {error}
          </span>
        )}
        <button
          className="btn mt-3"
          style={buttonStyle}
          type="submit"
          disabled={loading}
        >
          Reset
        </button>
        <button
          type="submit"
          className="btn mt-3 ms-3"
          onClick={handleCancel}
          style={buttonReverseStyle}
        >
          Annulla
        </button>
      </form>
    </div>
  );
}
