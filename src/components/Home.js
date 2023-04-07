import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Video from "../resources/video_gatto_blog.mp4";
import Logo from "../resources/precious_paws_logo.jpg";
import { sectionHeader, subSectionLink, cardBody, lessRecentLink } from "./styles";

export default function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getDocs(query(collection(db, "posts"), orderBy("created", "desc"))).then(
      (querySnapshot) => {
        let p = querySnapshot.docs.map((doc) => doc);
        setPosts(p);
      }
    );
  }, []);
  return (
    <>
      <Navbar />
      <video style={{ position: "relative" }} width="100%" autoPlay muted loop>
        <source src={Video} type="video/mp4" />
        Your Browser does not support HTML video.
      </video>
      <div className="row  justify-content-center">
        <div className="col-lg-6 col-xs-6">
          <img
            className="d-block img-fluid mx-auto w-100"
            src={Logo}
            alt=""
            style={{ borderRadius: "80%" }}
          />
        </div>
      </div>
      <div className="container">
        <h1 style={sectionHeader}>News</h1>
        <div className="row justify-center">
          {posts.length > 0 && (
            <div className="col-lg-6 mx-auto text-center" key={posts[0].id}>
              <div className="card mt-4 mb-4">
                <div className="card-body text-center">
                  <Link
                    to={"/posts/" + posts[0].id}
                    className="card-title"
                    style={subSectionLink}
                  >
                    {posts[0].data().title}
                  </Link>
                  <p style={cardBody} className="card-text">
                    {posts[0].data().items[0].content.split(" ").length > 10
                      ? posts[0]
                          .data()
                          .items[0].content.split(" ")
                          .slice(0, 10)
                          .join(" ") + "..."
                      : posts[0].data().items[0].content}
                  </p>
                </div>
              </div>
              <Link to={"/posts/"} style={lessRecentLink}>Post meno recenti</Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
