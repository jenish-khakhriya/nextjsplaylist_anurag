// import { profile } from "@/constant/route";
// import { getName } from "@/utils";
// import { headers } from "next/headers";
// import Link from "next/link";

// const ProfileAndSettingsLayout = async ({ children }) => {
//   const headersList = await headers();

//   const pathname = headersList.get("x-pathname");

//   console.log(pathname, "gggg");

//   return (
//     <main className="w-full px-8 py-6 flex flex-col gap-5">
//       <h1 className="text-5xl">{getName(pathname ?? "")}</h1>
//       <div className="flex w-full  justify-center items-center">
//         <div className="w-full grid grid-cols-7 border min-h-[500px] max-h-auto rounded-2xl overflow-hidden">
//           <div className="h-full w-full bg-amber-50 col-span-2 flex flex-col">
//             {profile.map((item) => (
//               <Link
//                 href={item?.path}
//                 className={`w-full py-2 flex justify-center items-center ${pathname === item?.path ? 'bg-blue-600 text-white' : 'text-black'}`}
//               >
//                 {item?.name}
//               </Link>
//             ))}
//           </div>
//           <div className="col-span-5 w-full">{children}</div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default ProfileAndSettingsLayout;


"use client";

import { profile } from "@/constant/route";
import { getName } from "@/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const ProfileAndSettingsLayout = async ({ children } : {children : ReactNode}) => {
//   const headersList = await headers();

//   const pathname = headersList.get("x-pathname");
const pathname = usePathname();
  console.log(pathname.split("/"), "gggg");



  return (
    <main className="w-full px-8 py-6 flex flex-col gap-5">
      <h1 className="text-5xl">{getName(pathname.split("/")[1])}</h1>
      <div className="flex w-full  justify-center items-center">
        <div className="w-full grid grid-cols-7 border min-h-[500px] max-h-auto rounded-2xl overflow-hidden">
          <div className="h-full w-full bg-amber-50 col-span-2 flex flex-col">
            {profile.map((item) => (
              <Link
                href={item?.path}
                className={`w-full py-2 flex justify-center items-center ${pathname?.split("/")[1] === item?.pathname ? 'bg-blue-600 text-white' : 'text-black'}`}
              >
                {item?.name}
              </Link>
            ))}
          </div>
          <div className="col-span-5 w-full">{children}</div>
        </div>
      </div>
    </main>
  );
};

export default ProfileAndSettingsLayout;
