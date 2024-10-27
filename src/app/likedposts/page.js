import Header from "@/Components/Header";
import { db } from "@/Utils/dbConnection";
import { dateISOtoLocal, timeISOLocal } from "@/Utils/dateFormat";
import styles from "@/Styles/MainFeed.module.css";
import { currentUser } from "@clerk/nextjs/server";

export default function LikedPosts() {
  return (
    <>
      <Header />
      <div>
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
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
