import "./HTMLRenderer.scss";

export default function HTMLRenderer({ content }) {
  return (
    <div
      className="HTMLRenderer"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
