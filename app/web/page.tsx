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

export default function Web() {
    return (
        <div className="w-full p-5 flex justify-center items-center gap-3 flex-wrap">
      <div className="w-full border border-red-700 flex gap-5 shrink-0 items-center">
        <div className="font-bold py-2 px-4 text-lg">
          Web page
        </div>
        {/* see in react router dom we want to do "TO" attribute but in next js its "href"  */}
        <Link href={"/"} className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
          Go to home
        </Link>
         <Link href={"/design"} className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
          Go to design
        </Link>
      </div>

       <div className="w-full border border-red-700 flex gap-5 shrink-0 items-center">
        {/* <div className="font-bold py-2 px-4 text-lg">
          CSS
        </div> */}
        {/* see in react router dom we want to do "TO" attribute but in next js its "href"  */}
        <Link href={"web/react"} className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
         react
        </Link>
         <Link href={"web/next"} className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
          next
        </Link>
      </div>
    </div>
    )
}