import "./God.scss";
import BlogNameEditor from "../../component/blogNameEditor/BlogNameEditor";
import CategoryEditor from "../../component/categoryEditor/CategoryEditor";

export default function God({ setBlogName, setCategoryData }) {
  return (
    <>
      <div className="god">
        <p className="message">{`나는 신이야!`}</p>
        <BlogNameEditor setBlogName={setBlogName} />
        <CategoryEditor setCategoryData={setCategoryData} />
      </div>
    </>
  );
}
