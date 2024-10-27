import EditBioForm from "@/Components/EditBioForm";
import Header from "@/Components/Header";
import { cherry } from "@/app/layout";
import { currentUser } from "@clerk/nextjs/server";
import styles from "@/Styles/EditBio.module.css";
import Link from "next/link";
export default async function EditBio() {
  const user = await currentUser();
  return (
    <>
      <Header />
      <div>
        <h1
          className={`relative mt-12 mb-7 text-5xl text-yellow-500 ${cherry.className}`}
        >
          Edit Bio
        </h1>
        <EditBioForm clerk_id={user.id} />
        <div className={` ${cherry.className} ${styles.link}`}>
          <Link href={`/userprofile`}>User Profile page</Link>
        </div>
      </div>
    </>
  );
}
