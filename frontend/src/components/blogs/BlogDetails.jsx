import "./blog.css";
import { useParams, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import useFetch from "./useFetch";

function BlogDetails() {
  const { id } = useParams();
  const { data, isPending, error } = useFetch(
    `http://localhost:5000/blogs/${id}`
  );
  const navigate = useNavigate();

  const handleClick = () => {
    fetch(`http://localhost:5000/blogs/${id}`, {
      method: "DELETE",
    }).then(() => {
      navigate("/");
    });
  };

  return (
    <div>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {data && (
        <Card style={{ width: "50rem" }}>
          <Card.Title>{data.title}</Card.Title>
          <Card.Text>{data.texte}</Card.Text>
          <Button variant="primary" type="button" onClick={handleClick}>
            Delete (don't do it.)
          </Button>
        </Card>
      )}
    </div>
  );
}

export default BlogDetails;
