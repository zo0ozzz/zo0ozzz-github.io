// const URL = {
//   base: "http://localhost:5000",
//   category: (selectedCategory) => `/categories/${selectedCategory}`,
//   search: "/search",
//   post: (postId) => `/posts/${postId}`,
//   edit: (postId) => `/edit/${postId}`,
//   create: "/create",
//   god: "/god",
// };

// export default URL;

export const BASE_URL = "http://localhost:5000";
export const HOME_PAGE = "/";
export const CATEGORY_PAGE = (selectedCategory) =>
  `/categories/${selectedCategory}`;
export const SEARCH_PAGE = "/search";
export const POST_VIEW_PAGE = (postId) => `/posts/${postId}`;
export const POST_EDIT_PAGE = (postId) => `/edit/${postId}`;
export const POST_CREATE_PAGE = "/create";
export const GOD_PAGE = "/god";

export const POST_API = (query) => `/post/${query}`;
