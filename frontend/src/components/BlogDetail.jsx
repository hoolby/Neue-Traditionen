import PropTypes from "prop-types";
import "./blog.css";

function BlogDetail({ props }) {
  return (
    <div className="blog-details">
      <h2>{props.title}</h2>
      <div>{props.body}</div>
    </div>
  );
}

BlogDetail.propTypes = {
  props: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default BlogDetail;
