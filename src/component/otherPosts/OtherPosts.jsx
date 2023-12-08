import "./OtherPosts.scss";
import { Link } from "react-router-dom";
import Label2 from "../label2/Label2";

const OtherPosts = ({ posts }) => {
  return (
    <div className="otherPosts">
      {posts.prev !== null ? (
        <div className="otherPosts__postInfo otherPosts__postInfo--prevPost">
          <Label2 className="otherPosts__label" name="이전 글:" />
          <div className="otherPosts__infoWrapper">
            <div className="otherPosts__postTitleWrapper">
              <Link
                className="link otherPosts__postTitleLink"
                to={`/posts/${posts.prev._id}`}
              >
                <p className="otherPosts__postTitle">{posts.prev.title}</p>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
      {posts.next !== null ? (
        <div className="otherPosts__postInfo otherPosts__postInfo--nextPost">
          <Label2 className="otherPosts__label" name="다음 글:" />
          <div className="otherPosts__infoWrapper">
            <div className="otherPosts__postTitleWrapper">
              <Link
                className="link otherPosts__postTitleLink"
                to={`/posts/${posts.next._id}`}
              >
                <p className="otherPosts__postTitle">{posts.next.title}</p>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default OtherPosts;
