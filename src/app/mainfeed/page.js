//Fetch all posts from the database and display them

import Header from "@/Components/Header";
import { db } from "@/Utils/dbConnection";
import { dateISOtoLocal, timeISOLocal } from "@/Utils/dateFormat";
import styles from "@/Styles/MainFeed.module.css";
import { cherry } from "../layout";
export default async function MainFeed() {
  const posts = await db.query(`SELECT * FROM posts ORDER BY posted_at;`);
  const WrangledPosts = posts.rows;
  console.log(WrangledPosts);
  return (
    <div>
      <Header />
      <h1 className={`mb-7 text-5xl ${cherry.className}`}>Main Feed</h1>
      <div className={styles.postsContainer}>
        {WrangledPosts.map((post) => (
          <div key={post.id} className="individual post">
            <div>{timeISOLocal(JSON.stringify(post.posted_at))}</div>
            <div>{dateISOtoLocal(JSON.stringify(post.posted_at))}</div>
            <div>{post.post}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
