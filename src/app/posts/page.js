//Fetch all posts from the database and display them

import Header from "@/Components/Header";
import { db } from "@/Utils/dbConnection";
import { dateISOtoLocal } from "@/Utils/dateFormat";
export default async function Posts() {
  const posts = await db.query(`SELECT * FROM posts ORDER BY posted_at;`);
  const WrangledPosts = posts.rows;
  console.log(WrangledPosts);
  return (
    <div>
      <Header />
      <h1>Posts Page</h1>
      <div className="Posts Container">
        {WrangledPosts.reverse().map((post) => {
          <div key={post.id} className="individual post">
            <div>{dateISOtoLocal(JSON.stringify(post.posted_at))}</div>
            <div>{post.post}</div>
          </div>;
        })}
      </div>
    </div>
  );
}
