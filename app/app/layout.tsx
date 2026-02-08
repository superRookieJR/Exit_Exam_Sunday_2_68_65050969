import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased selection:bg-primary/10`}>
        <div className="min-h-screen bg-background text-foreground">
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-5xl">
              <Link href="/" className="flex items-center space-x-2">
                <span className="font-bold text-xl tracking-tight">SupportFlow</span>
              </Link>
              <nav className="flex items-center space-x-6 text-sm font-medium">
                <Link href="/complaints" className="transition-colors hover:text-foreground/80 text-foreground/60">
                  Complaints
                </Link>
              </nav>
            </div>
          </header>
          <main className="container mx-auto py-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
