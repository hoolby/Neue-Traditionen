/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import "./blog.css";
import stockphoto from "@assets/stockphoto.jpg";

function Blogs({ blogs }) {
  /*   console.log(blogs); */

  return (
    <div className="cardsBlogPage">
      {blogs.map((blog) => (
        <CardGroup key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            <Card className="card" style={{ width: "18rem" }}>
              <Card.Img variant="top" src={stockphoto} />
              <Card.Title className="title">{blog.title}</Card.Title>
            </Card>
          </Link>
        </CardGroup>
      ))}
    </div>
  );
}

/* Blogs.propTypes = {
  blogs: PropTypes.string.isRequired,
}; */

export default Blogs;
