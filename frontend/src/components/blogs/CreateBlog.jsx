import "./blog.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase";

function CreateBlog({ isAuth }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const postsCollectionRef = collection(db, "blogs");
  const navigate = useNavigate();

  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      title,
      text,
    });
    navigate("/");
  };

  /*   useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []); */

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create A Post</h1>
        <div className="inputGp">
          <div>
            Title:
            <input
              placeholder="Title..."
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="inputGp">
          <div>
            Post:
            <textarea
              placeholder="Post..."
              onChange={(event) => {
                setText(event.target.value);
              }}
            />
          </div>
        </div>
        <button type="button" onClick={createPost}>
          Submit Post
        </button>
      </div>
    </div>
  );
}

export default CreateBlog;

/* MY SQL SERVER */

/*   import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./blog.css";

const backendURL =
  import.meta.env.VITE_BACKEND_URL || "https://neuetraditionen.herokuapp.com";

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

export default CreateBlog; */
