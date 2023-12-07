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
      <div className="otherPosts__nextPost">
        {posts.next !== null ? (
          <Link
            className="link otherPosts__link"
            to={`/posts/${posts.next._id}`}
          >
            <div className="otherPosts__info otherPosts__info--next">
              다음 글: {posts.next.title}
            </div>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default OtherPosts;
