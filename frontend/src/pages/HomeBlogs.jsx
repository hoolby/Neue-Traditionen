/* eslint-disable react/prop-types */
import "@components/blogs/blog.css";
import BlogList from "@components/blogs/BlogList";
import useFetch from "@components/blogs/useFetch";
let backendURL =
  process.env.VITE_BACKEND_URL || "https://neuetraditionen.herokuapp.com/";
function HomeBlogs() {
  const { data, isPending, error } = useFetch(`${backendURL}/blogs`);
  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {data && <BlogList blogs={data} />}
    </div>
  );
}

export default HomeBlogs;
