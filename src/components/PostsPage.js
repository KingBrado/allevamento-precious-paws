import { useState, useEffect } from "react";
import { query, collection, getDocs, orderBy } from "firebase/firestore";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { sectionHeader, subSectionLink, cardBody } from "./styles";
import { Link } from "react-router-dom";
import { db } from "../firebase";

export default function PostsPage() {
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
      <div className="container" style={{ minHeight: "60vh" }}>
        <h1 style={sectionHeader}>News</h1>
        <div className="row justify-center">
          {posts.length > 0 &&
            posts.map((post) => {
              return (
                <div className="col-lg-6 mx-auto text-center" key={post.id}>
                  <div className="card mt-4 mb-4">
                    <div className="card-body text-center">
                      <Link
                        to={"/posts/" + post.id}
                        className="card-title"
                        style={subSectionLink}
                      >
                        {post.data().title}
                      </Link>
                      <p style={cardBody} className="card-text">
                        {post.data().items[0].content.split(" ").length > 10
                          ? post
                              .data()
                              .items[0].content.split(" ")
                              .slice(0, 10)
                              .join(" ") + "..."
                          : post.data().items[0].content}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <Footer />
    </>
  );
}
