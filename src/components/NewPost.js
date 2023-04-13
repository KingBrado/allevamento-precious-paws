import React, { useState } from "react";
import {
  cardBody,
  buttonStyle,
  buttonReverseStyle,
  smallButtonStyle,
} from "./styles";
import { useNavigate } from "react-router";
import { storage, db } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, Timestamp } from "firebase/firestore";

export default function NewPost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [items, setItems] = useState([{ content: "", type: "text" }]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadImage = async (image) => {
    const storageRef = ref(storage, `/posts/${image.content.name}`);

    const response = await uploadBytes(storageRef, image.content);
    const url = await getDownloadURL(response.ref);
    return url;
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const handleTitleChange = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const addText = (e) => {
    e.preventDefault();
    setItems([...items, { content: "", type: "text" }]);
  };

  const addImage = (e) => {
    e.preventDefault();
    setItems([...items, { content: "", type: "image" }]);
  };

  const handleTextChange = (e, i) => {
    e.preventDefault();
    let newItems = [...items];
    newItems[i].content = e.target.value;
    setItems(newItems);
  };
  const handleImageChange = (e, i) => {
    e.preventDefault();
    let newItems = [...items];
    newItems[i].content = e.target.files[0];
    setItems(newItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setError("");
      const imagePromises = Array.from(items, (item) => {
        if (item.type === "image") {
          return uploadImage(item);
        }
        return null;
      });
      const imageRes = await Promise.all(imagePromises);
      let newItems = items.map((item, i) => {
        if (item.type === "image") {
          return { content: imageRes[i], type: "image" };
        }
        return item;
      });
      let newPost = {
        title: title,
        items: newItems,
        created: Timestamp.now(),
      };
      await addDoc(collection(db, "posts"), newPost);
      navigate(-1);
    } catch {
      setError("Errore nel salvare il post");
    }
    setLoading(false);
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center mt-4 mb-4"
      style={{ minHeight: "100vh" }}
    >
      <form style={{ minWidth: "300px" }} onSubmit={handleSubmit}>
        {error && (
          <div class="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <div className="form-group">
          <label htmlFor="postTitle" style={cardBody}>
            Titolo
          </label>

          <input
            type="text"
            className="form-control input-lg"
            id="postTitle"
            name="postTitle"
            placeholder="Inserisci titolo"
            required
            onChange={handleTitleChange}
          />
          {items.map((item, i) => {
            return item.type === "text" ? (
              <div key={i}>
                <label className="mt-3" htmlFor="postBody" style={cardBody}>
                  {`Paragrafo ${i + 1}`}
                </label>
                <textarea
                  className="form-control input-lg"
                  key={i}
                  id={`postBody-${i}`}
                  rows="5"
                  cols="30"
                  placeholder="Paragrafo"
                  onChange={(e) => handleTextChange(e, i)}
                />
              </div>
            ) : (
              <div key={i}>
                <label className="mt-3" htmlFor="postImage" style={cardBody}>
                  Immagine
                </label>
                <input
                  type="file"
                  className="form-control input-lg"
                  key={i}
                  id={`postImage-${i}`}
                  accept="image/*"
                  required
                  onChange={(e) => handleImageChange(e, i)}
                />
              </div>
            );
          })}
          <button
            type="button"
            className="btn mt-5"
            style={smallButtonStyle}
            onClick={addText}
            disabled={loading}
          >
            Aggiungi Paragrafo
          </button>
          <button
            type="button"
            className="btn mt-5 ms-3"
            style={smallButtonStyle}
            onClick={addImage}
            disabled={loading}
          >
            Aggiungi Immagine
          </button>
        </div>
        <button
          type="submit"
          className="btn mt-5"
          style={buttonStyle}
          disabled={loading}
        >
          Conferma
        </button>
        <button
          type="submit"
          className="btn mt-5 ms-3"
          onClick={handleCancel}
          style={buttonReverseStyle}
          disabled={loading}
        >
          Annulla
        </button>
      </form>
    </div>
  );
}
