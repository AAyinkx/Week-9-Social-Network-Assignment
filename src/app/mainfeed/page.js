//Fetch all posts from the database and display them

import Header from "@/Components/Header";
import { db } from "@/Utils/dbConnection";
import { dateISOtoLocal, timeISOLocal } from "@/Utils/dateFormat";
import styles from "@/Styles/MainFeed.module.css";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { cherry } from "../layout";
import ThumbButton from "@/Components/ThumbButton";

export default async function MainFeed() {
  const posts = await db.query(`SELECT * FROM posts ORDER BY posted_at;`);
  const WrangledPosts = posts.rows;
  let response;
  // console.log(userList);
  console.log(WrangledPosts);

  async function handleClicks(id) {
    "use server";
    const user = await currentUser();
    const likes = await db.query(`SELECT id FROM likes WHERE post_id=${id};`);

    if (likes.rows[0]) {
      const update = await db.query(
        `UPDATE likes SET likes = likes + 1 WHERE post_id=$1 RETURNING *`,
        [id]
      );
      console.log(update.rows[0]);
      const instance = await db.query(
        `SELECT * FROM user_liked_posts WHERE clerk_id=$1 AND likes_id=$2`,
        [user.id, update.rows[0].id]
      );
      console.log(instance.rows[0]);
      if (!instance.rows[0]) {
        const usersLikes = await db.query(
          `INSERT INTO user_liked_posts(clerk_id, likes_id) VALUES ($1,$2)`,
          [user.id, update.rows[0].id]
        );
      }
    } else {
      const insert = await db.query(
        `INSERT INTO likes(post_id, likes) VALUES($1,$2)`,
        [id, 1]
      );
      const latestLike = await db.query(
        `SELECT id FROM likes ORDER BY id DESC LIMIT 1;`
      );
      console.log(latestLike.rows[0].id);
      const usersLikes = await db.query(
        `INSERT INTO user_liked_posts(clerk_id, likes_id) VALUES ($1,$2)`,
        [user.id, latestLike.rows[0].id]
      );
    }
  }

  async function Initial(id) {
    "use server";
    const startLikes = await db.query(
      `SELECT likes FROM likes WHERE post_id=$1`,
      [id]
    );
    if (startLikes.rows[0]) {
      return startLikes.rows[0].likes;
    } else {
      return 0;
    }
  }
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
                  <div>
                    <a
                      className={` ${styles.postlink}`}
                      href={`/mainfeed/${post.id}`}
                    >
                      <i className={`fa-regular fa-comments`}></i>
                    </a>
                  </div>
                  <div>
                    <ThumbButton
                      id={post.id}
                      handleClicks={handleClicks}
                      start={await Initial(post.id)}
                    />
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
