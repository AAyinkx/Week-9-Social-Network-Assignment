import Header from "@/Components/Header";
import { cherry } from "../layout";
import styles from "@/Styles/UserProfile.module.css";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/Utils/dbConnection";
import { dateISOtoLocal } from "@/Utils/dateFormat";
import Link from "next/link";
import DeleteUserButton from "@/Components/DeleteUserButton";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClerkClient } from "@clerk/nextjs/server";

export default async function UserProfile() {
  const user = await currentUser();
  // console.log("This is the data ", user);

  const userInfo = await db.query(`SELECT * FROM users WHERE clerk_id=$1;`, [
    user.id,
  ]);
  const WrangledUserInfo = userInfo.rows;
  console.log(WrangledUserInfo);

  async function handleDelete(clerk_id) {
    "use server";
    const clerkClient = createClerkClient({
      secretKey: process.env.CLERK_SECRET_KEY,
    });
    const response = await clerkClient.users.deleteUser(clerk_id);
    await db.query(
      `DELETE FROM users WHERE clerk_id=$1;
          `,
      [clerk_id]
    );

    console.log(response);
    revalidatePath(`/`);
    redirect(`/`);
  }

  return (
    <>
      <Header />
      <div>
        <h1
          className={`relative mt-12 mb-7 text-5xl text-yellow-500 ${cherry.className}`}
        >
          User Profile
        </h1>
        <div className={styles.userContainer}>
          <div>
            Welcome
            <em>
              <b> {user.username},</b>
            </em>
          </div>
          <div className={styles.section}>
            <h1 className={`${styles.header} ${cherry.className}`}>Fullname</h1>
            <p>
              {user?.firstName} {user?.lastName}
            </p>
          </div>
          <div className={styles.section}>
            <h1 className={`${styles.header} ${cherry.className}`}>Bio</h1>
            <p>{WrangledUserInfo[0].bio}</p>
            <Link className={styles.link} href="/userprofile/editbio">
              Edit Bio
            </Link>
          </div>
          <div className={styles.section}>
            <h1 className={`${styles.header} ${cherry.className}`}>Likes</h1>
            <p>See all the posts You&apos;ve Liked </p>
            <Link className={styles.link} href="/userprofile/likedposts">
              Posts
            </Link>
          </div>
          <div className={styles.section}>
            <h1 className={`${styles.header} ${cherry.className}`}>
              Joined...
            </h1>
            <p>
              {dateISOtoLocal(JSON.stringify(WrangledUserInfo[0].join_date))}
            </p>
          </div>
          <div className={`${styles.delete} ${styles.section}`}>
            <h1 className={` ${styles.header} ${cherry.className}`}>
              Delete Account
            </h1>
            <p>Are you sure you want to delete your account?</p>
            <DeleteUserButton handleDelete={handleDelete} clerk_id={user.id} />
          </div>
        </div>
      </div>
    </>
  );
}
