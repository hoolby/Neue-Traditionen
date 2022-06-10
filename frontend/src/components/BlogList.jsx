import BlogDetail from "@components/BlogDetail";
import PropTypes from "prop-types";
import "./blog.css";

function BlogList({ blogItems }) {
  return (
    <div className="blog-list">
      {blogItems.map((item) => (
        <BlogDetail key={item} title={item.title} body={item.body} />
      ))}
    </div>
  );
}

BlogList.propTypes = {
  blogItems: PropTypes.string.isRequired,
};

export default BlogList;
