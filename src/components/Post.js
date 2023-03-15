import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PostItem from "./PostItem";
import { sectionHeader } from "./styles";

export default function Post({ postId }) {
  const [title, setTitle] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getDoc(doc(db, "posts", postId))
      .then((doc) => {
        setTitle(doc.data().title);
        setItems(doc.data().content);
        setLoading(false);
      })
      .catch((error) => console.log(error))
  }, [postId]);
  return (
    <>
      <Navbar />
      <div className="container fluid" style={{ minHeight: "65vh" }}>
        <div className="row justify-content-center ">
          {!loading && (
            <div className="col m-auto">
              <h1 style={sectionHeader}>{title}</h1>
              <div className="row justify-center">
                {items.map((item, id) => {
                  return <PostItem key={id} content={item} />;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
