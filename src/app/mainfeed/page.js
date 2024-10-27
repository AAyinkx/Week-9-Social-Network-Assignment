//Fetch all posts from the database and display them

import Header from "@/Components/Header";
import { db } from "@/Utils/dbConnection";
import { dateISOtoLocal, timeISOLocal } from "@/Utils/dateFormat";
import styles from "@/Styles/MainFeed.module.css";
import { createClerkClient } from "@clerk/nextjs/server";
import Link from "next/link";
import { cherry } from "../layout";

export default async function MainFeed() {
  const posts = await db.query(`SELECT * FROM posts ORDER BY posted_at;`);
  const WrangledPosts = posts.rows;
  let response;
  // console.log(userList);
  console.log(WrangledPosts);
  return (
    <>
      <Header />
      <div className="absolute">
        <h1
          className={`relative mt-12 mb-7 text-5xl text-yellow-500 ${cherry.className}`}
        >
          Main Feed
        </h1>
        <div className={styles.postsContainer}>
          {WrangledPosts.reverse().map(async (post) => (
            <>
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
                  <a
                    className={` ${cherry.className} ${styles.postlink}`}
                    href={`/mainfeed/${post.id}`}
                  >
                    <i className={`fa-regular fa-comments`}></i>
                  </a>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
