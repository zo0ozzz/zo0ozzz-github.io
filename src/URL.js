const URL = {
  base: "http://localhost:5000",
  category: (selectedCategory) => `/categories/${selectedCategory}`,
  search: "/search",
  post: (postId) => `/posts/${postId}`,
  edit: (postId) => `/edit/${postId}`,
  create: "/create",
  god: "/god",
};

export default URL;
