import { SignUp } from "@clerk/nextjs";
export default function SignUpPage() {
  return (
    <>
      <h1 className="text-pink-700 text-2xl mb-4">Sign Up</h1>
      <div className="flex justify-center">
        <SignUp />
      </div>
    </>
  );
}
