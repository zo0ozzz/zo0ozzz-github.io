import "./PostCategoryBar";
import Select2 from "../select2/Select2";

const PostCategoryBar = ({ mode, postCategory, categoryData, setPost }) => {
  const handleChangePostCategory = (e) => {
    const newCategory = e.target.value;

    setPost((prev) => ({ ...prev, category: newCategory }));
  };

  const optionFunction = (items) =>
    items.reduce((acc, item, index) => {
      if (item.isAllCategory === true) {
        return acc;
      } else {
        acc.push(
          <option value={item.name} key={index}>
            {item.name}
          </option>
        );

        return acc;
      }
    }, []);

  return (
    <div className="postCategoryBar">
      {mode === "view" ? (
        <div className="postCategoryBar__labelAndCategoryNameWrapper">
          <p className="postCategoryBar__label">분류: </p>
          <p className="postCategoryBar__categoryName">{postCategory}</p>
        </div>
      ) : (
        <div className="postCategoryBar__labelAndCategorySelectorWrapper">
          <label htmlFor="postCategoryBar__categorySelector">분류: </label>
          <Select2
            className="select postCategoryBar__categorySelector"
            value={postCategory}
            onChange={handleChangePostCategory}
            optionData={categoryData}
            optionFunction={optionFunction}
          />
        </div>
      )}
    </div>
  );
};

export default PostCategoryBar;

{
  /* <div className="postCategoryBar">
            <div className="postCategoryBar__labelAndCategoryNameWrapper">
              <p className="postCategoryBar__label">분류: </p>
              <p className="postCategoryBar__categoryName">{post.category}</p>
            </div>
          </div> */
}
