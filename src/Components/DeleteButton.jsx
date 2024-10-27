import "./DeleteButton.css";
import { db } from "@/Utils/dbConnection";
import { revalidatePath } from "next/cache";
export default function DeleteButton({ commentId, postId }) {
  async function handleDelete(formValues) {
    "use server";

    await db.query(
      `DELETE FROM comments WHERE id=${commentId}
          `
    );

    //Refreshing the data on the reviews page

    revalidatePath(`/mainfeed/${postId}`);
  }
  return (
    <>
      <form id="form" action={handleDelete}>
        <div id="delete-container">
          <button className="deleteButton" type="submit">
            <i className="fa-regular fa-trash-can"></i>
          </button>
        </div>
      </form>
    </>
  );
}
