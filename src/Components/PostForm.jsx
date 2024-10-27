import { db } from "@/Utils/dbConnection";
import "./PostForm.css";
import { revalidatePath } from "next/cache";
//make sure redirect is from next/navigation
import { redirect } from "next/navigation";

export default async function PostForm(props) {
  async function handleSubmit(formValues) {
    "use server";

    const formData = {
      post: formValues.get("post"),
    };

    // console.log(formData);
    await db.query(
      `INSERT INTO posts (clerk_id, post)
          VALUES ($1, $2);
          `,
      [props.id, formData.post]
    );

    //Refreshing the data on the reviews page

    revalidatePath(`/mainfeed`);
    redirect(`/mainfeed`);
  }

  return (
    <div id="form-container">
      <form id="the-form" action={handleSubmit}>
        <div className="form-section">
          <div className="title">
            <label htmlFor="post">Add your post</label>
          </div>
          <div className="input">
            <textarea
              id="post"
              name="post"
              placeholder="Add your post"
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
