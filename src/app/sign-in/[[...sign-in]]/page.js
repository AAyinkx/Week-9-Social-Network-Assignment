import { SignIn } from "@clerk/nextjs";
export default function SignInPage() {
  return (
    <>
      <h1 className="text-teal-600 text-2xl mb-4">Sign In</h1>
      <div className="flex justify-center">
        <SignIn />
      </div>
    </>
  );
}
