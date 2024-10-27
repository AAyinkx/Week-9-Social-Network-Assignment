import { db } from "@/Utils/dbConnection";
import "./CommentForm.css";
import { revalidatePath } from "next/cache";
//make sure redirect is from next/navigation
import { redirect } from "next/navigation";

export default async function CommentForm(props) {
  async function handleSubmit(formValues) {
    "use server";

    const formData = {
      username: formValues.get("username"),
      comment: formValues.get("comment"),
    };

    // console.log(formData);
    await db.query(
      `INSERT INTO comments (post_id, username, comment)
          VALUES ($1, $2,$3);
          `,
      [props.id, formData.username, formData.comment]
    );

    //Refreshing the data on the reviews page

    revalidatePath(`/mainfeed/${props.id}`);
  }
  return (
    <div id="form-container">
      <form id="the-form" action={handleSubmit}>
        <div className="form-section">
          <div className="title">
            <label htmlFor="username">Username</label>
          </div>
          <div className="input">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Write your username"
              required
            />
          </div>
        </div>

        <div className="form-section">
          <div className="title">
            <label htmlFor="comment">Your Review of the book</label>
          </div>
          <div className="input">
            <textarea
              id="comment"
              name="comment"
              placeholder="Add your thoughts"
              required
            ></textarea>
          </div>
        </div>

        <div className="form-section" id="submit">
          <button id="submit-button" type="submit">
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
}
