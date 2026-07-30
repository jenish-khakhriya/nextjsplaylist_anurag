import Link from "next/dist/client/link";

export default async function Blog({params,searchParams} : {params : {blog : string}, searchParams : {q : string}}) {
    const {blog} = await params;
  const {q} = await searchParams;
    console.log("blog", blog); // its a dynamic route parameter we can get it from params object
    console.log("q", q); // its a query parameter we can get it from searchParams object

  return (
    
     <div className="w-full p-5 flex justify-center items-center gap-3 flex-wrap">
      <div className="w-full border border-red-700 flex gap-5 shrink-0 items-center">
        <div className="font-bold py-2 px-4 text-lg">
          Blog page {blog}
        </div>
        {/* see in react router dom we want to do "TO" attribute but in next js its "href"  */}
        
      </div>

       <div className="w-full border border-red-700 flex gap-5 shrink-0 items-center">
        {/* <div className="font-bold py-2 px-4 text-lg">
          CSS
        </div> */}
        {/* see in react router dom we want to do "TO" attribute but in next js its "href"  */}
        <Link href={`/blog/${blog}/comment-1`} className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
         comment 1
        </Link>
        {/* see in this in react we can write "To='./sass'" see but in next js we use "href" and provide a full path */}
         <Link href={`/blog/${blog}/comment-2`} className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
         comment 2
        </Link>
         <Link href={`/blog/${blog}/comment-3`} className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
         comment 3
        </Link>
         <Link href={`/blog/${blog}/comment-4`} className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
         comment 4
        </Link>
      </div>
    </div>
  );
}