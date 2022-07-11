/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import "./blog.css";

function BlogList({ blogs }) {
  return (
    <div>
      {blogs.map((blog) => (
        <CardGroup>
          <Card style={{ width: "18rem" }} key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              <Card.Title>{blog.title}</Card.Title>
            </Link>
          </Card>
        </CardGroup>
      ))}
    </div>
  );
}

/* BlogList.propTypes = {
  blogs: PropTypes.string.isRequired,
}; */

export default BlogList;
