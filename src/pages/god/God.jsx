import "./God.scss";
import { useEffect } from "react";
import BlogNameEditor from "../../component/blogNameEditor/BlogNameEditor";
import HellowEditor from "../../component/hellowEditor/HellowEditor";
import CategoryEditor from "../../component/categoryEditor/CategoryEditor";

export default function God({ setIsGodPage, blogName, setBlogName }) {
  useEffect(() => {
    setIsGodPage((prev) => true);

    return () => setIsGodPage((prev) => false);
  }, []);

  return (
    <>
      <div className="god">
        <p className="god__message">{`나는 신이야!`}</p>
        <div className="god__blogName">
          <BlogNameEditor blogName={blogName} setBlogName={setBlogName} />
        </div>
        <div className="god__hellowEditor">
          <HellowEditor />
        </div>
        <div className="god__categoryEditor">
          <CategoryEditor />
        </div>
      </div>
    </>
  );
}
