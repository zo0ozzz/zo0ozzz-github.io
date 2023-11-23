import "./God.scss";
import BlogNameEditor from "../../component/blogNameEditor/BlogNameEditor";
import CategoryEditor from "../../component/categoryEditor/CategoryEditor";

export default function God({ setBlogName, setCategoryData }) {
  return (
    <>
      <div className="god">
        <p className="message">{`나는 신이야!`}</p>
        <div className="god__blogName">
          <BlogNameEditor setBlogName={setBlogName} />
        </div>
        <div className="god__categoryEditor">
          <CategoryEditor setCategoryData={setCategoryData} />
        </div>
      </div>
    </>
  );
}
