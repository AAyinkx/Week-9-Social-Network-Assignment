import {
  UserButton,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
export default function Header() {
  const { userId } = auth();
  return (
    <div>
      <div className="top-5 right-5">
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
      <div className="top-2 right-5">
        <SignedOut>
          <SignInButton className="px-1 py-2" mode="modal">
            Sign In 👋
          </SignInButton>

          <SignUpButton className="px-1  py-2">Sign Up 🆕</SignUpButton>
        </SignedOut>
      </div>
    </div>
  );
}
