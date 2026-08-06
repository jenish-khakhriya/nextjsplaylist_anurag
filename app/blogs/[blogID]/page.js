import Link from "next/link";

// export const dynamicParams = false;
// export const revalidate = 25;

export async function generateStaticParams(){
  const response = await fetch("https://6911c0827686c0e9c20edfce.mockapi.io/api/login/getUserData");
  const data = await response.json();

  return data?.slice(0,10).map((item) => ({
    blogID: item?.id ?? 1
  }));

}

const Blogs = async ({ params }) => {
  const { blogID } = await params;
   const response = await fetch(`https://6911c0827686c0e9c20edfce.mockapi.io/api/login/getUserData/${blogID}`,{
    next: {
      revalidate: 25
    }
   });
   const data = await response.json();
   console.log(data?.id)
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
        <h1>Welcome to Our Blog {blogID}</h1>
        <p>This is blog {blogID} page.</p>
        {Object.entries(data).map(([key, value]) => (
          <div key={key}>
            <strong>{key}:</strong> {String(value)}
          </div>
        ))}
        <div>date : {new Date().toLocaleTimeString()}</div>
      </div>
    </>
  );
};

export default Blogs;
