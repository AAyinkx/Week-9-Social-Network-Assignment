import Image from "next/image";
import { cherry } from "./layout";
import dialogue from "@/../public/dialogue.png";
import styles from "@/Styles/IndividualPost.module.css";
import Link from "next/link";
import { RedirectToSignIn, SignedOut, SignedIn } from "@clerk/nextjs";
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

      <h1 className={`text-8xl mb-12 ${cherry.className}`}>
        This page doesn&apos;t exist 🔍
      </h1>
      <br />
      <SignedIn>
        <div className={` ${cherry.className} ${styles.link}`}>
          <Link href={`/`}> Return Home</Link>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}
