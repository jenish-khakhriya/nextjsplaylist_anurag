import Link from "next/link";

export default function Blog() {
    return (
        <div className="w-full p-5 flex justify-center items-center gap-3 flex-wrap">
      <div className="w-full border border-red-700 flex gap-5 shrink-0 items-center">
        <div className="font-bold py-2 px-4 text-lg">
          Blog page
        </div>
        {/* see in react router dom we want to do "TO" attribute but in next js its "href"  */}
        <Link href={"/"} className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
          Go to home
        </Link>
         <Link href={"/web"} className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
          Go to WEB
        </Link>
        <Link href={"/design"} className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
          Go to Design
        </Link>
      </div>

       <div className="w-full border border-red-700 flex gap-5 shrink-0 items-center">
        {/* <div className="font-bold py-2 px-4 text-lg">
          CSS
        </div> */}
        {/* see in react router dom we want to do "TO" attribute but in next js its "href"  */}
        <Link href={"/blog/blog-1"} className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
         blog 1
        </Link>
        {/* see in this in react we can write "To='./sass'" see but in next js we use "href" and provide a full path */}
         <Link href={"/blog/blog-2"} className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
         blog 2
        </Link>
         <Link href={"/blog/blog-3"} className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
         blog 3
        </Link>
         <Link href={"/blog/blog-4"} className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
         blog 4
        </Link>
      </div>
    </div>
    )
}