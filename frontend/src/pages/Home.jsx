
import BlogList from "@components/BlogList";

const blogItems = [
  {
    title: "premier blog",
    body: "blogblogblogblogblogblog",
  },
  {
    title: "deuxième blog",
    body: "blogblogblogblogblogblog",
  },
  {
    title: "troisième blog",
    body: "blogblogblogblogblogblogblog",
  },
];

function Home() {
  return (
    <header className="home">
      <BlogList blogItems={blogItems} />
    </header>
  );
}

export default Home;
