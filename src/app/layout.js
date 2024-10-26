import Header from "@/Components/Header";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { UserButton, SignedIn } from "@clerk/nextjs";
import { Cherry_Bomb_One, Kodchasan } from "next/font/google";

export const cherry = Cherry_Bomb_One({
  subsets: ["latin"],
  weight: "400",
});

const main_font = Kodchasan({
  subsets: ["latin"],
  weight: "400",
});
export const metadata = {
  title: "YAP!",
  description: "Your voice, your vibe, your platform!",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`m-5 text-xl text-center ${main_font.className} `}>
          <SignedIn>
            <div className="fixed top-5 right-5">
              <UserButton />
            </div>
          </SignedIn>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
