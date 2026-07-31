export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
    return (
        <section>
            <header>design header</header>
            {children}
            <footer>design footer</footer>
        </section>
    )
}