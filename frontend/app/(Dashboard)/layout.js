import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Sidebar from "../components/dashboard/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <div className="flex min-h-screen bg-gray-50/50">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-4 lg:p-8 pb-24 lg:pb-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
