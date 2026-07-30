import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full p-5 flex justify-center items-center">
      <div className="w-full border border-red-700 flex gap-5 shrink-0 items-center">
        <div className="font-bold py-2 px-4 text-lg">
          Home page
        </div>
        {/* see in react router dom we want to do "TO" attribute but in next js its "href"  */}
        <Link href={"/web"} className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
          Go to Web
        </Link>
         <Link href={"/design"} className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
          Go to Design
        </Link>
      </div>
    </div>
  );
}
