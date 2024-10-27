import CreateProfileForm from "@/Components/CreateProfileForm";
import { db } from "@/Utils/dbConnection";
import { currentUser } from "@clerk/nextjs/server";
import { cherry } from "../layout";

//Create Profile Form
export default async function createProfilePage() {
  const user = await currentUser();
  return (
    <>
      <div>
        <h1 className={`mb-12 text-5xl ${cherry.className}`}>CREATE PROFILE</h1>
        <CreateProfileForm clerk_id={user.id} />
      </div>
    </>
  );
}
