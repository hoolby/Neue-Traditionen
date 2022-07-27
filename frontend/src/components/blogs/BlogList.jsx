/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import "./blog.css";
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import stockphoto from "@assets/stockphoto.jpg";
import { db } from "../../firebase";

function BlogList({ blogs }) {
  /*   console.log(blogs); */
  const [data, setData] = useState([]);
  const fetchBlogs = async () => {
    try {
      const q = query(collection(db, "blogs"));
      const docs = await getDocs(q);
      const temp = [];
      docs.forEach((doc) => {
        temp.push({ id: doc.id, ...doc.data() });
      });
      setData(temp);
    } catch (err) {
      console.error(err); // eslint-disable-line
      console.log("An error occured while fetching user data"); // eslint-disable-line
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <div className="cards">
      {data.map((blog) => (
        <CardGroup key={blog.id}>
          <Card className="card" style={{ width: "18rem" }}>
            <Link to={`/blogs/${blog.id}`}>
              <Card.Img variant="top" src={stockphoto} />
              <Card.Title className="title">{blog.title}</Card.Title>
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
