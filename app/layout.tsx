import {Metadata} from "next";
import "./globals.css";

// export const metaData : Metadata = {
//   title: "Next.js 13.4 App Router",
//   description: "Next.js 13.4 App Router Example",
// }


// see its set default value in next.config.js file, if you want to change it, you can set it here
export const metadata : Metadata = {
  title: {
    
    template : "%s | Next js" ,
  default: "Next.js 13.4 App Router" },
  description: "Next.js 13.4 App Router Example",
}




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
