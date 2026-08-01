// export default function NotFound() {
//     return (
//         <div className="w-full p-5 flex justify-center items-center gap-3 flex-wrap min-h-screen">
//             <div className="font-bold py-2 px-4 text-lg">
//                 404 Not Found Blog page
//             </div>
//         </div>
//     )

// }


// if we display params then we have to use "use client" because params is a server component and we are trying to use it in client component so we have to use "use client" at the top of the file
'use client'

import { usePathname } from "next/navigation";

export default function NotFound() {
    const path = usePathname();
    console.log("path", path); // its a dynamic route parameter we can get it from params object
    return (
        <div className="w-full p-5 flex justify-center items-center gap-3 flex-wrap min-h-screen">
            <div className="font-bold py-2 px-4 text-lg">
                404 Not Found Blog page {path}
            </div>
        </div>
    )

}