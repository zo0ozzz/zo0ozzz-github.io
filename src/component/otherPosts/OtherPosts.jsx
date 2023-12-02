import "./OtherPosts.scss";
import { Link } from "react-router-dom";

const OtherPosts = ({ posts }) => {
  return (
    <div className="otherPosts">
      <div className="otehrPosts__prevPost">
        {posts.prev !== null ? (
          <Link
            className="link otherPosts__link"
            to={`/posts/${posts.prev._id}`}
          >
            <p className="otherPosts__info otherPosts__info--prev">
              이전 글: {posts.prev.title}
            </p>
          </Link>
        ) : null}
      </div>
      <div otherPosts__nextPost>
        {posts.next !== null ? (
          <Link
            className="link otherPosts__link"
            to={`/posts/${posts.next._id}`}
          >
            <p className="otherPosts__info otherPosts__info--next">
              다음 글: {posts.next.title}
            </p>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default OtherPosts;
