import BlogList from "@components/BlogList";
import FunnelMap from "@components/Funnel/FunnelMap";

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
      <FunnelMap />
    </header>
  );
}

export default Home;
