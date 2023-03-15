import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { sectionHeader, sectionBody, sectionLink } from "./styles";

export default function AboutUs() {
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
            <p style={sectionBody}>
              Benvenuti sulla nostra pagina web, molti si chiederanno chi siamo
              ed ecco perché ci fa molto piacere presentarci. Siamo una
              famiglia, una famiglia come tutte le altre, che ha deciso di
              trasformare una passione in qualcosa di più. Siamo una coppia
              appassionata di animali, abbiamo sempre avuto cani e gatti,
              abbiamo fatto volontariato e ne abbiamo salvati tanti dalle
              strade. Abbiamo sempre rispettato gli allevatori, quelli seri che
              rispettano i regolamenti, che seguono i loro cuccioli e li
              accompagnano finché non sono pronti per lasciare le loro case. Ma
              quando si ama un cucciolo la gioia più grande è ricevere le
              meravigliose foto di quando crescono e vivono nelle loro famiglie,
              e vedere come sono amati dona un’emozione infinita. Ebbene a un
              certo punto abbiamo deciso di trasformare la nostra passione in
              qualcosa di più con questa meravigliosa razza di cui ci siamo
              innamorati. Abbiamo scelto ogni cucciolo da allevamenti seri e li
              abbiamo seguiti fin da piccoli, dalla crescita al loro arrivo.
              Abbiamo due splendidi bambini a cui abbiamo insegnato ad amare e
              rispettare gli animali, tutti gli animali e i nostri gatti
              crescono e vivono in mezzo a noi, giocano con i bambini, ricevono
              coccole, dormono in giro sul divano comodo o sui loro cuscinoni.
            </p>
            <p style={sectionBody}>
              {" "}
              Ci auguriamo che questa grande famiglia cresca sempre di più
              insieme alle tante famiglie che decideranno di prendere uno dei
              nostri micetti. Venite a conoscere i gatti di casa Precious Paws
              nella sezione{" "}
              <Link to={"/our-friends"} style={sectionLink}>
                I nostri mici
              </Link>
              !
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
