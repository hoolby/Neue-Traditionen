import "./blog.css";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import useFetch from "./useFetch";

const backendURL =
  process.env.VITE_BACKEND_URL || "https://neuetraditionen.herokuapp.com";

function BlogDetails() {
  const { id } = useParams();

  useEffect(() => {
    roleOfUser();
  }, []);
  const roleOfUser = () => {
    axios
      .get(`${backendURL}/user`, {
        headers: {
          Authorization: localStorage.getItem("\token"),
        },
      })
      .then((respons) => {
        setRole(respons.data[0][0].role);
      });
  };
  const [role, setRole] = useState();
  const { data, isPending, error } = useFetch(`${backendURL}/blogs/${id}`);
  const navigate = useNavigate();

  const handleClick = () => {
    fetch(`${backendURL}/blogs/${id}`, {
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
        <div>
          <Card
            id="oneCard"
            /* className="card-body" */ style={{ width: "50rem" }}
          >
            <Card.Title id="font" /* className="title" */>
              {data.title}
            </Card.Title>
            <Card.Text id="font" /* className="body" */>{data.texte}</Card.Text>
          </Card>
          {role && role === "admin" ? (
            <Button
              id="button"
              variant="primary"
              type="button"
              onClick={handleClick}
            >
              Delete (don't do it.)
            </Button>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}

export default BlogDetails;
