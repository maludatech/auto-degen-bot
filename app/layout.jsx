import { Inter } from "next/font/google";
import "../styles/globals.css"
import { Navbar } from "./components/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Degen Bot",
  description: "The automated bot created just for your degen tokens",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='main'>
            <div className='gradient' />
        </div>
        <main className="app">
          <Navbar/>
          {children}
        </main>
      </body>
    </html>
  );
}
