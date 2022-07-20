import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./blog.css";
let backendURL =
  process.env.VITE_BACKEND_URL || "https://neuetraditionen.herokuapp.com";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [texte, setTexte] = useState("");
  const [isPending, setIsPending] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const blog = { title, texte };

    setIsPending(true);

    fetch(`${backendURL}/blogs`, {
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
            value={texte}
            onChange={(event) => setTexte(event.target.value)}
            id="bodyId"
          />
        </label>
        {!isPending && <button type="submit">Add blog</button>}
        {isPending && (
          <button type="submit" disabled>
            Adding blog...
          </button>
        )}
      </form>
    </div>
  );
}

export default CreateBlog;
