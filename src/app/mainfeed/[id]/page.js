import Header from "@/Components/Header";
import { db } from "@/Utils/dbConnection";
import { dateISOtoLocal, timeISOLocal } from "@/Utils/dateFormat";
import { createClerkClient } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";
import CommentForm from "@/Components/CommentForm";
import styles from "@/Styles/IndividualPost.module.css";
import { cherry } from "@/app/layout";
import DeleteButton from "@/Components/DeleteButton";
import ThumbButton from "@/Components/ThumbButton";
import Link from "next/link";
export default async function IndividualPost({ params }) {
  const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
  });
  async function GetUsername(userId) {
    const user = await clerkClient.users.getUser(userId);
    return user.username;
  }
  const postparams = await params;
  const individualPost = await db.query(
    `SELECT * FROM posts WHERE id=${postparams.id}`
  );
  const WrangledPost = individualPost.rows;
  const comments = await db.query(
    `SELECT * FROM comments WHERE post_id=${postparams.id}`
  );
  const wrangledComments = comments.rows;
  async function handleClicks(id) {
    "use server";
    const user = await currentUser();
    const likes = await db.query(`SELECT id FROM likes WHERE post_id=${id};`);
    console.log(likes[0]);
    if (likes.rows[0]) {
      const update = await db.query(
        `UPDATE likes SET likes = likes + 1 WHERE post_id=$1`,
        [id]
      );
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
          className={`relative mt-12 mb-10 text-5xl text-purple-500 ${cherry.className}`}
        >
          Post Thread
        </h1>
        <div className={styles.postContainer}>
          {WrangledPost.map(async (post) => (
            <div key={post.id} className="individual post">
              <div className={styles.username}>
                {GetUsername(post.clerk_id)}
              </div>
              <div className={styles.time}>
                {timeISOLocal(JSON.stringify(post.posted_at))}
              </div>
              <div className={styles.date}>
                {dateISOtoLocal(JSON.stringify(post.posted_at))}
              </div>
              <div>{post.post}</div>
              <div className="mb-5 ml-5">
                <ThumbButton
                  id={post.id}
                  handleClicks={handleClicks}
                  start={await Initial(post.id)}
                />
              </div>
            </div>
          ))}
        </div>
        <CommentForm id={postparams.id} />
        <div className={styles.commentContainer}>
          {wrangledComments.reverse().map((comment) => (
            <div key={comment.id}>
              <h2 className={styles.commentUsername}>{comment.username}</h2>
              <p className={styles.comment}>{comment.comment}</p>
              <DeleteButton postId={postparams.id} commentId={comment.id} />
            </div>
          ))}
        </div>
        <br />
        <div className={` ${cherry.className} ${styles.link}`}>
          <Link href={`/mainfeed`}> Main Feed</Link>
        </div>
      </div>
    </>
  );
}
