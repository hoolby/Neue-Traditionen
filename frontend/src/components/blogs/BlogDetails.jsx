import "./blog.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

function BlogDetails() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const { id } = useParams();

  const fetchBlog = async () => {
    try {
      const docRef = doc(db, "blogs", id);
      const docSnap = await getDoc(docRef);
      setTitle(docSnap.data().title);
      setText(docSnap.data().texte);
    } catch (err) {
      console.error(err); // eslint-disable-line
      console.log("An error occured while fetching blog data"); // eslint-disable-line
    }
  };

  useEffect(() => {
    fetchBlog();
    /* const single = db
      .collection("blogs")
      .where(firebase.firestore.FieldPath.documentId(), "==", id);

    single
      .get()
      .then(function (doc) {
        if (doc.exists) {
          const { titl, texte } = doc.data();
          setTitle(titl);
          setText(texte);
        } else return "zero";
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      }); */
  }, []);

  return (
    <div>
      <div>
        <Card id="oneCard">
          <Card.Title id="font">{title}</Card.Title>
          <Card.Text id="font">{text}</Card.Text>
        </Card>
      </div>
    </div>
  );
}

export default BlogDetails;
