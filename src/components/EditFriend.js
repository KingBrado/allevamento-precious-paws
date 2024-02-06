import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteDoc, doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { db } from "../firebase";
import {
  cardBody,
  buttonStyle,
  buttonReverseStyle,
  dangerButtonStyle,
} from "./styles";
import Modal from "./Modal";

export default function EditFriend(collectionName) {
  const params = useParams();
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
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    getDoc(doc(db, collectionName.collectionName, params.editId))
      .then((doc) => {
        setInputs({
          friendTitle: doc.data().title,
          friendImage: doc.data().image,
          friendName: doc.data().name,
          friendRace: doc.data().race,
          friendColour: doc.data().colour,
          friendPedigree: doc.data().pedigree,
        });
        setDescription(doc.data().description);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [params.editId, collectionName]);

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
      friendImage: `${collectionName}/${file.name}`,
    });
    setImage(file);
  };

  const handleDescriptionChange = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateDoc(doc(db, collectionName.collectionName, params.editId), {
        title: inputs["friendTitle"],
        name: inputs["friendName"],
        colour: inputs["friendColour"],
        race: inputs["friendRace"],
        pedigree: inputs["friendPedigree"],
        modified: Timestamp.now(),
      });
      navigate(-1);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleModalShow = () => {
    setShow(true);
  };

  const handleModalClose = () => {
    setShow(false);
  };

  const handleDelete = async () => {
    const storage = getStorage();
    const fileRef = ref(storage, inputs.friendImage);
    await deleteObject(fileRef)
    await deleteDoc(doc(db, collectionName.collectionName, params.editId))
    navigate(-1);
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
            value={inputs.friendTitle}
            required
            onChange={handleInputChange}
          />
          <label htmlFor="friendImage" style={cardBody}>
            Immagine
          </label>
          <input
            type="text"
            className="form-control input-lg"
            id="friendImage"
            accept="friendName"
            value={inputs.friendImage}
            readOnly
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
            value={inputs.friendName}
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
            value={inputs.friendRace}
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
            value={inputs.friendColour}
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
            value={inputs.friendPedigree}
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
            value={description}
          />
        </div>
        <div>
          <button
            type="submit"
            className="btn mt-3"
            style={buttonStyle}
            disabled={loading}
          >
            Conferma
          </button>
          <button
            className="btn mt-3 ms-3"
            onClick={handleCancel}
            style={buttonReverseStyle}
            disabled={loading}
          >
            Annulla
          </button>
        </div>
        <div className="col text-center mt-3 mb-3">
          <Modal
            show={show}
            handleDelete={handleDelete}
            handleClose={handleModalClose}
          >
            <p className="mt-3 mb-3" style={cardBody}>
              Confermi di voler eliminare questo post? <br /> Questa decisione è
              irreversibile!
            </p>
          </Modal>
          <button
            type="button"
            className="btn"
            onClick={handleModalShow}
            disabled={loading}
            style={dangerButtonStyle}
          >
            Elimina Post
          </button>
        </div>
      </form>
    </div>
  );
}
