import Image from "next/image";
import { cherry } from "./layout";
import dialogue from "@/../public/dialogue.png";

import {
  UserButton,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

import Navbar from "@/Components/Navbar";
export default function HomePage() {
  return (
    <div>
      <Image
        className="inline-block "
        src={dialogue}
        alt="YAP! logo"
        height={200}
        width={200}
      />

      <h1 className={`text-8xl mb-12 ${cherry.className}`}>YAP!</h1>
      <div className="top-2 right-5">
        <SignedOut>
          <SignInButton
            className={`${cherry.className} hover:text-purple-700 text-3xl px-1 py-2 `}
            mode="modal"
          >
            Sign In
          </SignInButton>
          <br />
          <SignUpButton
            mode="modal"
            className={`${cherry.className}  hover:text-purple-700 text-3xl px-1  py-2`}
          >
            Sign Up
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <Navbar />
        </SignedIn>
      </div>
    </div>
  );
}
