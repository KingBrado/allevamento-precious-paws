import { sectionBody } from "./styles";

export default function PostItem({ item }) {
  return (
    <div>
      {item.type === "image" ? (
        <img
            className="d-block img-fluid mx-auto w-75 mt-3"
            src={item.content}
            alt=""
          />
        )
        : (
        <p style={sectionBody}>{item.content}</p>
      )}
    </div>
  );
}
