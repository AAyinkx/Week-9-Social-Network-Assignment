import Header from "@/Components/Header";
import { db } from "@/Utils/dbConnection";
import { dateISOtoLocal, timeISOLocal } from "@/Utils/dateFormat";
import styles from "@/Styles/LikedPosts.module.css";
import { currentUser } from "@clerk/nextjs/server";
import { cherry } from "@/app/layout";
import Link from "next/link";
export default async function LikedPosts() {
  const user = await currentUser();
  console.log(user.id);
  const usersLikes = await db.query(
    `SELECT posts.id AS id, posts.clerk_id AS clerk_id, posts.post AS post, posts.posted_at AS posted_at FROM posts JOIN likes ON likes.post_id = posts.id JOIN user_liked_posts ON user_liked_posts.likes_id = likes.id WHERE user_liked_posts.clerk_id=$1;`,
    [user.id]
  );

  const WrangledUsersLikes = usersLikes.rows;
  console.log(WrangledUsersLikes);
  return (
    <>
      <Header />
      <div>
        <h1
          className={`relative mt-12 mb-7 text-5xl text-yellow-500 ${cherry.className}`}
        >
          Liked Posts
        </h1>
        <div className={styles.postsContainer}>
          {WrangledUsersLikes.reverse().map((post) => (
            <div key={post.id} className={styles.postbox}>
              <div className={styles.post}>
                <div className={styles.time}>
                  {timeISOLocal(JSON.stringify(post.posted_at))}
                </div>
                <div className={styles.date}>
                  {dateISOtoLocal(JSON.stringify(post.posted_at))}
                </div>
                <div>{post.post}</div>
              </div>

              <div className={styles.postlinkContainer}>
                <div>
                  <a
                    className={` ${styles.postlink}`}
                    href={`/mainfeed/${post.id}`}
                  >
                    <i className={`fa-regular fa-comments`}></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <br />
        <div className={` ${cherry.className} ${styles.link}`}>
          <Link href={`/mainfeed`}> Main Feed</Link>
        </div>
        <div className={` ${cherry.className} ${styles.link2}`}>
          <Link href={`/userprofile`}> User Profile</Link>
        </div>
      </div>
    </>
  );
}
