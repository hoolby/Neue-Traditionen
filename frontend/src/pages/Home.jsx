import BlogList from "@components/BlogList";
import Create from "@components/create";
import useFetch from "@components/useFetch";
import "@components/blog.css";

function Home() {
  const { data, isPending, error } = useFetch("http://localhost:5000/blogs");
  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {data && <BlogList blogs={data.blogs} />}
      <Create />
    </div>
  );
}

export default Home;
