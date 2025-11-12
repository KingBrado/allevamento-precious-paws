import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import {
  buttonStyle,
  sectionHeader,
  subSectionHeader,
  sectionBody,
  smallButtonStyle
} from "./styles";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import { db } from "../firebase";

export default function Kittens() {
  const [kittenDesc, setKittenDesc] = useState([]);
  const [user, setUser] = useState(false);
  const auth = getAuth();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(!!u);
    });
    return unsubscribe;
  }, [auth]);

  useEffect(() => {
    getDocs(query(collection(db, 'kittens'), orderBy("created"))).then(
      async (querySnapshot) => {
        let p = querySnapshot.docs.map((doc) => doc)
        setKittenDesc(p);
      }
    );
  }, []);

  return (
    <>
      <Navbar />
      <div className="container fluid" style={{ minHeight: "65vh" }}>
        <div className="row justify-content-center ">
          <div className="col m-auto">
            <h1 style={sectionHeader}>Cuccioli</h1>
            <div className="row justify-center">
              {kittenDesc &&
                kittenDesc.map((kitten) => {
                  return (
                    <div className="col-lg-10 col-sm-12 m-auto text-center" key={kitten.id}>
                      <h3 style={subSectionHeader}>{kitten.data().title}</h3>
                      <img
                        className="d-block img-fluid mx-auto w-75"
                        src={kitten.data().image}
                        alt=""
                      />
                      <p style={sectionBody}>
                        Nome Gatto: {kitten.data().name}
                        <br />
                        Razza: {kitten.data().race}
                        <br />
                        Colore: {kitten.data().colour}
                        <br />
                        {kitten.data().pedigree}
                        <br />
                      </p>
                      <p style={sectionBody}>{kitten.data().description}</p>
                      {user ? (
                        <Link
                          to={"/edit-kitten/" + kitten.id}
                          className="btn mb-5"
                          style={smallButtonStyle}
                        >
                          Modifica
                        </Link>
                      ) : null}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col mt-3 m-auto text-center">
            {user ? (
              <Link to="/new-kitten" className="btn" style={buttonStyle}>
                Nuovo cucciolo
              </Link>
            ) : null}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
