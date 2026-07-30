// we can give without name also because its default exports

import Link from "next/link";

// export default function(){
//     return (
//         <h1>About page</h1>
//     )
// }


// export default function xyz(){
//     return (
//         <h1>About page</h1>
//     )
// }

// but we can give valid name 

export default function Design() {
    return (
        <div className="w-full p-5 flex justify-center items-center gap-3 flex-wrap">
      <div className="w-full border border-red-700 flex gap-5 shrink-0 items-center">
        <div className="font-bold py-2 px-4 text-lg">
          Design page
        </div>
        {/* see in react router dom we want to do "TO" attribute but in next js its "href"  */}
        <Link href={"/"} className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
          Go to home
        </Link>
         <Link href={"/web"} className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
          Go to WEB
        </Link>
         <Link href={"/blog"} className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
          Go to Blog
        </Link>
      </div>

       <div className="w-full border border-red-700 flex gap-5 shrink-0 items-center">
        {/* <div className="font-bold py-2 px-4 text-lg">
          CSS
        </div> */}
        {/* see in react router dom we want to do "TO" attribute but in next js its "href"  */}
        <Link href={"design/css"} className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
         css
        </Link>
        {/* see in this in react we can write "To='./sass'" see but in next js we use "href" and provide a full path */}
         <Link href={"design/sass"} className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
          sass
        </Link>
      </div>
    </div>
    )
}