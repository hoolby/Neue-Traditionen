import BlogList from "@components/BlogList";

const blogItems = [
  {
    title: "premier blog",
    body: "blablabla",
  },
  {
    title: "deuxième blog",
    body: "blobloblo",
  },
  {
    title: "troisième blog",
    body: "gloubiboulga",
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
