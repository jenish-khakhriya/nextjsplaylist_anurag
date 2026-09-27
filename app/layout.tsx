// import type { Metadata } from "next";
// import "./globals.css";

// import Header from "@/components/layout/header";
// import { UserProvider } from "@/context/UserProfile";
// // import { createServerApi } from "@/services/api";
// import { ToastContainer } from "react-toastify";
// import { createServerApi } from "@/services/api";
// import { getProfileType, UserType } from "@/types/user";
// import { getCurrentUser } from "@/services/user.service";

// export const metadata: Metadata = {
//   title: "chat app",
//   description: "this is next js chat app with web socket",
// };

// export default async function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   let user : UserType = await getCurrentUser();

//   return (
//     <html lang="en">
//       <body className="min-h-full flex flex-col">
//         <UserProvider user={user}>
//           {children}
//           <ToastContainer />
//         </UserProvider>
//       </body>
//     </html>
//   );
// }



// // "use client"


// // import "./globals.css";

// // import Header from "@/components/layout/header";
// // import { UserProvider } from "@/context/UserProfile";
// // // import { createServerApi } from "@/services/api";
// // import { ToastContainer } from "react-toastify";
// // import { createClientApi, createServerApi } from "@/services/api";
// // import { useEffect, useState } from "react";


// // export default function RootLayout({
// //   children,
// // }: Readonly<{
// //   children: React.ReactNode;
// // }>) {
  
// //   let [user,setUser] = useState(null);;

// //   useEffect(() => {
// //    (async () => {
// //      try {
// //     const api = await createClientApi();
// //     const response = await api.get("/api/user/me");
    
// //   setUser(response);
// //   } catch (err___) {
// //   }
// //    })();
// //   },[]);

// //   return (
// //     <html lang="en">
// //       <body className="min-h-full flex flex-col">
// //         <UserProvider user={user}>
// //           <Header user={user}/>
// //           {children}
// //           <ToastContainer />
// //         </UserProvider>
// //       </body>
// //     </html>
// //   );
// // }



import type { Metadata } from "next";
import "./globals.css";


import { UserProvider } from "@/context/UserProfile";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "chat app",
  description: "this is next js chat app with web socket",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <UserProvider>
          {children}
          <ToastContainer />
        </UserProvider>
      </body>
    </html>
  );
}
