import "./HTMLRenderer.scss";

export default function HTMLRenderer({ content }) {
  return (
    <div
      className="HTMLRenderer"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// export default function QuillViewer({ content }) {
//   return (
//     <ReactQuill
//       modules={{ toolbar: [] }}
//       // formats={[]}
//       value={content}
//       readOnly={true}
//       theme="snow"
//     />
//   );
// }
