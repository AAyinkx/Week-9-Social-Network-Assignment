import Header from "@/Components/Header";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { UserButton, SignedIn } from "@clerk/nextjs";
import { Cherry_Bomb_One, Kodchasan } from "next/font/google";
import Script from "next/script";
export const cherry = Cherry_Bomb_One({
  subsets: ["latin"],
  weight: "400",
});

const main_font = Kodchasan({
  subsets: ["latin"],
  weight: "400",
});
const metadata = {
  title: "YAP!",
  description: "Your voice, your vibe, your platform!",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`m-5 text-xl flex text-center place-content-center items-center ${main_font.className} `}
        >
          <Script
            src="https://kit.fontawesome.com/5d4d1c054f.js"
            crossOrigin="anonymous"
          ></Script>
          <SignedIn>
            <div className="z-10 fixed top-5 right-5">
              <UserButton />
            </div>
          </SignedIn>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
