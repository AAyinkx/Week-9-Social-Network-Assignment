import Header from "@/Components/Header";
import { db } from "@/Utils/dbConnection";
import { dateISOtoLocal, timeISOLocal } from "@/Utils/dateFormat";
import { createClerkClient } from "@clerk/nextjs/server";
import CommentForm from "@/Components/CommentForm";
import styles from "@/Styles/IndividualPost.module.css";
import { cherry } from "@/app/layout";
import DeleteButton from "@/Components/DeleteButton";
export default async function IndividualPost({ params }) {
  async function GetUsername(userId) {
    //Creates clerk client
    const clerkClient = createClerkClient({
      secretKey: process.env.CLERK_SECRET_KEY,
    });

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
  return (
    <>
      <Header />
      <div>
        <h1
          className={`relative mt-10 text-5xl text-purple-500 ${cherry.className}`}
        >
          Post Thread
        </h1>
        <div className={styles.postContainer}>
          {WrangledPost.map((post) => (
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
      </div>
    </>
  );
}
