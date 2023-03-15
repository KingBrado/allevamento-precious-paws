import React, { useState, useEffect } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";
import { sectionBody } from "./styles";

export default function PostItem({ content }) {
  const [localContent, setLocalContent] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  useEffect(() => {
    content.type === "text"
      ? setLocalContent(content.content)
      : getDownloadURL(ref(storage, content.content)).then((url) => {
          setLocalContent(url);
          setImageLoaded(true);
        });
  }, [content.type, content.content]);
  return (
    <div>
      {content.type === "image" ? (
        imageLoaded && (
          <img
            className="d-block img-fluid mx-auto w-75 mt-3"
            src={localContent}
            alt=""
          />
        )
      ) : (
        <p style={sectionBody}>{localContent}</p>
      )}
    </div>
  );
}
