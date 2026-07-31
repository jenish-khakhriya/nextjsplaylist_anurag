
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body className="min-h-full flex flex-col">
        <header>Header</header>
            {children}
        <footer>Footer</footer>
        </body>
    </html>
  );
}
