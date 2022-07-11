import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./blog.css";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isPending, setIsPending] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const blog = { title, body };

    setIsPending(true);

    fetch("http://localhost:5000/blogs", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(blog),
    }).then(() => {
      setIsPending(false);
      navigate("/");
    });
  };

  return (
    <div className="create">
      <h2>Add a new blog</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="titleId">
          <strong>Blog title:</strong>
          <input
            type="text"
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            id="titleId"
          />
        </label>
        <label htmlFor="bodyId">
          <strong>Blog body:</strong>
          <textarea
            required
            value={body}
            onChange={(event) => setBody(event.target.value)}
            id="bodyId"
          />
        </label>
        {!isPending && <button type="button">Add blog</button>}
        {isPending && (
          <button type="button" disabled>
            Adding blog...
          </button>
        )}
      </form>
    </div>
  );
}

export default CreateBlog;
