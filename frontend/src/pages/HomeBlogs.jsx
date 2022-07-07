/* eslint-disable react/prop-types */
import "@components/blogs/blog.css";
import BlogList from "@components/blogs/BlogList";
import Create from "@components/blogs/create";
import useFetch from "@components/blogs/useFetch";

function HomeBlogs() {
  const { data, isPending, error } = useFetch("http://localhost:5000/blogs");
  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {data && <BlogList blogs={data} />}
      <Create />
    </div>
  );
}

export default HomeBlogs;