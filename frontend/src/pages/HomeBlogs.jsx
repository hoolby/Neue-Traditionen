/* eslint-disable */
/* eslint-disable react/prop-types */
import "@components/blogs/blog.css";
import Blogs from "@components/blogs/Blogs";
/* import useFetch from "@components/blogs/useFetch"; */
import { collection, getDocs, query } from "firebase/firestore";

import { useEffect, useState } from "react";
import { db } from "../firebase";

/* const backendURL =
  import.meta.env.VITE_BACKEND_URL || "https://neuetraditionen.herokuapp.com"; */
function HomeBlogs() {
  // FETCH BLOGS FROM FIREBASE
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
  /* const { data, isPending, error } = useFetch(`${backendURL}/blogs`); */
  return (
    <div className="homeBlogs" style={{ height: "600px" }}>
      {/* {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>} */}
      {data && <Blogs blogs={data} key={data.id} />}
    </div>
  );
}

export default HomeBlogs;
