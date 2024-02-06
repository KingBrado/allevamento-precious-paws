import "./modal.css";
import { smallButtonReverseStyle, smallButtonStyle } from "./styles";

const Modal = ({ handleDelete, handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button
          className="btn"
          style={smallButtonStyle}
          type="button"
          onClick={handleDelete}
        >
          Conferma
        </button>
        <button
          className="btn"
          style={smallButtonReverseStyle}
          type="button"
          onClick={handleClose}
        >
          Annulla
        </button>
      </section>
    </div>
  );
};

export default Modal;
