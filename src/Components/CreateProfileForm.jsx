import { db } from "@/Utils/dbConnection";
import "./CreateProfileForm.css";
import { revalidatePath } from "next/cache";
//make sure redirect is from next/navigation
import { redirect } from "next/navigation";
export default async function CreateProfileForm({ clerk_id }) {
  async function handleSubmit(formValues) {
    "use server";
    const formData = {
      bio: formValues.get("bio"),
    };
    await db.query(
      `INSERT INTO users (clerk_id, bio)
          VALUES ($1, $2);
          `,
      [clerk_id, formData.bio]
    );

    redirect("/posts");
  }
  return (
    <div id="form-container">
      <form id="the-form" action={handleSubmit}>
        <div className="form-section">
          <div className="title">
            <label htmlFor="bio">Write you Bio! ✒️</label>
          </div>
          <div className="input">
            <textarea
              type="text"
              id="bio"
              name="bio"
              placeholder="Please write a bio for your account"
              required
            />
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
