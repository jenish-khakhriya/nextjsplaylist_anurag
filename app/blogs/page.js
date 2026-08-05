import Link from "next/link";

const Blogs = async () => {
  const response = await fetch("https://6911c0827686c0e9c20edfce.mockapi.io/api/login/getUserData");
  const data = await response.json();
  return (
    <>
      <nav>
        <ul className="navbar">
          <li>
            <Link href="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="nav-link">
              About
            </Link>
          </li>
          <li>
            <Link href="/services" className="nav-link">
              Services
            </Link>
          </li>
          <li>
            <Link href="/blogs" className="nav-link active">
              Blogs
            </Link>
          </li>
        </ul>
      </nav>
      <div>
        <h1>Welcome to Our Blog</h1>
        <ol className="blog-links">
        
          {data?.slice(0,10).map((item) => {
            return <li>
            <Link href={`/blogs/${item?.id ?? 1}`}>{item?.fullName}</Link>
          </li>
          })}
        </ol>
      </div>
    </>
  );
};

export default Blogs;
