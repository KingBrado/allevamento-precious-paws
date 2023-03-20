import React, { useState } from "react";
import { useNavigate } from "react-router";
import { buttonReverseStyle, buttonStyle, cardBody } from "./styles";
import { storage, db } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, Timestamp } from "firebase/firestore";

export default function NewFriend({ collectionName }) {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    friendTitle: "",
    friendImage: "",
    friendName: "",
    friendRace: "",
    friendColour: "",
    friendPedigree: "",
  });
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    setInputs({
      ...inputs,
      "friendImage": `${collectionName}/${file.name}`,
    });
    setImage(file);
  };

  const handleDescriptionChange = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storageRef = ref(storage, `${collectionName}/${image.name}`);
    try {
      await uploadBytes(storageRef, image);
    } catch {
      setError("Errore nel caricare l'immagine");
      return;
    }
    try {
      let newFriend = {
        title: inputs["friendTitle"],
        name: inputs["friendName"],
        race: inputs["friendRace"],
        colour: inputs["friendColour"],
        pedigree: inputs["friendPedigree"],
        description: description,
        created: Timestamp.now()
      };
      await getDownloadURL(storageRef).then((url) => {
        newFriend.image = url;
      });
      await addDoc(collection(db, collectionName), newFriend);
      navigate(-1);
    } catch {
      setError("Errore nel salvare l'amico");
    }
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <form style={{ minWidth: "300px" }} onSubmit={handleSubmit}>
        {error && (
          <div class="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <div className="form-group">
          <label htmlFor="friendTitle" style={cardBody}>
            Titolo
          </label>
          <input
            type="text"
            className="form-control input-lg"
            id="friendTitle"
            name="friendTitle"
            placeholder="Inserisci titolo"
            required
            onChange={handleInputChange}
          />
          <label htmlFor="friendImage" style={cardBody}>
            Immagine
          </label>
          <input
            type="file"
            className="form-control input-lg"
            id="friendImage"
            accept="image/*"
            required
            onChange={handleImageChange}
          />
          <label htmlFor="friendName" style={cardBody}>
            Nome
          </label>
          <input
            type="text"
            className="form-control input-lg"
            id="friendName"
            name="friendName"
            placeholder="Inserisci il nome del micio"
            required
            onChange={handleInputChange}
          />
          <label htmlFor="friendRace" style={cardBody}>
            Razza
          </label>
          <input
            type="text"
            className="form-control input-lg"
            id="friendRace"
            name="friendRace"
            placeholder="Inserisci razza"
            onChange={handleInputChange}
          />
          <label htmlFor="friendColor" style={cardBody}>
            Colore
          </label>
          <input
            type="text"
            className="form-control input-lg"
            id="friendColour"
            name="friendColour"
            placeholder="Inserisci color"
            onChange={handleInputChange}
          />
          <label htmlFor="friendPedigree" style={cardBody}>
            Pedigree
          </label>
          <input
            type="text"
            className="form-control input-lg"
            id="friendPedigree"
            name="friendPedigree"
            placeholder="Inserisci pedigree"
            onChange={handleInputChange}
          />
          <label htmlFor="friendDescription" style={cardBody}>
            Descrizione
          </label>
          <textarea
            className="form-control input-lg"
            id="friendDescription"
            rows="5"
            cols="30"
            placeholder="Descrizione"
            onChange={handleDescriptionChange}
          />
        </div>
        <button type="submit" className="btn mt-3" style={buttonStyle}>
          Conferma
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
