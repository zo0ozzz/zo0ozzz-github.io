import "./HTMLRenderer.scss";

export function HTMLRenderer({ content }) {
  return (
    <div
      className="HTMLRenderer"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
