import Header from "@/Components/Header";
import { db } from "@/Utils/dbConnection";
import { dateISOtoLocal, timeISOLocal } from "@/Utils/dateFormat";
import styles from "@/Styles/MainFeed.module.css";
import { currentUser } from "@clerk/nextjs/server";

export default function LikedPosts() {
  return (
    <>
      <Header />
      <div></div>
    </>
  );
}
