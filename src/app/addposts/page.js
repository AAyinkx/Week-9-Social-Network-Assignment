import Header from "@/Components/Header";
import { cherry } from "@/app/layout";
import { currentUser } from "@clerk/nextjs/server";
import styles from "@/Styles/AddPosts.module.css";
import Link from "next/link";
import PostForm from "@/Components/PostForm";
export default async function AddPosts() {
  const user = await currentUser();
  return (
    <>
      <Header />
      <div>
        <h1
          className={`relative mt-12 mb-10 text-5xl text-purple-400 ${cherry.className}`}
        >
          Add Post
        </h1>
        <PostForm id={user.id} />

        <div className={` ${cherry.className} ${styles.link}`}>
          <Link href={`/mainfeed`}>Main Feed</Link>
        </div>
      </div>
    </>
  );
}
