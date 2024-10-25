import CreateProfileForm from "@/Components/CreateProfileForm";
import { db } from "@/Utils/dbConnection";
import { currentUser } from "@clerk/nextjs/server";
//Create Profile Form
export default async function createProfilePage() {
  const user = await currentUser();
  return (
    <div>
      <h1>Create Profile</h1>
      <CreateProfileForm clerk_id={user.id} />
    </div>
  );
}
