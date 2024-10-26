import { ActiveLink } from "./ActiveLink";
import { cherry } from "@/app/layout";
export default function Navbar() {
  return (
    <div className={`navbar ${cherry.className}`}>
      <ActiveLink href="/">Homepage</ActiveLink>
      <ActiveLink href="/posts">Posts</ActiveLink>
    </div>
  );
}
