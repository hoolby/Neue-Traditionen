/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "./blog.css";

function BlogList({ blogs }) {
  return (
    <div className="blog-list">
      {blogs.map((blog) => (
        <div className="blog-preview" key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            <h2>{blog.title}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
}

/* BlogList.propTypes = {
  blogs: PropTypes.string.isRequired,
}; */

export default BlogList;
