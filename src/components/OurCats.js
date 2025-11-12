import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import {
  buttonStyle,
  smallButtonStyle,
  sectionHeader,
  subSectionHeader,
  sectionBody,
} from "./styles";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import { db } from "../firebase";

export default function OurCats() {
  const [friendsDesc, setFriendsDesc] = useState([]);
  const [user, setUser] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(!!u);
    });
    return unsubscribe;
  }, [auth]);

  useEffect(() => {

    getDocs(query(collection(db, "friends"), orderBy("created"))).then(
      async (querySnapshot) => {
        let p = querySnapshot.docs.map((doc) => doc);
        setFriendsDesc(p);
      }
    );
  }, []);

  return (
    <>
      <Navbar />
      <div className="container fluid" style={{ minHeight: "65vh" }}>
        <div className="row justify-content-center ">
          <div className="col m-auto">
            <h1 style={sectionHeader}>I nostri mici</h1>
            <div className="row justify-center">
              {friendsDesc &&
                friendsDesc.map((friend) => {
                  return (
                    <div
                      className="col-lg-10 col-sm-12 m-auto text-center"
                      key={friend.id}
                    >
                      <h3 style={subSectionHeader}>{friend.data().title}</h3>
                      <img
                        className="d-block img-fluid mx-auto w-75"
                        src={friend.data().image}
                        alt=""
                      />
                      <p style={sectionBody}>
                        Nome Gatto: {friend.data().name}
                        <br />
                        Razza: {friend.data().race}
                        <br />
                        Colore: {friend.data().colour}
                        <br />
                        {friend.data().pedigree}
                        <br />
                      </p>
                      <p style={sectionBody}>{friend.data().description}</p>
                      {user ? (
                        <Link
                          to={"/edit-friend/" + friend.id}
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
              <Link to="/new-friend" className="btn" style={buttonStyle}>
                Nuovo micio
              </Link>
            ) : null}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
