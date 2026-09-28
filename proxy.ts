// // import { NextResponse } from "next/server";
// // import type { NextRequest } from "next/server";
// // import { createServerApi } from "./services/api";
// // import { getProfileType } from "./types/user";

// // export async function proxy(request: NextRequest) {
// //   const pathname = request.nextUrl.pathname;
// //   console.log(pathname.split("/"),"gghhhyyyrrreee")
// //   const token = request.cookies.get("accessToken")?.value;
// //   try{
// //     const api = await createServerApi();
// //     const response : getProfileType = await api.get("/api/user/me");
// //     // if(response?.success){
// //     //   if(pathname.split("/")[1] === "login" || pathname.split("/")[1] === "signup"){
// //     //     return NextResponse.redirect(
// //     //         new URL("/", request.url)
// //     //       );
// //     //   }
// //     // }
// //     return NextResponse.next();
// //   }
// //   catch(err){
// //      return NextResponse.redirect(new URL("/login", request.url));
// //   }
// //   if (!token) {
// //     return NextResponse.redirect(new URL("/login", request.url));
// //   }

// //   return NextResponse.next();
// // }

// // export const config = {
// //   matcher: [
// //     "/",
// //     "/login",
// //   ],
// // };



// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// import { createServerApi } from "./services/api";
// import type { getProfileType } from "./types/user";
// import { static_url, url } from "./constant/api";

// export async function proxy(request: NextRequest) {

//   const pathname = request.nextUrl.pathname;
//   const referer = request.headers.get("referer");

//   const token = request.cookies.get(process.env.NEXT_TOKEN ?? "accessToken")?.value;

//    const response = NextResponse.next();

//     response.headers.set(
//         "x-pathname",
//         request.nextUrl.pathname
//     );

//   // No token
//   if (!token) {

//     // Allow login page
//     if (pathname.split("/")[1] === "login" || pathname.split("/")[1] === "signup") {
//       return NextResponse.next();
//     }

//     // Protect /
//     return NextResponse.redirect(
//       new URL(static_url.LOGIN, request.url)
//     );
//   }

//   // Token exists → verify token
//   try {

//     const api = await createServerApi();

//     const response: getProfileType =
//       await api.get(url.ME);

//     // Token is valid
//     if (response?.success && response?.data) {

//       // Already logged in → don't allow login page
//       if (pathname.split("/")[1] === "login" || pathname.split("/")[1] === "signup" || pathname === "/") {
//         return NextResponse.redirect(
//           new URL(static_url.DASHBOARD, request.url)
//         );
//       }

//       if (pathname.split("/")[1] === "admin") {
//         if(!response?.data?.role?.includes("admin")){
//            return NextResponse.redirect(
//              new URL(referer || static_url.DASHBOARD, request.url)
//            );
//         }

//       }
      

//       return NextResponse.next();
//     }

//     // Token invalid
//     return NextResponse.redirect(
//       new URL(static_url.LOGIN, request.url)
//     );

//   } catch (err) {

//     console.log("AUTH ERROR:", err);

//     // If already on login, allow it
//     if (pathname === static_url.LOGIN) {
//       return NextResponse.next();
//     }

//     return NextResponse.redirect(
//       new URL(static_url.LOGIN, request.url)
//     );
//   }
// }

// export const config = {
//   matcher: [
//     "/",
//     "/login",
//     "/dashboard/:path*",
//     "/admin/:path*",
//     "/profile"
//   ],
// };


import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { createServerApi } from "./services/api";
import type { getProfileType } from "./types/user";
import { static_url, url } from "./constant/api";


// Helper: continue request and pass pathname to Server Components
function nextWithPathname(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set(
    "x-pathname",
    request.nextUrl.pathname
  );

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}


export async function proxy(request: NextRequest) {

  const pathname = request.nextUrl.pathname;

  const referer = request.headers.get("referer");

  const token = request.cookies.get(
    process.env.NEXT_TOKEN ?? "accessToken"
  )?.value;


  // ============================================
  // NO TOKEN
  // ============================================

  if (!token) {

    // Allow login and signup
    if (
      pathname.split("/")[1] === "login" ||
      pathname.split("/")[1] === "signup"
    ) {
      return nextWithPathname(request);
    }

    // Protect other pages
    return NextResponse.redirect(
      new URL(
        static_url.LOGIN,
        request.url
      )
    );
  }


  // ============================================
  // TOKEN EXISTS → VERIFY TOKEN
  // ============================================

  try {

    const api = await createServerApi();

    const response: getProfileType =
      await api.get(url.ME);


    // ==========================================
    // TOKEN VALID
    // ==========================================

    if (
      response?.success &&
      response?.data
    ) {

      // ----------------------------------------
      // Already logged in
      // Don't allow login/signup/root
      // ----------------------------------------

      if (
        pathname.split("/")[1] === "login" ||
        pathname.split("/")[1] === "signup" ||
        pathname === "/"
      ) {
        return NextResponse.redirect(
          new URL(
            static_url.DASHBOARD,
            request.url
          )
        );
      }


      // ----------------------------------------
      // ADMIN ROUTES
      // ----------------------------------------

      if (
        pathname.split("/")[1] === "admin"
      ) {

        // User is NOT admin
        if (
          !response?.data?.role?.includes("admin")
        ) {

          return NextResponse.redirect(
            new URL(
              referer || static_url.DASHBOARD,
              request.url
            )
          );
        }
      }


      // ----------------------------------------
      // Everything is OK
      // ----------------------------------------

      return nextWithPathname(request);
    }
    else if (
      pathname.split("/")[1] === "login" ||
      pathname.split("/")[1] === "signup"
    ) {
      return nextWithPathname(request);
    }
    else{
       return NextResponse.redirect(
      new URL(
        static_url.LOGIN,
        request.url
      )
    );
    }

    // ==========================================
    // TOKEN INVALID
    // ==========================================

   


  } catch (err) {

    // console.log(
    //   "AUTH ERROR:",
    //   err
    // );


    // If already on login page
    // allow it

    if (
      pathname.split("/")[1] === "login" || pathname.split("/")[1] === "signup"
    ) {
      return nextWithPathname(request);
    }


    return NextResponse.redirect(
      new URL(
        static_url.LOGIN,
        request.url
      )
    );
  }
}


// ============================================
// MATCHER
// ============================================

export const config = {

  matcher: [
    "/",
    "/login",
    "/signup",
    "/dashboard/:path*",
    "/admin/:path*",
    "/profile",
    "/profile/:path*",
    "/settings",
    "/settings/:path*",
    "/manage-followers",
    "/manage-followers/:path*",
  ],

};