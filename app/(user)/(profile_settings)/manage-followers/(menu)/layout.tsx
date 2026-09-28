"use client";

import { profile, userMenu } from "@/constant/route";
import { getMenu, getName } from "@/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const MenuLayout = async ({ children } : {children : ReactNode}) => {
//   const headersList = await headers();

//   const pathname = headersList.get("x-pathname");

//   console.log(pathname, "gggg");

const pathname = usePathname();
console.log(pathname,"getMenu")
  return (
    <main className="w-full px-8 py-6 flex flex-col gap-5">
      <div className="flex w-full flex-col justify-center items-center gap-4">
          <div className="h-full w-full bg-amber-50 flex ">
            {userMenu.map((item) => (
              <Link
                href={item?.path}
                className={`w-full py-2 px-5 flex justify-center items-center ${pathname === item?.path ? 'bg-blue-600 text-white' : 'text-black'}`}
              >
                {item?.name}
              </Link>
            ))}
          </div>
          <div className="w-full">{children}</div>
      </div>
    </main>
  );
};

export default MenuLayout;