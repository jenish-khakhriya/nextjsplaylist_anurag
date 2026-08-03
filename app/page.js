import Link from "next/link";

const Home = () => {
  return (
    
    <div className="flex flex-col w-full h-[500vh] justify-between items-center">
       <div>
         <nav>
        <ul className="navbar">
          <li>
            <Link href="/" className="nav-link active">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="nav-link">
              About
            </Link>
          </li>
          
        </ul>
      </nav>
      <div>
        <h1>Home Page</h1>
        <p>Welcome to our website!</p>
      </div>
       </div>
       
     <Link href="/services" className="nav-link">
              Services
            </Link>
    </div>
  );
};

export default Home;
