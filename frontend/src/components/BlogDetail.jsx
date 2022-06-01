import PropTypes from "prop-types";
import "./blog.css";

function BlogDetail({ title, body }) {
  return (
    <div className="blog-details">
      <h2>{title}</h2>
      <div>{body}</div>
    </div>
  );
}

BlogDetail.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default BlogDetail;
