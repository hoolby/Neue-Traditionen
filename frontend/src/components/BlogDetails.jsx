import "./blog.css";
import { useParams, useNavigate } from "react-router-dom";
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
    <div className="blog-details">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {data && (
        <article>
          <h2>{data[0].title}</h2>
          <div>{data[0].body}</div>
          <button type="button" onClick={handleClick}>
            Delete (don't do it.)
          </button>
        </article>
      )}
    </div>
  );
}

export default BlogDetails;
