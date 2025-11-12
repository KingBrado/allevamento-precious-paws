import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { sectionHeader, sectionBody, buttonStyle, buttonReverseStyle } from "./styles";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, orderBy, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import Editor from "react-simple-wysiwyg";
import DOMPurify from "dompurify";
import "./styles.css";

export default function AboutUs() {
  const [user, setUser] = useState(false);
  const [content, setContent] = useState("");
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [docId, setDocId] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(!!u);
    });
    return unsubscribe;
  }, [auth]);

  useEffect(() => {
    getDocs(query(collection(db, "aboutus"), orderBy("created"))).then(
      async (querySnapshot) => {
        if (querySnapshot.empty) {
          setContent("");
          return;
        }
        let doc = querySnapshot.docs[0];
        setContent(doc.data().paragraph);
        setDocId(doc.id);
      }
    );
  }, []);


  const toggleEdit = (e) => {
    e.preventDefault();
    setEditable(!editable);
  }

  const onEditorChange = (e) => {
    setContent(e.target.value);
  }

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setError("");
      await updateDoc(doc(db, "aboutus", docId), {
        paragraph: content,
        created: new Date()
      });
      setEditable(false);
    } catch (err) {
      setError("Errore durante il salvataggio. Riprova.");
      console.error("Error adding document: ", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <div className="container fluid">
        <div className="row justify-content-center ">
          <div className="col m-auto">
            <h1 style={sectionHeader}>Chi Siamo</h1>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-xs-12 col-lg-8 m-auto">
            {error && (
              <div class="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            {user ? (
              editable ? (
                <Editor containerProps={{ style: { fontFamily: "Indie Flower, cursive", fontSize: "1.5rem" } }} value={content} onChange={onEditorChange} />
              ) : <div className="about-content" style={sectionBody} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
            ) : <div className="about-content" style={sectionBody} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />}

            {/* <p style={sectionBody}>
              {" "}
              Ci auguriamo che questa grande famiglia cresca sempre di più
              insieme alle tante famiglie che decideranno di prendere uno dei
              nostri micetti. Venite a conoscere i gatti di casa Precious Paws
              nella sezione{" "}
              <Link to={"/our-friends"} style={sectionLink}>
                I nostri mici
              </Link>
              !
            </p> */}
            <div className="row justify-content-center">
              <div className="col mt-3 m-auto text-center">
                {user ? (
                  editable ? (
                    <>
                      <button className="btn" style={buttonStyle} onClick={handleSave} disabled={loading}>
                        Salva
                      </button>
                      <button className="btn" style={buttonReverseStyle} onClick={toggleEdit} disabled={loading}>
                        Annulla
                      </button>
                    </>
                  ) : (
                    <button className="btn" style={buttonStyle} onClick={toggleEdit}>
                      Modifica
                    </button>
                  )
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
