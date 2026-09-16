import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/layout/header";
import { UserProvider } from "@/context/UserProfile";
import handleAxios from "@/services/api";
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
  let user = null;

  // try {
  //   const api = await handleAxios();

  //   const response = await api.get("/api/getcookie");

  //   user = response.data;
  // } catch (err) {
  //   console.error("Get user error:", err);
  //   user = null;
  // }

  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <UserProvider user={user}>
          <Header user={user}/>
          {children}
          <ToastContainer />
        </UserProvider>
      </body>
    </html>
  );
}